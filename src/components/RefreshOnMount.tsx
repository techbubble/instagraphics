"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// The layout (navbar credit pill) renders in parallel with the page, so a
// balance updated during page render isn't reflected. One refresh after
// mount re-renders the tree with the settled balance.
export default function RefreshOnMount() {
  const router = useRouter();
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    router.refresh();
  }, [router]);
  return null;
}
