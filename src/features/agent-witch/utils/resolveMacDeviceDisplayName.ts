const GENERIC_MAC_DEVICE_LABELS = new Set(["mac", "local agent"]);

export const isGenericMacDeviceLabel = (
  deviceLabel: string | null,
): boolean => {
  if (deviceLabel === null) {
    return true;
  }

  const trimmedLabel = deviceLabel.trim();
  return (
    trimmedLabel.length === 0 ||
    GENERIC_MAC_DEVICE_LABELS.has(trimmedLabel.toLowerCase())
  );
};

export const resolveMacDeviceDisplayName = (input: {
  readonly deviceLabel: string | null;
  readonly fallbackIndex?: number;
  readonly deviceCount?: number;
}): string => {
  if (
    !isGenericMacDeviceLabel(input.deviceLabel) &&
    input.deviceLabel !== null
  ) {
    const trimmed = input.deviceLabel.trim();
    const separatorIndex = trimmed.lastIndexOf("#");
    if (separatorIndex > 0 && separatorIndex < trimmed.length - 1) {
      return trimmed.slice(0, separatorIndex);
    }
    return trimmed;
  }

  if (input.deviceCount === 1 || input.fallbackIndex === 0) {
    return "Your Mac";
  }

  if (input.fallbackIndex !== undefined) {
    return `Mac ${input.fallbackIndex + 1}`;
  }

  return "Your Mac";
};

const resolveSavedMacDeviceDisplayName = (input: {
  readonly displayName?: string | null;
}): string | null => {
  if (input.displayName === undefined || input.displayName === null) {
    return null;
  }

  const trimmedDisplayName = input.displayName.trim();
  return trimmedDisplayName.length > 0 ? trimmedDisplayName : null;
};

/**
 * Two Macs can be paired with the same raw hostname (e.g. reinstalled, or
 * bought from the same vendor image) — without this, both would render the
 * identical display name with no way to tell them apart in a list or a
 * disabled "edit on this Mac" reason.
 */
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
        })
      : resolveMacDeviceDisplayName({ deviceLabel: device.deviceLabel });

    return [device.id, displayName] as const;
  });

  return disambiguateDuplicateDisplayNames(entries);
};
