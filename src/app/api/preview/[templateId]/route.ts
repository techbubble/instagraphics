import { NextRequest, NextResponse } from "next/server";
import { getTemplate, templateSvg } from "@/lib/templates";
import { renderTemplate } from "@/lib/svg-engine";
import { brandFromQuery, renderGif, renderPng } from "@/lib/server-render";

// Public template preview (default text, optional brand via query). PNG
// only (or an animated GIF of the reveal with anim=1) — template SVG
// source stays on the server.
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ templateId: string }> }
) {
  const { templateId } = await params;
  const template = getTemplate(templateId);
  if (!template) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const sp = req.nextUrl.searchParams;
  const w = Math.min(1024, Math.max(64, Number(sp.get("w")) || 400));
  const brand = brandFromQuery(sp);
  // Thumbnails may skip the checkerboard; larger renders always carry it.
  const plain = sp.get("plain") === "1" && w <= 480;
  try {
    const svg = renderTemplate(templateSvg(template, {}), brand, {});
    if (sp.get("anim") === "1") {
      const gif = await renderGif(svg, Math.min(w, 640), { checker: !plain });
      return new NextResponse(new Uint8Array(gif), {
        headers: {
          "Content-Type": "image/gif",
          "Cache-Control": "public, max-age=86400",
        },
      });
    }
    const png = await renderPng(svg, w, { checker: !plain });
    return new NextResponse(new Uint8Array(png), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Render failed" }, { status: 500 });
  }
}
