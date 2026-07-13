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
  if (!isGenericMacDeviceLabel(input.deviceLabel) && input.deviceLabel !== null) {
    return input.deviceLabel.trim();
  }

  if (input.deviceCount === 1 || input.fallbackIndex === 0) {
    return "Your Mac";
  }

  if (input.fallbackIndex !== undefined) {
    return `Mac ${input.fallbackIndex + 1}`;
  }

  return "Your Mac";
};

export const buildMacDeviceDisplayNameById = (
  devices: ReadonlyArray<{
    readonly id: string;
    readonly deviceLabel: string | null;
  }>,
): ReadonlyMap<string, string> => {
  const genericIndexById = new Map(
    devices
      .filter((device) => isGenericMacDeviceLabel(device.deviceLabel))
      .map((device, index) => [device.id, index] as const),
  );

  return new Map(
    devices.map((device) => {
      const displayName = isGenericMacDeviceLabel(device.deviceLabel)
        ? resolveMacDeviceDisplayName({
            deviceLabel: device.deviceLabel,
            fallbackIndex: genericIndexById.get(device.id),
            deviceCount: devices.length,
          })
        : resolveMacDeviceDisplayName({ deviceLabel: device.deviceLabel });

      return [device.id, displayName] as const;
    }),
  );
};
