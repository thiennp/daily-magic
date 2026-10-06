import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";

export const installConnectionGetDevice = (
  overrides: Partial<AgentWitchDeviceRecord> = {},
): AgentWitchDeviceRecord => ({
  id: "device-1",
  userId: "user-1",
  platform: "mac",
  deviceLabel: null,
  displayName: "Office Mac",
  dispatchPolicy: null,
  claimedAt: "2026-01-01T00:00:00.000Z",
  lastSeenAt: "2026-01-01T00:00:00.000Z",
  revokedAt: null,
  lastWakeError: null,
  installBundleVersion: "76",
  ...overrides,
});
