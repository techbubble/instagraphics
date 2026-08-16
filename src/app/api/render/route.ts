import { NextRequest, NextResponse } from "next/server";
import { getTemplate } from "@/lib/templates";
import { renderTemplate } from "@/lib/svg-engine";
import { renderPng, sanitizeBrand, sanitizeValues } from "@/lib/server-render";

// Live builder preview: brand + values in, PNG out. Never returns SVG.
// Anonymous access is fine — output is always checkered.
export async function POST(req: NextRequest) {
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
  let svg = renderTemplate(
    template.svg,
    sanitizeBrand(body.brand),
    sanitizeValues(body.values)
  );
  // Square canvas: pad the viewBox so the builder preview (and its baked
  // checkerboard) fills a square area with the graphic centered.
  svg = svg.replace(
    /viewBox="([-\d.]+) ([-\d.]+) ([\d.]+) ([\d.]+)"/,
    (_m, x, y, w, h) => {
      const side = Math.max(Number(w), Number(h));
      const nx = Number(x) - (side - Number(w)) / 2;
      const ny = Number(y) - (side - Number(h)) / 2;
      return `viewBox="${nx} ${ny} ${side} ${side}"`;
    }
  );
  // Watermark the on-screen preview (bottom-left); downloads never pass
  // through this route, so they stay clean.
  svg = svg.replace(
    /viewBox="([-\d.]+) ([-\d.]+) ([\d.]+) ([\d.]+)"[^>]*>/,
    (m, x, y, w, h) =>
      m +
      `<text x="${Number(x) + 26}" y="${Number(y) + Number(h) - 24}" ` +
      `font-family="Roboto" font-size="30" font-weight="bold" fill="#495057" ` +
      `fill-opacity="0.75" letter-spacing="2">INSTAGRAPHIC.APP</text>`
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
