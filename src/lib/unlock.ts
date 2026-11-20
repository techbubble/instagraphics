import { sql } from "./db";

export type UnlockedGraphic = { id: number; title: string; svg: string };

// First download (or add-on insert) of a graphic charges 1 credit and
// unlocks it; after that the owner gets it in any format for free. Logs the
// download either way.
export async function unlockGraphic(
  uid: number,
  graphicId: number,
  format: string
): Promise<UnlockedGraphic | "not_found" | "insufficient_credits"> {
  const rows = (await sql()`
    SELECT id, title, svg, paid_at FROM graphics
    WHERE id = ${graphicId} AND user_id = ${uid}
  `) as { id: number; title: string; svg: string; paid_at: string | null }[];
  const graphic = rows[0];
  if (!graphic) return "not_found";

  if (!graphic.paid_at) {
    const charged = (await sql()`
      UPDATE users SET credits = credits - 1
      WHERE id = ${uid} AND credits >= 1
      RETURNING credits
    `) as { credits: number }[];
    if (charged.length === 0) return "insufficient_credits";
    await sql()`
      UPDATE graphics SET paid_at = now() WHERE id = ${graphicId}
    `;
  }
  await sql()`
    INSERT INTO downloads (user_id, graphic_id, format)
    VALUES (${uid}, ${graphicId}, ${format})
  `;
  return { id: Number(graphic.id), title: graphic.title, svg: graphic.svg };
}
