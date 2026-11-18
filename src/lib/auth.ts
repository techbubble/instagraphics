import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { sql } from "./db";

const COOKIE = "ig_session";
// SameSite=None so the session works inside the Chrome extension popup, which
// embeds the site in a cross-site iframe. Cross-site API writes are blocked by
// the Origin check in src/proxy.ts. Secure is required with None; Chrome and
// Firefox accept it on http://localhost.
const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
  path: "/",
} as const;

function secret() {
  return new TextEncoder().encode(
    process.env.AUTH_SECRET || "instagraphics-dev-secret-change-me"
  );
}

export type SessionUser = {
  id: number;
  email: string;
  name: string;
  credits: number;
};

export async function createSession(userId: number) {
  // Neon returns BIGINT columns as strings; normalize before signing.
  const token = await new SignJWT({ uid: Number(userId) })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret());
  const jar = await cookies();
  jar.set(COOKIE, token, { ...COOKIE_OPTS, maxAge: 60 * 60 * 24 * 30 });
}

export async function destroySession() {
  const jar = await cookies();
  // Matching attributes so the deletion is also accepted in the iframe.
  jar.set(COOKIE, "", { ...COOKIE_OPTS, maxAge: 0 });
}

export async function sessionUserId(): Promise<number | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    const uid = Number(payload.uid);
    return Number.isInteger(uid) && uid > 0 ? uid : null;
  } catch {
    return null;
  }
}

export async function currentUser(): Promise<SessionUser | null> {
  const uid = await sessionUserId();
  if (uid == null) return null;
  const rows = (await sql()`
    SELECT id, email, name, credits FROM users WHERE id = ${uid}
  `) as SessionUser[];
  if (!rows[0]) return null;
  return { ...rows[0], id: Number(rows[0].id), credits: Number(rows[0].credits) };
}
