"use client";

import Script from "next/script";

// Reddit Pixel base code. No-op unless NEXT_PUBLIC_REDDIT_PIXEL_ID is set.
// Events fired elsewhere: Purchase (credits bought), AddToCart (graphic
// unlocked via first download).
const PIXEL_ID = process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID;

declare global {
  interface Window {
    rdt?: (...args: unknown[]) => void;
  }
}

export function trackReddit(event: string, data?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.rdt) {
    window.rdt("track", event, data);
  }
}

export default function RedditPixel() {
  if (!PIXEL_ID) return null;
  return (
    <Script id="reddit-pixel" strategy="afterInteractive">
      {`!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','${PIXEL_ID}');rdt('track','PageVisit');`}
    </Script>
  );
}
