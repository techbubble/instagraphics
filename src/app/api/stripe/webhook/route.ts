import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe, fulfillCheckoutSession } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const payload = await req.text();
  let event: Stripe.Event;
  if (secret) {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }
    try {
      event = await stripe().webhooks.constructEventAsync(payload, signature, secret);
    } catch {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } else {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  if (event.type === "checkout.session.completed") {
    await fulfillCheckoutSession(event.data.object);
  }
  return NextResponse.json({ received: true });
}
