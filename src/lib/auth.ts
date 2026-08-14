import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { sql } from "./db";

const COOKIE = "ig_session";

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
  const token = await new SignJWT({ uid: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret());
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function sessionUserId(): Promise<number | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return typeof payload.uid === "number" ? payload.uid : null;
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
  return rows[0] ?? null;
}
