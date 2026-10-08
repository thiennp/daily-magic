import type { AgentWitchDeviceWithOnlineStatus } from "@/lib/agentWitch/buildAgentWitchDevicesWithOnlineStatus";

/**
 * c689f75d: opening "Connect another computer" mints a pairing row that has
 * never checked in. It is not a computer yet, so the list never shows it as
 * "Your computer — Offline · Version unknown · Too old to connect".
 */
export const isAgentWitchConnectPlaceholder = (
  device: Pick<
    AgentWitchDeviceWithOnlineStatus,
    | "isConnected"
    | "isOnline"
    | "installBundleVersion"
    | "deviceLabel"
    | "displayName"
  >,
): boolean =>
  !device.isConnected &&
  !device.isOnline &&
  (device.installBundleVersion?.trim() ?? "").length === 0 &&
  (device.deviceLabel?.trim() ?? "").length === 0 &&
  (device.displayName?.trim() ?? "").length === 0;
