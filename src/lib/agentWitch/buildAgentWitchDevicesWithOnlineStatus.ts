import { resolveAgentWitchDevicePresenceTier } from "@/lib/agentWitch/resolveAgentWitchDevicePresenceTier";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";
import type AgentWitchPresenceTier from "@/lib/agentWitch/types/AgentWitchPresenceTier.type";
import { isAgentWitchDeviceRecentlySeen } from "@/lib/agentWitch/agentWitchHeartbeat.constant";

export interface AgentWitchDeviceWithOnlineStatus {
  readonly id: string;
  readonly tokenHash: string | null;
  readonly platform: AgentWitchDeviceRecord["platform"];
  readonly deviceLabel: string | null;
  readonly displayName: string | null;
  readonly claimedAt: string;
  readonly lastSeenAt: string | null;
  readonly revokedAt: string | null;
  readonly isActive: boolean;
  readonly dispatchPolicy: AgentWitchDeviceRecord["dispatchPolicy"];
  readonly isConnected: boolean;
  readonly isOnline: boolean;
  readonly presenceTier: AgentWitchPresenceTier;
  readonly isDispatchReady: boolean;
  readonly lastHeartbeatAt: string | null;
  readonly lastWakeError?: string | null;
  readonly installBundleVersion: string | null;
  readonly wakePort: number | null;
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
  localLiveDeviceIds: ReadonlySet<string> = new Set(),
  remoteLiveDeviceIds: ReadonlySet<string> = new Set(),
): readonly AgentWitchDeviceWithOnlineStatus[] => {
  const nowMs = Date.now();

  return devices.map((device) => {
    const presenceTier = resolveAgentWitchDevicePresenceTier({
      deviceId: device.id,
      lastSeenAt: device.lastSeenAt,
      localLiveDeviceIds,
      remoteLiveDeviceIds,
      nowMs,
    });
    const isConnected = presenceTier === "live";
    const isOnline =
      isConnected ||
      presenceTier === "live_other_instance" ||
      isAgentWitchDeviceRecentlySeen(device.lastSeenAt, nowMs);
    const isDispatchReady = isConnected;

    return {
      id: device.id,
      tokenHash: device.tokenHash ?? null,
      platform: device.platform ?? "mac",
      deviceLabel: device.deviceLabel,
      displayName: device.displayName,
      claimedAt: device.claimedAt,
      lastSeenAt: device.lastSeenAt,
      revokedAt: device.revokedAt,
      isActive: device.revokedAt === null,
      dispatchPolicy: device.dispatchPolicy,
      isConnected,
      isOnline,
      presenceTier,
      isDispatchReady,
      lastHeartbeatAt: isOnline ? device.lastSeenAt : null,
      lastWakeError: device.lastWakeError ?? null,
      installBundleVersion: device.installBundleVersion ?? null,
      wakePort: device.wakePort ?? null,
    };
  });
};

export default buildAgentWitchDevicesWithOnlineStatus;
