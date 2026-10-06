import { THIS_MAC_DEVICE_BADGE_LABEL } from "@/components/ui/badge/thisMacDeviceBadgeLabel.constant";

/**
 * L3 v5 Shell — sidebar Devices copy (Product PLAN §5.2, Lead locked).
 * "This computer" everywhere; "Latest v{n}" replaces Bundle jargon.
 */
export const APP_SHELL_DEVICES_COPY = {
  heading: "Devices",
  thisComputer: THIS_MAC_DEVICE_BADGE_LABEL,
  connectThis: "Connect this computer",
  connectAnother: "Connect another computer",
  update: "Update",
  updateDisabledOffline: "Offline — update when it's back.",
} as const;

/** `devices.latest` → "Latest v{n}"; null when the server version is unknown. */
export const formatDevicesLatestLabel = (
  version: string | null,
): string | null => {
  const trimmed = (version ?? "").trim().replace(/^v/i, "");
  return trimmed.length > 0 ? `Latest v${trimmed}` : null;
};
