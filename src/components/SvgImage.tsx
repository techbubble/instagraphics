"use client";

import { useEffect, useState } from "react";
import { embedGoogleFonts, svgToPngBlob } from "@/lib/svg-engine";

// Renders an SVG string as a rasterized PNG <img>, so the SVG markup never
// appears in the DOM. Google fonts are embedded (cached) before
// rasterizing so previews match the final output.
export default function SvgImage({
  svg,
  alt,
  className,
}: {
  svg: string;
  alt: string;
  className?: string;
}) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;
    (async () => {
      try {
        const embedded = await embedGoogleFonts(svg);
        const blob = await svgToPngBlob(embedded, { background: null });
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setUrl(objectUrl);
      } catch {
        // leave placeholder
      }
    })();
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [svg]);

  return url ? (
    // eslint-disable-next-line @next/next/no-img-element -- blob URL, not optimizable
    <img
      src={url}
      alt={alt}
      className={className}
      style={{ width: "100%", height: "auto", display: "block", aspectRatio: "4 / 3" }}
      draggable={false}
    />
  ) : (
    <div className={className} style={{ width: "100%", aspectRatio: "4 / 3" }} />
  );
}
