// The site runs inside the Chrome extension popup as a cross-origin iframe.
// These helpers detect that and talk to the extension page.

export function isEmbedded(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

// Origin of the extension page hosting us, or null when not in the extension.
export function extensionParentOrigin(): string | null {
  if (!isEmbedded()) return null;
  const origin = window.location.ancestorOrigins?.[0] ?? "";
  return origin.startsWith("chrome-extension://") ? origin : null;
}
