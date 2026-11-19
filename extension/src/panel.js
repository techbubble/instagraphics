// Reopen the panel where the user left off; the site keeps form state in
// localStorage, and the last path is remembered here.
const BASE = "__BASE__";
const frame = document.getElementById("app");

chrome.storage.local.get("lastPath", ({ lastPath }) => {
  const path = typeof lastPath === "string" && lastPath.startsWith("/") ? lastPath : "/";
  frame.src = BASE + path;
});

window.addEventListener("message", (e) => {
  if (e.origin !== BASE || !e.data || typeof e.data !== "object") return;
  if (e.data.type === "ig:path" && typeof e.data.path === "string" && e.data.path.startsWith("/")) {
    chrome.storage.local.set({ lastPath: e.data.path });
  }
});
