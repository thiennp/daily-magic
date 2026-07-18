import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";
import {
  AGENT_WITCH_ACTIVE_THRESHOLD_MS,
  isAgentWitchDeviceRecentlySeen,
} from "@/lib/agentWitch/agentWitchHeartbeat.constant";

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
}

/**
 * Online status from HTTP heartbeat only (no WebSocket hub).
 * `isConnected` = checked in within one heartbeat interval (~30s).
 * `isOnline` = checked in within the wider online window (~90s).
 */
const buildAgentWitchDevicesWithOnlineStatus = (
  devices: readonly AgentWitchDeviceRecord[],
): readonly AgentWitchDeviceWithOnlineStatus[] => {
  const nowMs = Date.now();

  return devices.map((device) => {
    const isConnected = isAgentWitchDeviceRecentlySeen(
      device.lastSeenAt,
      nowMs,
      AGENT_WITCH_ACTIVE_THRESHOLD_MS,
    );
    const isOnline = isAgentWitchDeviceRecentlySeen(device.lastSeenAt, nowMs);

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
    };
  });
};

export default buildAgentWitchDevicesWithOnlineStatus;
