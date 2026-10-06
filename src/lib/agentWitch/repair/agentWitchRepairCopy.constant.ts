/**
 * Product-owned copy for the AWL repair path (Product EN PASS 2026-10-06).
 * Product edits these strings here (no other file).
 */
export const AGENT_WITCH_REPAIR_COPY = {
  title: "Update AgentWitch Local",
  body: "If AgentWitch Local cannot update itself, run this command on this computer. It stops the app, backs up its settings, reinstalls the latest version, and keeps this computer linked. If nothing is linked yet, the command stops and tells you to use Connect this computer on Home.",
  safeToRerun: "Safe to run again if it stops partway.",
  commandLabels: {
    macos: "macOS: paste into Terminal",
    linux: "Linux: paste into a terminal",
    windows: "Windows: paste into PowerShell or Command Prompt (runs in WSL)",
  },
} as const;
