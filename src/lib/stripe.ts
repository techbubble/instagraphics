import Stripe from "stripe";
import { sql } from "./db";

export const CREDIT_PRICE_CENTS = 99;

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
  const inserted = (await sql()`
    INSERT INTO purchases (user_id, credits, amount_cents, stripe_session_id)
    VALUES (${userId}, ${credits}, ${credits * CREDIT_PRICE_CENTS}, ${session.id})
    ON CONFLICT (stripe_session_id) DO NOTHING
    RETURNING id
  `) as { id: number }[];
  if (inserted.length === 0) return false; // already fulfilled
  await sql()`UPDATE users SET credits = credits + ${credits} WHERE id = ${userId}`;
  return true;
}
