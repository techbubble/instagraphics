import { NextRequest, NextResponse } from "next/server";
import { sessionUserId } from "@/lib/auth";
import { sql } from "@/lib/db";

// Charges 1 credit and returns the graphic's SVG source. The client
// rasterizes to PNG locally when that format was chosen; the charge is
// identical either way.
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
    SELECT id, title, svg FROM graphics WHERE id = ${graphicId} AND user_id = ${uid}
  `) as { id: number; title: string; svg: string }[];
  if (rows.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Atomic decrement — only succeeds if the user has a credit to spend.
  const charged = (await sql()`
    UPDATE users SET credits = credits - 1
    WHERE id = ${uid} AND credits >= 1
    RETURNING credits
  `) as { credits: number }[];
  if (charged.length === 0) {
    return NextResponse.json(
      { error: "insufficient_credits" },
      { status: 402 }
    );
  }
  await sql()`
    INSERT INTO downloads (user_id, graphic_id, format)
    VALUES (${uid}, ${graphicId}, ${format})
  `;

  return NextResponse.json({
    svg: rows[0].svg,
    title: rows[0].title,
    credits: charged[0].credits,
  });
}
