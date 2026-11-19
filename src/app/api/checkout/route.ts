import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { stripe, CREDITS_PER_PACK, MAX_PACKS, PACK_PRICE_CENTS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  // packs = number of $1 packs of 5 credits
  let packs = 0;
  try {
    const body = await req.json();
    packs = Number(body.packs);
  } catch {
    // handled below
  }
  if (!Number.isInteger(packs) || packs < 1 || packs > MAX_PACKS) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }
  const credits = packs * CREDITS_PER_PACK;

  const origin =
    req.headers.get("origin") ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000";

  const session = await stripe().checkout.sessions.create({
    mode: "payment",
    customer_email: user.email,
    line_items: [
      {
        quantity: packs,
        price_data: {
          currency: "usd",
          unit_amount: PACK_PRICE_CENTS,
          product_data: {
            name: `Instagraphic Credits (${CREDITS_PER_PACK}-pack)`,
            description: `${CREDITS_PER_PACK} credits; 1 credit unlocks one graphic for unlimited downloads`,
          },
        },
      },
    ],
    metadata: { userId: String(user.id), credits: String(credits) },
    success_url: `${origin}/credits/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/credits`,
  });

  return NextResponse.json({ url: session.url });
}
