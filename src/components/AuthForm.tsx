"use client";

import { useActionState, useEffect, useState } from "react";
import { otpAction, type AuthState } from "@/app/(auth)/actions";

// Remembers a requested code across reloads. The extension popup closes when
// the user switches to their inbox, so without this they would land back on
// the email step.
const PENDING_KEY = "ig_pending_login";
const PENDING_MS = 10 * 60 * 1000; // matches the code TTL

function readPending(): string | null {
  try {
    const p = JSON.parse(localStorage.getItem(PENDING_KEY) || "null");
    return p && typeof p.email === "string" && Date.now() - p.at < PENDING_MS ? p.email : null;
  } catch {
    return null;
  }
}
function writePending(email: string | null) {
  try {
    if (email) localStorage.setItem(PENDING_KEY, JSON.stringify({ email, at: Date.now() }));
    else localStorage.removeItem(PENDING_KEY);
  } catch {
    // storage unavailable; resume is best-effort
  }
}

export default function AuthForm({ next }: { next: string }) {
  const [serverState, formAction, pending] = useActionState(otpAction, {
    step: "email",
  } as AuthState);
  const [resumed, setResumed] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is client-only
    setResumed(readPending());
  }, []);
  useEffect(() => {
    if (serverState.step === "code" && serverState.email) writePending(serverState.email);
  }, [serverState]);

  // Before any server response, fall back to a remembered pending code.
  const fresh = serverState.step === "email" && !serverState.error && !serverState.notice;
  const state: AuthState =
    fresh && resumed
      ? { step: "code", email: resumed, notice: `Enter the 6-digit code we emailed to ${resumed}.` }
      : serverState;

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
            <form action={formAction} onSubmit={() => writePending(null)}>
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
              {resumed && fresh && (
                <button
                  className="btn btn-link btn-sm p-0 ms-3"
                  type="button"
                  onClick={() => {
                    writePending(null);
                    setResumed(null);
                  }}
                >
                  Use a different email
                </button>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
