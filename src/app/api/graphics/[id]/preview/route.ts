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
  const w = Math.min(
    1024,
    Math.max(64, Number(req.nextUrl.searchParams.get("w")) || 600)
  );
  try {
    const png = await renderPng(rows[0].svg, w);
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
