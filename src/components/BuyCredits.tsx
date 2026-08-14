"use client";

import { useState } from "react";

export default function BuyCredits() {
  const [quantity, setQuantity] = useState(10);
  const [busy, setBusy] = useState(false);
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
          disabled={busy || !valid}
        >
          {busy ? "Redirecting..." : "Checkout with Stripe"}
        </button>
      </div>
    </div>
  );
}
