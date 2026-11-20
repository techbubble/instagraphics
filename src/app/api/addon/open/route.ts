import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
import { verifyLink, siteOrigin } from "@/lib/addon";

// "Open Instagraphic" from the add-on: signs the browser in as the add-on's
// Google user (link issued by /api/addon/graphics, valid 15 minutes), then
// goes to the requested page. An expired link just lands on the site.
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const next = sp.get("next") || "/";
  const dest = new URL(next.startsWith("/") && !next.startsWith("//") ? next : "/", siteOrigin(req));
  const claims = await verifyLink(sp.get("t"));
  if (claims?.p === "open") await createSession(claims.uid);
  return NextResponse.redirect(dest);
}
