import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { sql } from "@/lib/db";
import { stripe, fulfillCheckoutSession } from "@/lib/stripe";
import RefreshOnMount from "@/components/RefreshOnMount";

// Webhook-independent fulfillment fallback: verify the session with
// Stripe directly and credit idempotently.
export default async function CreditsSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const user = await currentUser();
  if (!user) redirect("/login");
  const { session_id } = await searchParams;
  if (!session_id) redirect("/credits");

  let ok = false;
  try {
    const session = await stripe().checkout.sessions.retrieve(session_id);
    if (Number(session.metadata?.userId) === user.id) {
      await fulfillCheckoutSession(session);
      ok = session.payment_status === "paid";
    }
  } catch {
    ok = false;
  }

  const rows = (await sql()`
    SELECT credits FROM users WHERE id = ${user.id}
  `) as { credits: number }[];
  const credits = rows[0]?.credits ?? user.credits;

  return (
    <div className="row justify-content-center text-center">
      <RefreshOnMount />
      <div className="col-md-6">
        {ok ? (
          <>
            <h1 className="h3 text-success mb-3">Payment complete</h1>
            <p className="text-secondary">
              Your balance is now <strong>{credits}</strong> credit
              {credits === 1 ? "" : "s"}.
            </p>
          </>
        ) : (
          <>
            <h1 className="h3 mb-3">Payment pending</h1>
            <p className="text-secondary">
              We could not confirm the payment yet. Your credits will appear
              once the payment settles.
            </p>
          </>
        )}
        <Link href="/my" className="btn btn-primary me-2">
          My Graphics
        </Link>
        <Link href="/" className="btn btn-outline-secondary">
          Build a graphic
        </Link>
      </div>
    </div>
  );
}
