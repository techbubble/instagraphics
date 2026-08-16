import { NextRequest, NextResponse } from "next/server";
import { sessionUserId } from "@/lib/auth";
import { sql } from "@/lib/db";
import { renderPng } from "@/lib/server-render";

// Owner-only PNG preview of a saved graphic. The stored SVG is released
// only by the (charged) download endpoint.
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
  let svg = rows[0].svg;
  if (!plain) {
    // Large checkered preview carries the watermark; downloads stay clean.
    svg = svg.replace(
      /viewBox="([-\d.]+) ([-\d.]+) ([\d.]+) ([\d.]+)"[^>]*>/,
      (m, x, y, wd, h) =>
        m +
        `<text x="${Number(x) + 26}" y="${Number(y) + Number(h) - 24}" ` +
        `font-family="Roboto" font-size="30" font-weight="bold" fill="#495057" ` +
        `fill-opacity="0.75" letter-spacing="2">INSTAGRAPHIC.APP</text>`
    );
  }
  try {
    const png = await renderPng(svg, w, { checker: !plain });
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
