"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { embedGoogleFonts, svgToPngBlob, triggerDownload } from "@/lib/svg-engine";

function slugify(s: string): string {
  return (
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") ||
    "graphic"
  );
}

// Download buttons for the three formats. The first download of a graphic
// costs 1 credit; every download after that is free. SVG carries the reveal
// animation (plays in browsers, static elsewhere); GIF is the animation
// encoded; PNG is the finished frame.
type Format = "svg" | "png" | "gif";
export default function DownloadButtons({
  graphicId,
  paid,
  size = "sm",
  goToLibrary = false,
}: {
  graphicId: number;
  paid: boolean;
  size?: "sm" | "lg";
  goToLibrary?: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<Format | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function download(format: Format) {
    setBusy(format);
    setError(null);
    try {
      const res = await fetch(`/api/graphics/${graphicId}/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ format }),
      });
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (res.status === 402) {
        setError("Out of credits.");
        return;
      }
      if (!res.ok) {
        setError("Download failed.");
        return;
      }
      if (format === "gif") {
        const title = decodeURIComponent(res.headers.get("X-Title") || "graphic");
        triggerDownload(await res.blob(), `${slugify(title)}.gif`);
      } else {
      const { svg, title } = await res.json();
      const name = slugify(title);
      const embedded = await embedGoogleFonts(svg);
      if (format === "svg") {
        triggerDownload(new Blob([embedded], { type: "image/svg+xml" }), `${name}.svg`);
      } else {
        triggerDownload(await svgToPngBlob(embedded, { background: null }), `${name}.png`);
      }
      }
      if (goToLibrary) router.push("/my");
      // refresh so the navbar credit count reflects the charge
      router.refresh();
    } catch {
      setError("Download failed.");
    } finally {
      setBusy(null);
    }
  }

  const lg = size === "lg";
  const btn = lg ? "btn btn-primary" : "btn btn-primary btn-sm";
  return (
    <div className={lg ? "text-center" : ""}>
      <div className={`d-flex gap-2 ${lg ? "justify-content-center" : ""}`}>
        <button className={btn} disabled={busy !== null} onClick={() => download("svg")}>
          Download SVG
        </button>
        <button className={btn} disabled={busy !== null} onClick={() => download("png")}>
          Download PNG
        </button>
        <button className={btn} disabled={busy !== null} onClick={() => download("gif")}>
          {busy === "gif" ? "Rendering..." : "Download GIF"}
        </button>
      </div>
      {!paid && (
        <div className="small text-secondary mt-1">
          First download uses 1 credit, then downloads are free.
        </div>
      )}
      {error && (
        <div className="small text-danger mt-1">
          {error}{" "}
          {error === "Out of credits." && <a href="/credits">Buy credits</a>}
        </div>
      )}
    </div>
  );
}
