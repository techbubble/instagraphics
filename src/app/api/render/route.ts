import { NextRequest, NextResponse } from "next/server";
import { sessionUserId } from "@/lib/auth";
import { getTemplate } from "@/lib/templates";
import { renderTemplate } from "@/lib/svg-engine";
import { renderPng, sanitizeBrand, sanitizeValues } from "@/lib/server-render";

// Live builder preview: brand + values in, PNG out. Never returns SVG.
export async function POST(req: NextRequest) {
  const uid = await sessionUserId();
  if (uid == null) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  let body: {
    templateId?: string;
    brand?: unknown;
    values?: unknown;
    showTitle?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const template = body.templateId ? getTemplate(body.templateId) : undefined;
  if (!template) {
    return NextResponse.json({ error: "Unknown template" }, { status: 400 });
  }
  const svg = renderTemplate(
    template.svg,
    sanitizeBrand(body.brand),
    sanitizeValues(body.values),
    { hideKeys: body.showTitle === true ? [] : ["title"] }
  );
  try {
    const png = await renderPng(svg, 1024);
    return new NextResponse(new Uint8Array(png), {
      headers: { "Content-Type": "image/png", "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Render failed" }, { status: 500 });
  }
}
