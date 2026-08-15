import { NextRequest, NextResponse } from "next/server";
import { getTemplate } from "@/lib/templates";
import { renderTemplate } from "@/lib/svg-engine";
import { brandFromQuery, renderPng } from "@/lib/server-render";

// Public template preview (default text, optional brand via query). PNG
// only — template SVG source stays on the server.
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
    const png = await renderPng(renderTemplate(template.svg, brand, {}), w, {
      checker: !plain,
    });
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
