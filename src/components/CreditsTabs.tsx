"use client";

import { useState } from "react";
import BuyCredits from "@/components/BuyCredits";
import GiftCredits from "@/components/GiftCredits";

export default function CreditsTabs({ balance }: { balance: number }) {
  const [tab, setTab] = useState<"buy" | "gift">("buy");
  return (
    <>
      <ul className="nav nav-tabs nav-fill nav-justified mb-4 fs-5">
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link w-100 fw-bold ${tab === "buy" ? "active" : "text-secondary"}`}
            onClick={() => setTab("buy")}
          >
            Buy Credits
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link w-100 fw-bold ${tab === "gift" ? "active" : "text-secondary"}`}
            onClick={() => setTab("gift")}
          >
            Gift Credits
          </button>
        </li>
      </ul>
      {tab === "buy" ? <BuyCredits /> : <GiftCredits balance={balance} />}
    </>
  );
}
