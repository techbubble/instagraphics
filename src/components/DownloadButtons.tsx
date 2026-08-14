"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { svgToPngBlob, triggerDownload } from "@/lib/svg-engine";

function slugify(s: string): string {
  return (
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") ||
    "graphic"
  );
}

export default function DownloadButtons({
  graphicId,
  size = "sm",
}: {
  graphicId: number;
  size?: "sm" | "lg";
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<"svg" | "png" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function download(format: "svg" | "png") {
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
      const { svg, title } = await res.json();
      const name = slugify(title);
      if (format === "svg") {
        triggerDownload(new Blob([svg], { type: "image/svg+xml" }), `${name}.svg`);
      } else {
        triggerDownload(await svgToPngBlob(svg), `${name}.png`);
      }
      router.refresh();
    } catch {
      setError("Download failed.");
    } finally {
      setBusy(null);
    }
  }

  const btn = size === "lg" ? "btn btn-primary" : "btn btn-outline-primary btn-sm";
  return (
    <div>
      <div className="btn-group" role="group" aria-label="Download">
        <button className={btn} disabled={busy !== null} onClick={() => download("svg")}>
          {busy === "svg" ? "..." : "SVG"}
        </button>
        <button className={btn} disabled={busy !== null} onClick={() => download("png")}>
          {busy === "png" ? "..." : "PNG"}
        </button>
      </div>
      {error && (
        <div className="small text-danger mt-1">
          {error}{" "}
          {error === "Out of credits." && <a href="/credits">Buy credits</a>}
        </div>
      )}
    </div>
  );
}
