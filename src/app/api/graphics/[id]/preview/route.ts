import { NextRequest, NextResponse } from "next/server";
import { sessionUserId } from "@/lib/auth";
import { sql } from "@/lib/db";
import { renderGif, renderPng, watermark } from "@/lib/server-render";

// Owner-only PNG preview of a saved graphic (animated GIF with anim=1).
// The stored SVG is released only by the (charged) download endpoint.
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const uid = await sessionUserId();
  if (uid == null) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  const { id } = await params;
  const graphicId = Number(id);
  if (!Number.isInteger(graphicId)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const rows = (await sql()`
    SELECT svg FROM graphics WHERE id = ${graphicId} AND user_id = ${uid}
  `) as { svg: string }[];
  if (!rows[0]) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const sp = req.nextUrl.searchParams;
  const w = Math.min(1024, Math.max(64, Number(sp.get("w")) || 600));
  // Small tiles may skip the checkerboard; anything larger keeps it so the
  // clean asset only ships via the paid download.
  const plain = sp.get("plain") === "1" && w <= 300;
  const svg = rows[0].svg;
  // Large checkered previews carry the watermark; downloads stay clean.
  const mark = plain ? (f: string) => f : watermark;
  try {
    if (sp.get("anim") === "1") {
      const gif = await renderGif(svg, Math.min(w, 640), { checker: !plain, decorate: mark });
      return new NextResponse(new Uint8Array(gif), {
        headers: {
          "Content-Type": "image/gif",
          "Cache-Control": "private, max-age=300",
        },
      });
    }
    const png = await renderPng(mark(svg), w, { checker: !plain });
    return new NextResponse(new Uint8Array(png), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "private, max-age=300",
      },
    });
  } catch {
    return NextResponse.json({ error: "Render failed" }, { status: 500 });
  }
}
