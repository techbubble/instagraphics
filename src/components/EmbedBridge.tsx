"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { extensionParentOrigin } from "@/lib/embed";

// Tells the extension popup which page is open so it can reopen there.
export default function EmbedBridge() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  useEffect(() => {
    const parent = extensionParentOrigin();
    if (!parent) return;
    const path = pathname + (search ? `?${search}` : "");
    window.parent.postMessage({ type: "ig:path", path }, parent);
  }, [pathname, search]);
  return null;
}
