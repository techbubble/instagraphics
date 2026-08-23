import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { sql } from "@/lib/db";
import { sendGiftEmail } from "@/lib/mailer";

// Transfers credits from the signed-in user to another email address. The
// recipient account is created if it does not exist yet; the credits are
// waiting when they first sign in.
export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  let body: { email?: unknown; credits?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const email = String(body.email ?? "").trim().toLowerCase();
  const credits = Number(body.credits);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (email === user.email.toLowerCase()) {
    return NextResponse.json({ error: "That is your own account." }, { status: 400 });
  }
  if (!Number.isInteger(credits) || credits < 1) {
    return NextResponse.json({ error: "Enter how many credits to send." }, { status: 400 });
  }

  const debited = (await sql()`
    UPDATE users SET credits = credits - ${credits}
    WHERE id = ${Number(user.id)} AND credits >= ${credits}
    RETURNING credits
  `) as { credits: number }[];
  if (debited.length === 0) {
    return NextResponse.json({ error: "Not enough credits in your account." }, { status: 400 });
  }
  try {
    // Existing account gets the credits; a new one is created with the
    // gift plus the standard 1 free signup credit.
    await sql()`
      INSERT INTO users (email, credits) VALUES (${email}, ${credits + 1})
      ON CONFLICT (email) DO UPDATE SET credits = users.credits + ${credits}
    `;
    await sql()`
      INSERT INTO gifts (from_user, to_email, credits) VALUES (${Number(user.id)}, ${email}, ${credits})
    `;
  } catch (e) {
    await sql()`UPDATE users SET credits = credits + ${credits} WHERE id = ${Number(user.id)}`;
    console.error("gift failed:", e);
    return NextResponse.json({ error: "Could not send the gift. You were not charged." }, { status: 500 });
  }
  sendGiftEmail(email, credits, user.email).catch((e) => console.error("gift email failed:", e));
  return NextResponse.json({ ok: true, balance: debited[0].credits });
}
