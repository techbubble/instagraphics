// Clicking the toolbar icon opens Instagraphic in Chrome's side panel.
// Set on every service-worker start; onInstalled alone is not reliable.
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});
