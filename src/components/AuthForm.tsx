"use client";

import { useActionState } from "react";
import { otpAction, type AuthState } from "@/app/(auth)/actions";

export default function AuthForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(otpAction, {
    step: "email",
  } as AuthState);

  return (
    <div className="row justify-content-center">
      <div className="col-md-5 col-lg-4">
        <h1 className="h3 mb-4">Sign in</h1>
        <p className="text-secondary small">
          No passwords. Enter your email and we send a 6-digit code. New
          accounts are created automatically.
        </p>
        {state.error && <div className="alert alert-danger">{state.error}</div>}
        {state.notice && !state.error && (
          <div className="alert alert-info">{state.notice}</div>
        )}
        {state.step === "email" ? (
          <form action={formAction}>
            <input type="hidden" name="next" value={next} />
            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                className="form-control"
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                autoFocus
              />
            </div>
            <button className="btn btn-primary w-100" type="submit" disabled={pending}>
              {pending ? "Sending..." : "Email me a code"}
            </button>
          </form>
        ) : (
          <>
            <form action={formAction}>
              <input type="hidden" name="next" value={next} />
              <input type="hidden" name="email" value={state.email} />
              <input type="hidden" name="intent" value="verify" />
              <div className="mb-3">
                <label className="form-label" htmlFor="code">6-digit code</label>
                <input
                  className="form-control form-control-lg text-center"
                  id="code"
                  name="code"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  required
                  autoComplete="one-time-code"
                  autoFocus
                />
              </div>
              <button className="btn btn-primary w-100" type="submit" disabled={pending}>
                {pending ? "Verifying..." : "Sign in"}
              </button>
            </form>
            <form action={formAction} className="mt-2">
              <input type="hidden" name="next" value={next} />
              <input type="hidden" name="email" value={state.email} />
              <button className="btn btn-link btn-sm p-0" type="submit" disabled={pending}>
                Resend code
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
