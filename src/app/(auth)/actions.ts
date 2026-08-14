"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { createSession, destroySession } from "@/lib/auth";

export type AuthState = { error?: string };

function nextPath(form: FormData): string {
  const next = String(form.get("next") || "/");
  return next.startsWith("/") && !next.startsWith("//") ? next : "/";
}

export async function signupAction(
  _prev: AuthState,
  form: FormData
): Promise<AuthState> {
  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");
  const name = String(form.get("name") || "").trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: "Enter a valid email address." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const existing = await sql()`SELECT id FROM users WHERE email = ${email}`;
  if (existing.length > 0) return { error: "An account with that email already exists." };

  const hash = await bcrypt.hash(password, 10);
  const rows = (await sql()`
    INSERT INTO users (email, password_hash, name)
    VALUES (${email}, ${hash}, ${name})
    RETURNING id
  `) as { id: number }[];
  await createSession(rows[0].id);
  redirect(nextPath(form));
}

export async function loginAction(
  _prev: AuthState,
  form: FormData
): Promise<AuthState> {
  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");
  const rows = (await sql()`
    SELECT id, password_hash FROM users WHERE email = ${email}
  `) as { id: number; password_hash: string }[];
  if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password_hash))) {
    return { error: "Invalid email or password." };
  }
  await createSession(rows[0].id);
  redirect(nextPath(form));
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
