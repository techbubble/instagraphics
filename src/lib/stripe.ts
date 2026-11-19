import Stripe from "stripe";
import { sql } from "./db";
import { sendRedditConversion } from "./reddit-capi";

// Credits are $0.20 each, sold in $1 packs of 5.
export const CREDIT_PRICE_CENTS = 20;
export const CREDITS_PER_PACK = 5;
export const PACK_PRICE_CENTS = CREDIT_PRICE_CENTS * CREDITS_PER_PACK;
export const MAX_PACKS = 200;

let _stripe: Stripe | null = null;

export function stripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    _stripe = new Stripe(key);
  }
  return _stripe;
}

// Idempotently credit the user for a completed Checkout Session. Safe to
// call from both the webhook and the success-page fallback.
export async function fulfillCheckoutSession(
  session: Stripe.Checkout.Session
): Promise<boolean> {
  if (session.payment_status !== "paid") return false;
  const userId = Number(session.metadata?.userId);
  const credits = Number(session.metadata?.credits);
  if (!Number.isInteger(userId) || !Number.isInteger(credits) || credits < 1) {
    return false;
  }
  // amount_total is what Stripe actually charged; the fallback only covers
  // sessions without it.
  const amountCents = session.amount_total ?? credits * CREDIT_PRICE_CENTS;
  const inserted = (await sql()`
    INSERT INTO purchases (user_id, credits, amount_cents, stripe_session_id)
    VALUES (${userId}, ${credits}, ${amountCents}, ${session.id})
    ON CONFLICT (stripe_session_id) DO NOTHING
    RETURNING id
  `) as { id: number }[];
  if (inserted.length === 0) return false; // already fulfilled
  await sql()`UPDATE users SET credits = credits + ${credits} WHERE id = ${userId}`;
  await sendRedditConversion({
    event: "Purchase",
    conversionId: session.id,
    value: amountCents / 100,
    email: session.customer_email ?? session.customer_details?.email ?? undefined,
  });
  return true;
}
