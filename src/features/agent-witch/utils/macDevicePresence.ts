export type MacPresenceTier = "live" | "recent" | "offline";

export interface MacDevicePresence {
  readonly isConnected: boolean;
  readonly isOnline: boolean;
}

export interface MacDevicePresenceCounts {
  readonly live: number;
  readonly recent: number;
  readonly offline: number;
}

export const resolveMacPresenceTier = (
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

/** Mac can receive install/send tasks right now (live socket or active heartbeat). */
export const canDispatchToMac = (device: MacDevicePresence): boolean =>
  resolveMacPresenceTier(device) === "live";

export const countMacPresenceTiers = (
  devices: readonly MacDevicePresence[],
): MacDevicePresenceCounts =>
  devices.reduce<MacDevicePresenceCounts>(
    (counts, device) => {
      const tier = resolveMacPresenceTier(device);
      return {
        ...counts,
        [tier]: counts[tier] + 1,
      };
    },
    { live: 0, recent: 0, offline: 0 },
  );

export const buildMacDevicesStatusLine = (
  counts: MacDevicePresenceCounts,
): string => {
  if (counts.live > 0) {
    const recentSuffix =
      counts.recent > 0 ? ` · ${counts.recent} seen recently` : "";
    return `${counts.live} connected${recentSuffix} · checks in every ~30s`;
  }

  if (counts.recent > 0) {
    return `${counts.recent} seen recently · open Agent Witch for a live connection`;
  }

  return "Connected Macs appear here when Agent Witch is running.";
};

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
