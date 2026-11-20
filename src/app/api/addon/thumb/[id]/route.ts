import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { verifyLink } from "@/lib/addon";
import { renderPng } from "@/lib/server-render";

// Small thumbnail for the add-on card. Card images are fetched by Google's
// image proxy without cookies, so access is a signed, expiring link issued
// to the owner by /api/addon/graphics. Same size and look as the site's
// own gallery tiles (no checkerboard below 300px).
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const claims = await verifyLink(req.nextUrl.searchParams.get("t"));
  if (!claims || claims.p !== "thumb" || claims.gid !== Number(id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const rows = (await sql()`SELECT svg FROM graphics WHERE id = ${claims.gid}`) as { svg: string }[];
  if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  try {
    const png = await renderPng(rows[0].svg, 300, { checker: false });
    return new NextResponse(new Uint8Array(png), {
      headers: { "Content-Type": "image/png", "Cache-Control": "private, max-age=3600" },
    });
  } catch {
    return NextResponse.json({ error: "Render failed" }, { status: 500 });
  }
}
