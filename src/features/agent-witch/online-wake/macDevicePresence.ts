import type AgentWitchPresenceTier from "@/lib/agentWitch/types/AgentWitchPresenceTier.type";

export type MacPresenceTier = AgentWitchPresenceTier;

export interface MacDevicePresence {
  readonly isConnected: boolean;
  readonly isOnline: boolean;
  readonly presenceTier?: MacPresenceTier;
  readonly isDispatchReady?: boolean;
}

export interface MacDevicePresenceCounts {
  readonly live: number;
  readonly liveOtherInstance: number;
  readonly recent: number;
  readonly offline: number;
}

const resolveTierFromLegacyFlags = (
  device: MacDevicePresence,
): MacPresenceTier => {
  if (device.isConnected) {
    return "live";
  }

  if (device.isOnline) {
    return "recent";
  }

  return "offline";
};

export const resolveMacPresenceTier = (
  device: MacDevicePresence,
): MacPresenceTier => device.presenceTier ?? resolveTierFromLegacyFlags(device);

/** User-facing status for Mac picker rows (send-task, device lists). */
export const formatMacPresenceStatusLabel = (
  device: MacDevicePresence,
): string => {
  const tier = resolveMacPresenceTier(device);
  if (tier === "live") {
    return "Online";
  }
  if (tier === "live_other_instance") {
    return "Reconnecting (another server)";
  }
  if (tier === "recent") {
    return "Seen recently";
  }
  return "Offline";
};

export const isMacPresenceTierHardOffline = (tier: MacPresenceTier): boolean =>
  tier === "offline";

export const shouldOfferMacOfflineWakeHint = (
  device: MacDevicePresence,
): boolean => isMacPresenceTierHardOffline(resolveMacPresenceTier(device));

export const shouldShowMacPresenceLastSeen = (
  device: MacDevicePresence,
): boolean => {
  const tier = resolveMacPresenceTier(device);
  return tier === "offline" || tier === "recent";
};

/** Live on this server — preferred default Mac for writer dispatch. */
export const canRunWriterDispatchToMac = (device: MacDevicePresence): boolean =>
  resolveMacPresenceTier(device) === "live";

/** Mac can receive queued work when live locally or on another server instance. */
export const canDispatchToMac = (device: MacDevicePresence): boolean => {
  const tier = resolveMacPresenceTier(device);
  return tier === "live" || tier === "live_other_instance";
};

export const countDispatchReadyMacs = (
  devices: readonly MacDevicePresence[],
): number =>
  devices.reduce(
    (count, device) => (canDispatchToMac(device) ? count + 1 : count),
    0,
  );

export const hasAnyDispatchReadyMac = (
  devices: readonly MacDevicePresence[],
): boolean => countDispatchReadyMacs(devices) > 0;

export const countMacPresenceTiers = (
  devices: readonly MacDevicePresence[],
): MacDevicePresenceCounts =>
  devices.reduce<MacDevicePresenceCounts>(
    (counts, device) => {
      const tier = resolveMacPresenceTier(device);
      if (tier === "live") {
        return { ...counts, live: counts.live + 1 };
      }
      if (tier === "live_other_instance") {
        return { ...counts, liveOtherInstance: counts.liveOtherInstance + 1 };
      }
      if (tier === "recent") {
        return { ...counts, recent: counts.recent + 1 };
      }
      return { ...counts, offline: counts.offline + 1 };
    },
    { live: 0, liveOtherInstance: 0, recent: 0, offline: 0 },
  );

export {
  pickAlternateDispatchReadyDeviceId,
  pickAlternateWriterReadyDeviceId,
  pickDefaultMacDeviceId,
} from "./pickMacDeviceIdForPresence";

export { default as buildMacDevicesStatusLine } from "./buildMacDevicesStatusLine";
