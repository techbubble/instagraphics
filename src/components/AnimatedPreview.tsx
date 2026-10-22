"use client";

import { useState } from "react";

// Animated GIF preview that plays as soon as it loads, with the static PNG
// standing in until then and a Replay control that restarts the loop.
export default function AnimatedPreview({
  src,
  animSrc,
  alt,
}: {
  src: string;
  animSrc: string;
  alt: string;
}) {
  const [ready, setReady] = useState(false);
  const [run, setRun] = useState(0);
  const style = { width: "100%", height: "auto", display: "block" } as const;
  return (
    <div className="position-relative">
      {/* eslint-disable-next-line @next/next/no-img-element -- dynamic endpoint */}
      <img
        key={run}
        src={`${animSrc}&r=${run}`}
        alt={alt}
        onLoad={() => setReady(true)}
        style={style}
        draggable={false}
      />
      {!ready && (
        // eslint-disable-next-line @next/next/no-img-element -- dynamic endpoint
        <img src={src} alt="" aria-hidden="true" className="position-absolute top-0 start-0" style={style} draggable={false} />
      )}
      <button
        type="button"
        className="btn btn-light btn-sm border shadow-sm position-absolute top-0 end-0 m-2"
        onClick={() => setRun((n) => n + 1)}
        disabled={!ready}
      >
        Replay
      </button>
    </div>
  );
}
