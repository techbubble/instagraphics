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

// One Download button with a format picker. The first download of a
// graphic costs 1 credit; every download after that is free.
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
  const [format, setFormat] = useState<"svg" | "png">("svg");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function download() {
    setBusy(true);
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
      const embedded = await embedGoogleFonts(svg);
      if (format === "svg") {
        triggerDownload(new Blob([embedded], { type: "image/svg+xml" }), `${name}.svg`);
      } else {
        triggerDownload(await svgToPngBlob(embedded, { background: null }), `${name}.png`);
      }
      if (goToLibrary) router.push("/graphics");
      // refresh so the navbar credit count reflects the charge
      router.refresh();
    } catch {
      setError("Download failed.");
    } finally {
      setBusy(false);
    }
  }

  const sm = size === "sm";
  return (
    <div>
      <div className={`input-group ${sm ? "input-group-sm" : ""}`}>
        <button
          className="btn btn-primary"
          disabled={busy}
          onClick={download}
        >
          {paid ? "Download" : "Download (1 credit)"}
        </button>
        <select
          className="form-select flex-grow-0 w-auto"
          value={format}
          onChange={(e) => setFormat(e.target.value as "svg" | "png")}
          aria-label="Download format"
        >
          <option value="svg">SVG</option>
          <option value="png">PNG</option>
        </select>
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
