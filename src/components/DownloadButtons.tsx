"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { embedGoogleFonts, svgToPngBlob, triggerDownload } from "@/lib/svg-engine";
import { embedHost, embedParentOrigin } from "@/lib/embed";

const noSubscribe = () => () => {};

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] ?? "");
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}

// Hands the image to the Slides/Docs add-on sidebar, which inserts it into
// the open file, and waits for its reply.
function insertIntoHost(blob: Blob, name: string): Promise<void> {
  const origin = embedParentOrigin();
  if (!origin) return Promise.reject(new Error("Not in Slides or Docs."));
  const id = crypto.randomUUID();
  return blobToBase64(blob).then(
    (data) =>
      new Promise<void>((resolve, reject) => {
        const timer = setTimeout(() => done(new Error("Insert timed out.")), 60000);
        function done(err?: Error) {
          clearTimeout(timer);
          window.removeEventListener("message", onMessage);
          if (err) reject(err);
          else resolve();
        }
        function onMessage(e: MessageEvent) {
          if (e.origin !== origin || !e.data || e.data.id !== id) return;
          if (e.data.type === "ig:inserted") done();
          else if (e.data.type === "ig:insert-error") done(new Error(String(e.data.message || "Insert failed.")));
        }
        window.addEventListener("message", onMessage);
        window.parent.postMessage({ type: "ig:insert", id, name, mime: blob.type, data }, origin);
      })
  );
}

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

  // Inside the Slides/Docs add-on the primary action inserts the image.
  const inWorkspace = useSyncExternalStore(noSubscribe, () => embedHost() === "workspace", () => false);
  const [inserted, setInserted] = useState(false);

  // Fetches the graphic (charging the first-download credit) and returns it
  // as a file, or null after handling sign-in / out-of-credits.
  async function fetchAsset(format: Format): Promise<{ blob: Blob; name: string } | null> {
    const res = await fetch(`/api/graphics/${graphicId}/download`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ format }),
    });
    if (res.status === 401) {
      router.push("/login");
      return null;
    }
    if (res.status === 402) {
      setError("Out of credits.");
      return null;
    }
    if (!res.ok) throw new Error("Download failed.");
    if (format === "gif") {
      const title = decodeURIComponent(res.headers.get("X-Title") || "graphic");
      return { blob: await res.blob(), name: `${slugify(title)}.gif` };
    }
    const { svg, title } = await res.json();
    const name = slugify(title);
    const embedded = await embedGoogleFonts(svg);
    if (format === "svg") {
      return { blob: new Blob([embedded], { type: "image/svg+xml" }), name: `${name}.svg` };
    }
    return { blob: await svgToPngBlob(embedded, { background: null }), name: `${name}.png` };
  }

  async function download(format: Format) {
    setBusy(format);
    setError(null);
    try {
      const asset = await fetchAsset(format);
      if (!asset) return;
      triggerDownload(asset.blob, asset.name);
      if (goToLibrary) router.push("/my");
      // refresh so the navbar credit count reflects the charge
      router.refresh();
    } catch {
      setError("Download failed.");
    } finally {
      setBusy(null);
    }
  }

  async function insert(format: "png" | "gif") {
    setBusy(format);
    setError(null);
    setInserted(false);
    try {
      const asset = await fetchAsset(format);
      if (!asset) return;
      await insertIntoHost(asset.blob, asset.name);
      setInserted(true);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error && e.message !== "Download failed." ? e.message : "Insert failed.");
    } finally {
      setBusy(null);
    }
  }

  const lg = size === "lg";
  const btn = lg ? "btn btn-primary" : "btn btn-primary btn-sm";
  if (inWorkspace) {
    return (
      <div className={lg ? "text-center" : ""}>
        <div className={`d-flex flex-wrap gap-2 ${lg ? "justify-content-center" : ""}`}>
          <button className={btn} disabled={busy !== null} onClick={() => insert("png")}>
            {busy === "png" ? "Inserting..." : "Insert image"}
          </button>
          <button className={btn} disabled={busy !== null} onClick={() => insert("gif")}>
            {busy === "gif" ? "Rendering..." : "Insert animated GIF"}
          </button>
        </div>
        {inserted && <div className="small text-success mt-1">Inserted.</div>}
        {!paid && (
          <div className="small text-secondary mt-1">
            First insert or download uses 1 credit, then it&apos;s free.
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
