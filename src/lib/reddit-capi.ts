import { createHash } from "node:crypto";

// Reddit Conversions API: server-to-server events, immune to ad blockers.
// Deduplicated against the browser pixel via conversion_id.

const PIXEL_ID = process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID;
const TOKEN = process.env.REDDIT_CAPI_TOKEN;

export async function sendRedditConversion(opts: {
  event: "Purchase" | "AddToCart" | "SignUp" | "Lead";
  conversionId: string;
  value?: number;
  currency?: string;
  email?: string;
  ip?: string | null;
  userAgent?: string | null;
}) {
  if (!PIXEL_ID || !TOKEN) return;
  const user: Record<string, string> = {};
  if (opts.email) {
    user.email = createHash("sha256")
      .update(opts.email.trim().toLowerCase())
      .digest("hex");
  }
  if (opts.ip) user.ip_address = opts.ip;
  if (opts.userAgent) user.user_agent = opts.userAgent;
  if (Object.keys(user).length === 0) return; // Reddit requires user signals

  try {
    const res = await fetch(
      `https://ads-api.reddit.com/api/v2.0/conversions/events/${PIXEL_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          test_mode: false,
          events: [
            {
              event_at: new Date().toISOString(),
              event_type: { tracking_type: opts.event },
              event_metadata: {
                conversion_id: opts.conversionId,
                ...(opts.value !== undefined
                  ? { value_decimal: opts.value, currency: opts.currency ?? "USD" }
                  : {}),
              },
              user,
            },
          ],
        }),
      }
    );
    if (!res.ok) {
      console.error("reddit capi failed:", res.status, await res.text());
    }
  } catch (e) {
    console.error("reddit capi error:", e);
  }
}
