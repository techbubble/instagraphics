import { NextResponse, type NextRequest } from "next/server";

// The session cookie is SameSite=None so it works inside the Chrome extension
// popup (a cross-site iframe). That means browsers attach it to cross-site
// requests too, so reject state-changing API calls whose Origin is another
// site. Requests without an Origin (Stripe webhooks, curl) pass through.
// Server Actions do their own Origin check.
export function proxy(request: NextRequest) {
  const method = request.method;
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") return NextResponse.next();
  const origin = request.headers.get("origin");
  if (origin === null) return NextResponse.next();
  let originHost: string | null = null;
  try {
    originHost = new URL(origin).host;
  } catch {
    // "null" or malformed origin
  }
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!originHost || originHost !== host) {
    return NextResponse.json({ error: "Cross-site request rejected." }, { status: 403 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
