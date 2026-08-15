import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { stripe, CREDIT_PRICE_CENTS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  let quantity = 0;
  try {
    const body = await req.json();
    quantity = Number(body.quantity);
  } catch {
    // handled below
  }
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 1000) {
    return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
  }

  const origin =
    req.headers.get("origin") ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000";

  const session = await stripe().checkout.sessions.create({
    mode: "payment",
    customer_email: user.email,
    line_items: [
      {
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: CREDIT_PRICE_CENTS,
          product_data: {
            name: "Instagraphics Credit",
            description: "1 credit unlocks one infographic for unlimited downloads",
          },
        },
      },
    ],
    metadata: { userId: String(user.id), credits: String(quantity) },
    success_url: `${origin}/credits/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/credits`,
  });

  return NextResponse.json({ url: session.url });
}
