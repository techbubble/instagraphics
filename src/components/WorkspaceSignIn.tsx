"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { embedHost, embedParentOrigin } from "@/lib/embed";

const noSubscribe = () => () => {};

// Asks the Slides/Docs add-on sidebar for a Google ID token for the user.
function requestIdentity(origin: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => done(new Error("timeout")), 15000);
    function done(err: Error | null, token?: string) {
      clearTimeout(timer);
      window.removeEventListener("message", onMessage);
      if (err) reject(err);
      else resolve(token!);
    }
    function onMessage(e: MessageEvent) {
      if (e.origin !== origin || !e.data || typeof e.data !== "object") return;
      if (e.data.type === "ig:identity" && typeof e.data.token === "string") done(null, e.data.token);
      else if (e.data.type === "ig:identity-error") done(new Error(String(e.data.message || "failed")));
    }
    window.addEventListener("message", onMessage);
    window.parent.postMessage({ type: "ig:need-identity" }, origin);
  });
}

// Navbar sign-in control for signed-out visitors. Inside the Slides/Docs
// add-on it signs in with the user's Google account automatically; the
// regular email sign-in link remains the fallback.
export default function WorkspaceSignIn() {
  const inWorkspace = useSyncExternalStore(noSubscribe, () => embedHost() === "workspace", () => false);
  const [failed, setFailed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const next = useSearchParams().get("next");

  useEffect(() => {
    if (!inWorkspace) return;
    const origin = embedParentOrigin();
    if (!origin) return;
    let cancelled = false;
    requestIdentity(origin)
      .then((token) =>
        fetch("/api/auth/google-addon", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })
      )
      .then((res) => {
        if (cancelled) return;
        if (!res.ok) throw new Error(`status ${res.status}`);
        if (pathname === "/login" || pathname === "/signup") {
          router.replace(next && next.startsWith("/") && !next.startsWith("//") ? next : "/");
        }
        router.refresh();
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [inWorkspace, pathname, next, router]);

  if (inWorkspace && !failed) {
    return (
      <span className="btn btn-primary btn-sm text-nowrap disabled" aria-live="polite">
        Signing in...
      </span>
    );
  }
  return (
    <Link className="btn btn-primary btn-sm text-nowrap" href="/login">
      Sign in
    </Link>
  );
}
