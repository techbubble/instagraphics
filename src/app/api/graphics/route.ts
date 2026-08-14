import { NextRequest, NextResponse } from "next/server";
import { sessionUserId } from "@/lib/auth";
import { sql } from "@/lib/db";
import { getTemplate } from "@/lib/templates";

const MAX_SVG_BYTES = 2 * 1024 * 1024;

function isSafeSvg(svg: string): boolean {
  if (!/^\s*<svg\b/.test(svg)) return false;
  if (/<script\b/i.test(svg)) return false;
  if (/<foreignObject\b/i.test(svg)) return false;
  if (/\son[a-z]+\s*=/i.test(svg)) return false;
  if (/javascript:/i.test(svg)) return false;
  return true;
}

export async function POST(req: NextRequest) {
  const uid = await sessionUserId();
  if (uid == null) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  let body: { templateId?: string; title?: string; svg?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const template = body.templateId ? getTemplate(body.templateId) : undefined;
  if (!template) {
    return NextResponse.json({ error: "Unknown template" }, { status: 400 });
  }
  const svg = String(body.svg || "");
  if (Buffer.byteLength(svg) > MAX_SVG_BYTES || !isSafeSvg(svg)) {
    return NextResponse.json({ error: "Invalid graphic" }, { status: 400 });
  }
  const title = String(body.title || template.title).slice(0, 80);
  const rows = (await sql()`
    INSERT INTO graphics (user_id, template_id, title, svg)
    VALUES (${uid}, ${template.id}, ${title}, ${svg})
    RETURNING id
  `) as { id: number }[];
  return NextResponse.json({ id: rows[0].id });
}
