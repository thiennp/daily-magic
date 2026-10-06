import { THIS_MAC_DEVICE_BADGE_LABEL } from "@/components/ui/badge/thisMacDeviceBadgeLabel.constant";

/** `shell.computers.title` — locked heading (matches Team → Computers; V5-8 reuses). */
export const SHELL_COMPUTERS_TITLE = "Computers";

/**
 * L3 v5 Shell — sidebar Computers copy (Product PLAN §5.2, Lead locked EN).
 * "This computer" everywhere; "Latest v{n}" replaces Bundle jargon.
 */
export const APP_SHELL_COMPUTERS_COPY = {
  heading: SHELL_COMPUTERS_TITLE,
  thisComputer: THIS_MAC_DEVICE_BADGE_LABEL,
  empty: "No computers connected yet.",
  connectThis: "Connect this computer",
  connectAnother: "Connect another computer",
  /** Design Computers/Connect HTML — Download AgentWitch Local (HARD: always visible). */
  download: "Download AgentWitch Local",
  update: "Update",
  updateDisabledOffline: "Offline — update when it's back.",
  updateDisabledRemote: "Update it from that computer.",
  cursorCloudHelper:
    "To have Cursor Cloud do a task, choose it under Where should this run? when you send the task.",
} as const;

/** `computers.latest` → "Latest v{n}"; null when the server version is unknown. */
export const formatComputersLatestLabel = (
  version: string | null,
): string | null => {
  const trimmed = (version ?? "").trim().replace(/^v/i, "");
  return trimmed.length > 0 ? `Latest v${trimmed}` : null;
};
