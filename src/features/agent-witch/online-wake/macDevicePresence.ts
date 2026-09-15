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
    return "Online (another server)";
  }
  if (tier === "recent") {
    return "Seen recently";
  }
  return "Offline";
};

/** Mac can receive queued install/send tasks when live locally or on another instance. */
export const canDispatchToMac = (device: MacDevicePresence): boolean => {
  if (device.isDispatchReady !== undefined) {
    return device.isDispatchReady;
  }

  const tier = resolveMacPresenceTier(device);
  return tier === "live" || tier === "live_other_instance";
};

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

export const pickDefaultMacDeviceId = (
  devices: readonly ({ readonly id: string } & MacDevicePresence)[],
): string => {
  const dispatchReadyDevice = devices.find((device) =>
    canDispatchToMac(device),
  );
  return dispatchReadyDevice?.id ?? devices[0]?.id ?? "";
};

export const pickAlternateDispatchReadyDeviceId = (
  devices: readonly ({ readonly id: string } & MacDevicePresence)[],
  selectedDeviceId: string,
): string | null => {
  const alternate = devices.find(
    (device) => canDispatchToMac(device) && device.id !== selectedDeviceId,
  );
  return alternate?.id ?? null;
};

export { default as buildMacDevicesStatusLine } from "./buildMacDevicesStatusLine";
