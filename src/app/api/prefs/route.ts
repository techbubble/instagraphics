import { NextRequest, NextResponse } from "next/server";
import { sessionUserId } from "@/lib/auth";
import { sql } from "@/lib/db";

// Per-account builder preferences: brand kit (colors + fonts) and last
// entered field values, reused across graphics.

export async function GET() {
  const uid = await sessionUserId();
  if (uid == null) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  const rows = (await sql()`
    SELECT brand, field_values FROM preferences WHERE user_id = ${uid}
  `) as { brand: object; field_values: object }[];
  return NextResponse.json({
    brand: rows[0]?.brand ?? {},
    values: rows[0]?.field_values ?? {},
  });
}

export async function PUT(req: NextRequest) {
  const uid = await sessionUserId();
  if (uid == null) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  let body: { brand?: unknown; values?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const brand =
    body.brand && typeof body.brand === "object" ? body.brand : null;
  const values =
    body.values && typeof body.values === "object"
      ? Object.fromEntries(
          Object.entries(body.values as Record<string, unknown>)
            .filter(([, v]) => typeof v === "string")
            .map(([k, v]) => [k.slice(0, 40), String(v).slice(0, 200)])
        )
      : null;
  if (!brand && !values) return NextResponse.json({ ok: true });

  await sql()`
    INSERT INTO preferences (user_id, brand, field_values)
    VALUES (${uid}, ${JSON.stringify(brand ?? {})}, ${JSON.stringify(values ?? {})})
    ON CONFLICT (user_id) DO UPDATE SET
      brand = CASE WHEN ${brand !== null} THEN EXCLUDED.brand ELSE preferences.brand END,
      field_values = preferences.field_values || EXCLUDED.field_values,
      updated_at = now()
  `;
  return NextResponse.json({ ok: true });
}
