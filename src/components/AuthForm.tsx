"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { AuthState } from "@/app/(auth)/actions";

export default function AuthForm({
  mode,
  action,
  next,
}: {
  mode: "login" | "signup";
  action: (prev: AuthState, form: FormData) => Promise<AuthState>;
  next: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const isSignup = mode === "signup";
  return (
    <div className="row justify-content-center">
      <div className="col-md-5 col-lg-4">
        <h1 className="h3 mb-4">{isSignup ? "Create your account" : "Sign in"}</h1>
        {state.error && <div className="alert alert-danger">{state.error}</div>}
        <form action={formAction}>
          <input type="hidden" name="next" value={next} />
          {isSignup && (
            <div className="mb-3">
              <label className="form-label" htmlFor="name">Name</label>
              <input className="form-control" id="name" name="name" autoComplete="name" />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email</label>
            <input className="form-control" id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              className="form-control"
              id="password"
              name="password"
              type="password"
              required
              minLength={isSignup ? 8 : undefined}
              autoComplete={isSignup ? "new-password" : "current-password"}
            />
          </div>
          <button className="btn btn-primary w-100" type="submit" disabled={pending}>
            {pending ? "Please wait..." : isSignup ? "Sign up" : "Sign in"}
          </button>
        </form>
        <p className="mt-3 small text-secondary">
          {isSignup ? (
            <>Already have an account? <Link href={`/login?next=${encodeURIComponent(next)}`}>Sign in</Link></>
          ) : (
            <>New here? <Link href={`/signup?next=${encodeURIComponent(next)}`}>Create an account</Link></>
          )}
        </p>
      </div>
    </div>
  );
}
