"use client";

import { useState } from "react";

export default function BuyCredits() {
  const [quantity, setQuantity] = useState(10);
  const [busy, setBusy] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = Number.isInteger(quantity) && quantity >= 1 && quantity <= 1000;

  async function checkout() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Checkout failed.");
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch (e) {
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
          Number of credits
        </label>
        <div className="input-group mb-3">
          <input
            id="qty"
            type="number"
            className="form-control"
            min={1}
            max={1000}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <span className="input-group-text">x $0.99</span>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-secondary">Total</span>
          <span className="fs-5 fw-semibold">
            {valid ? `$${(quantity * 0.99).toFixed(2)}` : "--"}
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
