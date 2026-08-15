"use server";

import { createHash, randomInt, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { createSession, destroySession } from "@/lib/auth";
import { sendOtpEmail } from "@/lib/mailer";

export type AuthState = {
  step: "email" | "code";
  email?: string;
  error?: string;
  notice?: string;
};

const CODE_TTL_MINUTES = 10;
const RESEND_SECONDS = 60;
const MAX_ATTEMPTS = 5;

function hashCode(code: string): string {
  return createHash("sha256").update(code).digest("hex");
}

function nextPath(form: FormData): string {
  const next = String(form.get("next") || "/");
  return next.startsWith("/") && !next.startsWith("//") ? next : "/";
}

function cleanEmail(form: FormData): string | null {
  const email = String(form.get("email") || "").trim().toLowerCase();
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? email : null;
}

// Single dispatcher so the client form needs one useActionState.
export async function otpAction(
  prev: AuthState,
  form: FormData
): Promise<AuthState> {
  return form.get("intent") === "verify"
    ? verifyCodeAction(prev, form)
    : requestCodeAction(prev, form);
}

async function requestCodeAction(
  _prev: AuthState,
  form: FormData
): Promise<AuthState> {
  const email = cleanEmail(form);
  if (!email) return { step: "email", error: "Enter a valid email address." };

  const recent = await sql()`
    SELECT 1 FROM login_codes
    WHERE email = ${email}
      AND created_at > now() - make_interval(secs => ${RESEND_SECONDS})
  `;
  if (recent.length > 0) {
    return {
      step: "code",
      email,
      notice: "A code was already sent. Check your email.",
    };
  }

  const code = String(randomInt(0, 1000000)).padStart(6, "0");
  await sql()`
    INSERT INTO login_codes (email, code_hash, expires_at)
    VALUES (${email}, ${hashCode(code)}, now() + make_interval(mins => ${CODE_TTL_MINUTES}))
    ON CONFLICT (email) DO UPDATE SET
      code_hash = EXCLUDED.code_hash,
      expires_at = EXCLUDED.expires_at,
      attempts = 0,
      created_at = now()
  `;
  try {
    await sendOtpEmail(email, code);
  } catch {
    await sql()`DELETE FROM login_codes WHERE email = ${email}`;
    return { step: "email", error: "Could not send the email. Try again." };
  }
  return { step: "code", email, notice: `We emailed a 6-digit code to ${email}.` };
}

async function verifyCodeAction(
  _prev: AuthState,
  form: FormData
): Promise<AuthState> {
  const email = cleanEmail(form);
  const code = String(form.get("code") || "").trim();
  if (!email) return { step: "email", error: "Enter a valid email address." };
  if (!/^\d{6}$/.test(code)) {
    return { step: "code", email, error: "Enter the 6-digit code." };
  }

  const rows = (await sql()`
    UPDATE login_codes SET attempts = attempts + 1
    WHERE email = ${email}
    RETURNING code_hash, expires_at, attempts
  `) as { code_hash: string; expires_at: string; attempts: number }[];
  const row = rows[0];
  if (!row) return { step: "email", error: "No code requested. Start again." };
  if (row.attempts > MAX_ATTEMPTS) {
    await sql()`DELETE FROM login_codes WHERE email = ${email}`;
    return { step: "email", error: "Too many attempts. Request a new code." };
  }
  if (new Date(row.expires_at) < new Date()) {
    await sql()`DELETE FROM login_codes WHERE email = ${email}`;
    return { step: "email", error: "Code expired. Request a new one." };
  }
  const expected = Buffer.from(row.code_hash, "hex");
  const actual = Buffer.from(hashCode(code), "hex");
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return { step: "code", email, error: "Incorrect code. Try again." };
  }

  await sql()`DELETE FROM login_codes WHERE email = ${email}`;
  const users = (await sql()`
    INSERT INTO users (email) VALUES (${email})
    ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
    RETURNING id
  `) as { id: number }[];
  await createSession(users[0].id);
  revalidatePath("/", "layout");
  redirect(nextPath(form));
}

export async function logoutAction() {
  await destroySession();
  revalidatePath("/", "layout");
  redirect("/");
}
