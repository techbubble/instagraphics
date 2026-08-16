"use client";

import { useEffect, useRef } from "react";
import { trackReddit } from "@/components/RedditPixel";

// Fires a Reddit Purchase conversion once on the credits success page.
export default function TrackPurchase({ value }: { value: number }) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackReddit("Purchase", { value, currency: "USD" });
  }, [value]);
  return null;
}
