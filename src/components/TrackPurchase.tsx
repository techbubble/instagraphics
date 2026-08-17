"use client";

import { useEffect, useRef } from "react";
import { trackReddit } from "@/components/RedditPixel";

// Fires a Reddit Purchase conversion once on the credits success page.
export default function TrackPurchase({
  value,
  conversionId,
}: {
  value: number;
  conversionId: string;
}) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackReddit("Purchase", { value, currency: "USD", conversionId });
  }, [value, conversionId]);
  return null;
}
