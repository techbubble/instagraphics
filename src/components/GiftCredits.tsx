"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GiftCredits({ balance }: { balance: number }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [credits, setCredits] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);

  const valid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    Number.isInteger(credits) &&
    credits >= 1 &&
    credits <= balance;

  async function send() {
    setBusy(true);
    setError(null);
    setSent(null);
    try {
      const res = await fetch("/api/gift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), credits }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Could not send the gift.");
      setSent(
        `Sent ${credits} credit${credits === 1 ? "" : "s"} to ${email.trim()}. They will find the credits in their account when they sign in with that email.`
      );
      setEmail("");
      setCredits(1);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send the gift.");
    } finally {
      setBusy(false);
    }
  }

  if (balance < 1) {
    return (
      <p className="text-secondary">
        You need at least 1 credit to send a gift. Buy credits first.
      </p>
    );
  }

  return (
    <>
      <div className="mb-3">
        <label className="form-label fw-bold small" htmlFor="gift-email">
          Recipient email
        </label>
        <input
          id="gift-email"
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-bold small" htmlFor="gift-credits">
          Credits to send (you have {balance})
        </label>
        <input
          id="gift-credits"
          type="number"
          className="form-control"
          min={1}
          max={balance}
          value={credits}
          onChange={(e) => setCredits(Number(e.target.value))}
        />
      </div>
      {error && <div className="alert alert-danger py-2">{error}</div>}
      {sent && <div className="alert alert-success py-2">{sent}</div>}
      <div className="text-center">
        <button type="button" className="btn btn-primary px-4" disabled={!valid || busy} onClick={send}>
          {busy ? "Sending..." : "Send"}
        </button>
      </div>
      <p className="text-secondary small mt-3">
        The credits move to the recipient&apos;s account immediately and we email
        them the good news. Gifts are final and cannot be recalled.
      </p>
    </>
  );
}
