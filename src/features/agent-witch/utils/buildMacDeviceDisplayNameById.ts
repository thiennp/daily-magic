import type { AgentWitchDevicePlatform } from "@/lib/agentWitch/types/AgentWitchDevicePlatform.type";

import {
  isGenericMacDeviceLabel,
  resolveMacDeviceDisplayName,
} from "@/features/agent-witch/utils/resolveMacDeviceDisplayName";

const resolveSavedMacDeviceDisplayName = (input: {
  readonly displayName?: string | null;
}): string | null => {
  if (input.displayName === undefined || input.displayName === null) {
    return null;
  }

  const trimmedDisplayName = input.displayName.trim();
  return trimmedDisplayName.length > 0 ? trimmedDisplayName : null;
};

const disambiguateDuplicateDisplayNames = (
  entries: ReadonlyArray<readonly [id: string, displayName: string]>,
): ReadonlyMap<string, string> => {
  const idsByDisplayName = new Map<string, string[]>();
  for (const [id, displayName] of entries) {
    const ids = idsByDisplayName.get(displayName) ?? [];
    ids.push(id);
    idsByDisplayName.set(displayName, ids);
  }

  return new Map(
    entries.map(([id, displayName]) => {
      const collidingIds = idsByDisplayName.get(displayName) ?? [];
      if (collidingIds.length <= 1) {
        return [id, displayName] as const;
      }

      const suffix = id.slice(-4).toUpperCase();
      return [id, `${displayName} · ${suffix}`] as const;
    }),
  );
};

export const buildMacDeviceDisplayNameById = (
  devices: ReadonlyArray<{
    readonly id: string;
    readonly deviceLabel: string | null;
    readonly displayName?: string | null;
    readonly platform?: AgentWitchDevicePlatform;
  }>,
): ReadonlyMap<string, string> => {
  const genericIndexById = new Map(
    devices
      .filter((device) => isGenericMacDeviceLabel(device.deviceLabel))
      .map((device, index) => [device.id, index] as const),
  );

  const entries = devices.map((device) => {
    const savedDisplayName = resolveSavedMacDeviceDisplayName(device);
    if (savedDisplayName !== null) {
      return [device.id, savedDisplayName] as const;
    }

    const displayName = isGenericMacDeviceLabel(device.deviceLabel)
      ? resolveMacDeviceDisplayName({
          deviceLabel: device.deviceLabel,
          fallbackIndex: genericIndexById.get(device.id),
          deviceCount: devices.length,
          platform: device.platform,
        })
      : resolveMacDeviceDisplayName({
          deviceLabel: device.deviceLabel,
          platform: device.platform,
        });

    return [device.id, displayName] as const;
  });

  return disambiguateDuplicateDisplayNames(entries);
};
