import { NextRequest, NextResponse } from "next/server";
import { displayValues, getTemplate, templateSvg } from "@/lib/templates";
import { renderTemplate } from "@/lib/svg-engine";
import { renderGif, renderPng, sanitizeBrand, sanitizeValues, watermark } from "@/lib/server-render";

// Live builder preview: brand + values in, PNG out (or an animated GIF of
// the reveal with format: "gif"). Never returns SVG. Anonymous access is
// fine — output is always checkered and watermarked.
export async function POST(req: NextRequest) {
  let body: { templateId?: string; brand?: unknown; values?: unknown; format?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const template = body.templateId ? getTemplate(body.templateId) : undefined;
  if (!template) {
    return NextResponse.json({ error: "Unknown template" }, { status: 400 });
  }
  const values = displayValues(template, sanitizeValues(body.values));
  let svg = renderTemplate(templateSvg(template, values), sanitizeBrand(body.brand), values);
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
  try {
    if (body.format === "gif") {
      const gif = await renderGif(svg, 720, { decorate: watermark });
      return new NextResponse(new Uint8Array(gif), {
        headers: { "Content-Type": "image/gif", "Cache-Control": "no-store" },
      });
    }
    const png = await renderPng(watermark(svg), 1024);
    return new NextResponse(new Uint8Array(png), {
      headers: { "Content-Type": "image/png", "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Render failed" }, { status: 500 });
  }
}
