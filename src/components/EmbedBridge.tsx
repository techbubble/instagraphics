"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { embedParentOrigin } from "@/lib/embed";

// Tells the host (extension side panel or Slides/Docs sidebar) which page
// is open so it can reopen there.
export default function EmbedBridge() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  useEffect(() => {
    const parent = embedParentOrigin();
    if (!parent) return;
    const path = pathname + (search ? `?${search}` : "");
    window.parent.postMessage({ type: "ig:path", path }, parent);
  }, [pathname, search]);
  return null;
}
