import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { addonUserId, signLink, siteOrigin } from "@/lib/addon";

// Add-on home card data: credits, the newest graphics with signed thumbnail
// URLs, and a link that opens the site already signed in.
export async function GET(req: NextRequest) {
  const uid = await addonUserId(req);
  if (uid == null) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const [user] = (await sql()`SELECT credits FROM users WHERE id = ${uid}`) as { credits: number }[];
  const rows = (await sql()`
    SELECT id, title, paid_at FROM graphics
    WHERE user_id = ${uid}
    ORDER BY created_at DESC
    LIMIT 20
  `) as { id: number; title: string; paid_at: string | null }[];

  const origin = siteOrigin(req);
  const graphics = await Promise.all(
    rows.map(async (g) => {
      const t = await signLink({ p: "thumb", gid: Number(g.id) }, "2h");
      return {
        id: Number(g.id),
        title: g.title,
        paid: g.paid_at != null,
        thumb: `${origin}/api/addon/thumb/${g.id}?t=${t}`,
      };
    })
  );
  const open = await signLink({ p: "open", uid }, "15m");
  return NextResponse.json({
    credits: Number(user?.credits ?? 0),
    graphics,
    openUrl: `${origin}/api/addon/open?t=${open}`,
  });
}
