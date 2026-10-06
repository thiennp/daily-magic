/**
 * Product-owned copy for the AWL repair path. Strings marked DRAFT were written
 * by engineering as placeholders; Product edits them here (no other file).
 */
export const AGENT_WITCH_REPAIR_COPY = {
  /** DRAFT */
  title: "Repair AgentWitch Local",
  /** DRAFT */
  body: "If AgentWitch Local cannot update itself, run this command. It stops the app, backs up its settings, reinstalls the latest version and keeps this computer paired.",
  /** DRAFT */
  safeToRerun: "Safe to run again if it stops partway.",
  /** DRAFT */
  commandLabels: {
    macos: "Mac: paste into Terminal",
    linux: "Linux: paste into a terminal",
    windows: "Windows: paste into PowerShell (runs inside WSL)",
  },
} as const;
