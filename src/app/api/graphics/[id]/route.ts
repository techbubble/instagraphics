import { NextRequest, NextResponse } from "next/server";
import { sessionUserId } from "@/lib/auth";
import { sql } from "@/lib/db";

// Owners may delete graphics they have not paid for; paid graphics are
// kept so re-downloads keep working.
export async function DELETE(
  _req: NextRequest,
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
    DELETE FROM graphics
    WHERE id = ${graphicId} AND user_id = ${uid} AND paid_at IS NULL
    RETURNING id
  `) as { id: number }[];
  if (rows.length === 0) {
    return NextResponse.json(
      { error: "Not found or already unlocked" },
      { status: 404 }
    );
  }
  return NextResponse.json({ ok: true });
}
