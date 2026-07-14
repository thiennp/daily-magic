export type ConnectionScenarioId =
  | "all-online"
  | "all-offline"
  | "mixed"
  | "no-devices"
  | "api-error"
  | "ws-disconnected";

export interface MockMacDeviceRecord {
  readonly id: string;
  readonly deviceLabel: string;
  readonly claimedAt: string;
  readonly lastSeenAt: string | null;
  readonly isActive: boolean;
  readonly isOnline: boolean;
  readonly lastHeartbeatAt: string | null;
}
