import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import type { MacPresenceTier } from "@/features/agent-witch/online-wake/public-api/types";
import { parseHeartbeatWriters } from "@/lib/agentWitch/deviceWriters";
import type { AgentWitchDevicePlatform } from "@/lib/agentWitch/types/AgentWitchDevicePlatform.type";

export interface ApiMacDevice {
  readonly id: string;
  readonly tokenHash?: string | null;
  readonly platform?: AgentWitchDevicePlatform;
  readonly deviceLabel: string | null;
  readonly displayName: string | null;
  readonly claimedAt: string;
  readonly lastSeenAt: string | null;
  readonly isConnected?: boolean;
  readonly isOnline?: boolean;
  readonly presenceTier?: MacPresenceTier;
  readonly isDispatchReady?: boolean;
  readonly lastHeartbeatAt: string | null;
  readonly isActive?: boolean;
  readonly installBundleVersion?: string | null;
  readonly connectVersionStatus?: unknown;
  readonly wakePort?: number | null;
  readonly writers?: unknown;
}

/** One `/api/agent-witch/devices` row as the composer and pickers use it. */
export const mapApiMacDevice = (device: ApiMacDevice): MyMacDevice => {
  const writers = parseHeartbeatWriters(device.writers);
  return {
    id: device.id,
    tokenHash:
      typeof device.tokenHash === "string" && device.tokenHash.trim().length > 0
        ? device.tokenHash.trim()
        : null,
    platform:
      device.platform === "linux" || device.platform === "mac"
        ? device.platform
        : "mac",
    deviceLabel: device.deviceLabel,
    displayName:
      typeof device.displayName === "string" ? device.displayName : null,
    claimedAt: device.claimedAt,
    lastSeenAt: device.lastSeenAt,
    isConnected: device.isConnected === true,
    isOnline: device.isOnline === true,
    presenceTier: device.presenceTier,
    isDispatchReady: device.isDispatchReady === true,
    lastHeartbeatAt: device.lastHeartbeatAt ?? null,
    installBundleVersion:
      typeof device.installBundleVersion === "string"
        ? device.installBundleVersion
        : null,
    ...(device.connectVersionStatus === "ok" ||
    device.connectVersionStatus === "too_old"
      ? { connectVersionStatus: device.connectVersionStatus }
      : {}),
    wakePort:
      typeof device.wakePort === "number" &&
      Number.isInteger(device.wakePort) &&
      device.wakePort > 0
        ? device.wakePort
        : null,
    // 77e29f7a: writers were dropped here, so the not-ready warning and
    // the ready-writer default never saw them.
    ...(writers !== null ? { writers } : {}),
  };
};
