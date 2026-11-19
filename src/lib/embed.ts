// The site runs embedded as a cross-origin iframe in two hosts:
//   - the Chrome extension side panel (parent origin chrome-extension://...)
//   - the Google Slides / Docs add-on sidebar (parent origin is an Apps
//     Script sandbox, https://*-script.googleusercontent.com)
// These helpers detect that and talk to the host page.

export type EmbedHost = "extension" | "workspace";

// Keep in sync with the inline detection script in app/layout.tsx.
const WORKSPACE_ORIGIN = /^https:\/\/[a-z0-9-]+-script\.googleusercontent\.com$/;

export function isEmbedded(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

function parentOrigin(): string {
  return window.location.ancestorOrigins?.[0] ?? "";
}

export function embedHost(): EmbedHost | null {
  if (!isEmbedded()) return null;
  const origin = parentOrigin();
  if (origin.startsWith("chrome-extension://")) return "extension";
  if (WORKSPACE_ORIGIN.test(origin)) return "workspace";
  return null;
}

// Origin of the host page embedding us, or null when not in a known host.
export function embedParentOrigin(): string | null {
  return embedHost() ? parentOrigin() : null;
}
