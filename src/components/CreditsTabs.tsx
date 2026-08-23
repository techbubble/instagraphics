"use client";

import { useState } from "react";
import BuyCredits from "@/components/BuyCredits";
import GiftCredits from "@/components/GiftCredits";

export default function CreditsTabs({ balance }: { balance: number }) {
  const [tab, setTab] = useState<"buy" | "gift">("buy");
  return (
    <>
      <ul className="nav nav-tabs mb-3 justify-content-center">
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${tab === "buy" ? "active" : ""}`}
            onClick={() => setTab("buy")}
          >
            Buy Credits
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${tab === "gift" ? "active" : ""}`}
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
