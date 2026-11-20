import { NextRequest } from "next/server";
import { SignJWT, createRemoteJWKSet, jwtVerify } from "jose";
import { sql } from "./db";

// Google Slides / Docs add-on (card-based Google Workspace add-on). The
// add-on runs on Google's servers and calls /api/addon/* with
// "Authorization: Bearer <Google ID token>" from ScriptApp.getIdentityToken().
// The token is signed by Google and bound to the add-on's OAuth client ID
// (aud), so a token minted for any other app is rejected.

const GOOGLE_JWKS = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));

function allowedAudiences(): string[] {
  return (process.env.GOOGLE_ADDON_CLIENT_IDS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function secret() {
  return new TextEncoder().encode(
    process.env.AUTH_SECRET || "instagraphics-dev-secret-change-me"
  );
}

// User id for the add-on request, creating the account on first use, or
// null if the token is missing or not valid for this add-on.
export async function addonUserId(req: NextRequest): Promise<number | null> {
  const m = /^Bearer\s+(.+)$/i.exec(req.headers.get("authorization") || "");
  if (!m) return null;
  let payload;
  try {
    ({ payload } = await jwtVerify(m[1], GOOGLE_JWKS, {
      issuer: ["https://accounts.google.com", "accounts.google.com"],
    }));
  } catch {
    return null;
  }
  const aud = String(payload.aud ?? "");
  const allowed = allowedAudiences();
  if (!allowed.includes(aud)) {
    if (process.env.NODE_ENV === "development") {
      // Ad-hoc test scripts have their own client IDs.
      console.warn(`[dev] Accepting add-on client ID ${aud} (not in GOOGLE_ADDON_CLIENT_IDS).`);
    } else {
      console.warn(`Rejected add-on request for client ID ${aud}; not in GOOGLE_ADDON_CLIENT_IDS.`);
      return null;
    }
  }
  const email = String(payload.email ?? "").trim().toLowerCase();
  if (!email || payload.email_verified !== true) return null;
  const rows = (await sql()`
    INSERT INTO users (email) VALUES (${email})
    ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
    RETURNING id
  `) as { id: number }[];
  return Number(rows[0].id);
}

// Short-lived signed links the add-on can hand to Google (card thumbnails,
// fetched by Google's image proxy without cookies) or open in a browser
// window (signs the user in to the site).
type LinkClaims = { p: "thumb"; gid: number } | { p: "open"; uid: number };

export async function signLink(claims: LinkClaims, ttl: string): Promise<string> {
  return new SignJWT(claims)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ttl)
    .sign(secret());
}

export async function verifyLink(token: string | null): Promise<LinkClaims | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (payload.p === "thumb" && Number.isInteger(payload.gid)) return { p: "thumb", gid: Number(payload.gid) };
    if (payload.p === "open" && Number.isInteger(payload.uid)) return { p: "open", uid: Number(payload.uid) };
  } catch {
    // expired or forged
  }
  return null;
}

export function siteOrigin(req: NextRequest): string {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "www.instagraphic.app";
  const proto = req.headers.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}
