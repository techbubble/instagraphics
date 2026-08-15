import { NextRequest, NextResponse } from "next/server";
import { sessionUserId } from "@/lib/auth";
import { sql } from "@/lib/db";

// Delivered assets are cropped to the graphic's content bounds, with
// explicit dimensions so client-side PNG rasterization keeps the aspect.
async function cropToContent(svg: string): Promise<string> {
  try {
    const { Resvg } = await import("@resvg/resvg-js");
    const b = new Resvg(svg, { font: { loadSystemFonts: true } }).getBBox();
    if (!b) return svg;
    const w = Math.ceil(b.width);
    const h = Math.ceil(b.height);
    return svg.replace(
      /<svg\b[^>]*>/,
      (tag) =>
        tag
          .replace(/\s(width|height)="[^"]*"/g, "")
          .replace(
            /viewBox="[^"]*"/,
            `viewBox="${b.x.toFixed(1)} ${b.y.toFixed(1)} ${w} ${h}" width="${w}" height="${h}"`
          )
    );
  } catch {
    return svg;
  }
}

// First download of a graphic charges 1 credit and unlocks it; after that
// the owner can download it in any format, any number of times, for free.
export async function POST(
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
  let format = "svg";
  try {
    const body = await req.json();
    if (body.format === "png") format = "png";
  } catch {
    // default to svg
  }

  const rows = (await sql()`
    SELECT id, title, svg, paid_at FROM graphics
    WHERE id = ${graphicId} AND user_id = ${uid}
  `) as { id: number; title: string; svg: string; paid_at: string | null }[];
  const graphic = rows[0];
  if (!graphic) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!graphic.paid_at) {
    const charged = (await sql()`
      UPDATE users SET credits = credits - 1
      WHERE id = ${uid} AND credits >= 1
      RETURNING credits
    `) as { credits: number }[];
    if (charged.length === 0) {
      return NextResponse.json({ error: "insufficient_credits" }, { status: 402 });
    }
    await sql()`
      UPDATE graphics SET paid_at = now() WHERE id = ${graphicId}
    `;
  }
  await sql()`
    INSERT INTO downloads (user_id, graphic_id, format)
    VALUES (${uid}, ${graphicId}, ${format})
  `;

  return NextResponse.json({
    svg: await cropToContent(graphic.svg),
    title: graphic.title,
  });
}
