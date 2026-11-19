import { NextRequest, NextResponse } from "next/server";
import { sessionUserId } from "@/lib/auth";
import { sql } from "@/lib/db";
import { displayValues, getTemplate, templateSvg } from "@/lib/templates";
import { renderTemplate } from "@/lib/svg-engine";
import { sanitizeBrand, sanitizeValues } from "@/lib/server-render";

// Save: the client sends brand + values only; the SVG is rendered and
// stored server-side, so unrendered template source and the final SVG
// never reach the browser pre-payment.
export async function POST(req: NextRequest) {
  const uid = await sessionUserId();
  if (uid == null) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  let body: { templateId?: string; brand?: unknown; values?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const template = body.templateId ? getTemplate(body.templateId) : undefined;
  if (!template) {
    return NextResponse.json({ error: "Unknown template" }, { status: 400 });
  }
  const values = sanitizeValues(body.values);
  const brand = sanitizeBrand(body.brand);
  const eff = displayValues(template, values);
  const svg = renderTemplate(templateSvg(template, eff), brand, eff);
  const title = template.title.slice(0, 80);
  const rows = (await sql()`
    INSERT INTO graphics (user_id, template_id, title, svg, brand, field_values)
    VALUES (${uid}, ${template.id}, ${title}, ${svg}, ${JSON.stringify(brand)}::jsonb, ${JSON.stringify(values)}::jsonb)
    RETURNING id
  `) as { id: number }[];
  return NextResponse.json({ id: Number(rows[0].id) });
}
