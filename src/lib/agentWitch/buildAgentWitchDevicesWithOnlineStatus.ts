import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";
import { isAgentWitchDeviceRecentlySeen } from "@/lib/agentWitch/agentWitchHeartbeat.constant";

export interface AgentWitchDeviceWithOnlineStatus {
  readonly id: string;
  readonly deviceLabel: string | null;
  readonly displayName: string | null;
  readonly claimedAt: string;
  readonly lastSeenAt: string | null;
  readonly revokedAt: string | null;
  readonly isActive: boolean;
  readonly dispatchPolicy: AgentWitchDeviceRecord["dispatchPolicy"];
  readonly isConnected: boolean;
  readonly isOnline: boolean;
  readonly lastHeartbeatAt: string | null;
  readonly lastWakeError?: string | null;
}

/**
 * Presence tiers for the device list / Mac picker.
 * `isConnected` = live agent WebSocket on this hub process (dispatch-ready).
 * `isOnline` = live OR `last_seen_at` within the online window (~90s).
 * Do not treat a fresh DB heartbeat alone as connected — that lied when the
 * Mac’s WS lived on another replica (or pairing metadata was unbound).
 */
const buildAgentWitchDevicesWithOnlineStatus = (
  devices: readonly AgentWitchDeviceRecord[],
  liveDeviceIds: ReadonlySet<string> = new Set(),
): readonly AgentWitchDeviceWithOnlineStatus[] => {
  const nowMs = Date.now();

  return devices.map((device) => {
    const isConnected = liveDeviceIds.has(device.id);
    const isOnline =
      isConnected || isAgentWitchDeviceRecentlySeen(device.lastSeenAt, nowMs);

    return {
      id: device.id,
      deviceLabel: device.deviceLabel,
      displayName: device.displayName,
      claimedAt: device.claimedAt,
      lastSeenAt: device.lastSeenAt,
      revokedAt: device.revokedAt,
      isActive: device.revokedAt === null,
      dispatchPolicy: device.dispatchPolicy,
      isConnected,
      isOnline,
      lastHeartbeatAt: isOnline ? device.lastSeenAt : null,
      lastWakeError: device.lastWakeError ?? null,
    };
  });
};

export default buildAgentWitchDevicesWithOnlineStatus;
