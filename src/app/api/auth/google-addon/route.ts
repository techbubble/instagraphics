import { NextRequest, NextResponse } from "next/server";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { sql } from "@/lib/db";
import { createSession } from "@/lib/auth";

// Signs in from the Google Slides / Docs add-on sidebar. The add-on passes
// an OpenID Connect ID token from ScriptApp.getIdentityToken(); it is signed
// by Google and bound to the add-on's OAuth client ID (aud), so a token
// minted for any other app is rejected.
const GOOGLE_JWKS = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));

function allowedAudiences(): string[] {
  return (process.env.GOOGLE_ADDON_CLIENT_IDS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function POST(req: NextRequest) {
  let token = "";
  try {
    token = String((await req.json()).token || "");
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 });

  let payload;
  try {
    ({ payload } = await jwtVerify(token, GOOGLE_JWKS, {
      issuer: ["https://accounts.google.com", "accounts.google.com"],
    }));
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const aud = String(payload.aud ?? "");
  const allowed = allowedAudiences();
  if (!allowed.includes(aud)) {
    // Local testing with an ad-hoc Apps Script project: accept any client
    // ID but say which one to allow in production.
    if (process.env.NODE_ENV === "development" && allowed.length === 0) {
      console.warn(`[dev] Accepting add-on client ID ${aud}. Set GOOGLE_ADDON_CLIENT_IDS=${aud} in production.`);
    } else {
      console.warn(`Rejected add-on sign-in for client ID ${aud}; not in GOOGLE_ADDON_CLIENT_IDS.`);
      return NextResponse.json({ error: "Unknown add-on" }, { status: 403 });
    }
  }

  const email = String(payload.email ?? "").trim().toLowerCase();
  if (!email || payload.email_verified !== true) {
    return NextResponse.json({ error: "No verified email" }, { status: 401 });
  }

  const users = (await sql()`
    INSERT INTO users (email) VALUES (${email})
    ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
    RETURNING id
  `) as { id: number }[];
  await createSession(users[0].id);
  return NextResponse.json({ ok: true });
}
