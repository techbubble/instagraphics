"use client";

import { useState } from "react";
import { isEmbedded } from "@/lib/embed";

// Mirrors src/lib/stripe.ts (server-only module): $1 buys 5 credits.
const CREDITS_PER_DOLLAR = 5;
const MAX_DOLLARS = 200;

export default function BuyCredits() {
  const [dollars, setDollars] = useState(5);
  const [busy, setBusy] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = Number.isInteger(dollars) && dollars >= 1 && dollars <= MAX_DOLLARS;

  async function checkout() {
    setBusy(true);
    setError(null);
    // Stripe Checkout refuses to load in an iframe (the extension popup), so
    // open a tab now, while the click still counts as a user gesture.
    const tab = isEmbedded() ? window.open("", "_blank") : null;
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packs: dollars }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Checkout failed.");
      }
      const { url } = await res.json();
      if (tab) {
        tab.location.href = url;
        setBusy(false);
      } else {
        window.location.href = url;
      }
    } catch (e) {
      tab?.close();
      setError(e instanceof Error ? e.message : "Checkout failed.");
      setBusy(false);
    }
  }

  return (
    <>
    <div className="alert alert-warning border-warning" role="alert">
      <div className="fw-bold text-uppercase text-center">Refund Policy</div>
      <div className="text-start">
        All credit purchases are final and non-refundable. By completing a
        purchase, you acknowledge and agree that no refunds, credits, or
        exchanges will be issued.
      </div>
      <div className="form-check d-flex justify-content-center gap-2 mt-2 mb-0">
        <input
          className="form-check-input"
          type="checkbox"
          id="refund-agree"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <label className="form-check-label fw-bold" htmlFor="refund-agree">
          I Agree
        </label>
      </div>
    </div>
    <div className="card">
      <div className="card-body">
        <label className="form-label" htmlFor="qty">
          Amount
        </label>
        <div className="input-group mb-1">
          <span className="input-group-text">$</span>
          <input
            id="qty"
            type="number"
            className="form-control"
            min={1}
            max={MAX_DOLLARS}
            step={1}
            value={dollars}
            onChange={(e) => setDollars(Number(e.target.value))}
          />
          <span className="input-group-text">.00</span>
        </div>
        <div className="small text-secondary mb-3">$0.20 per credit, in $1 steps (5 credits).</div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-secondary">You get</span>
          <span className="fs-5 fw-semibold">
            {valid ? `${dollars * CREDITS_PER_DOLLAR} credits` : "--"}
          </span>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button
          className="btn btn-primary w-100"
          onClick={checkout}
          disabled={busy || !valid || !agreed}
        >
          {busy ? "Redirecting..." : "Checkout with Stripe"}
        </button>
        <div className="small text-secondary text-center mt-2">
          By purchasing you agree to the <a href="/terms">Terms</a>.
        </div>
      </div>
    </div>
    </>
  );
}
