import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";

const parseTimestamp = (value: string | null): number => {
  if (value === null) {
    return 0;
  }

  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const scoreAgentWitchDevicePreference = (
  device: AgentWitchDeviceRecord,
  preferDeviceIds: ReadonlySet<string> | undefined,
): number => {
  const liveBonus = preferDeviceIds?.has(device.id) === true ? 10_000 : 0;
  const bundleBonus =
    device.installBundleVersion !== null &&
    device.installBundleVersion !== undefined &&
    device.installBundleVersion.trim().length > 0
      ? 100
      : 0;
  const displayNameBonus =
    device.displayName !== null && device.displayName.trim().length > 0
      ? 10
      : 0;

  return (
    liveBonus +
    bundleBonus +
    displayNameBonus +
    Math.floor(parseTimestamp(device.lastSeenAt) / 1_000) -
    Math.floor(parseTimestamp(device.claimedAt) / 1_000_000)
  );
};

export const pickPreferredAgentWitchDevice = (
  devices: readonly AgentWitchDeviceRecord[],
  preferDeviceIds?: ReadonlySet<string>,
): AgentWitchDeviceRecord => {
  return devices.reduce((preferred, candidate) => {
    const preferredScore = scoreAgentWitchDevicePreference(
      preferred,
      preferDeviceIds,
    );
    const candidateScore = scoreAgentWitchDevicePreference(
      candidate,
      preferDeviceIds,
    );

    return candidateScore > preferredScore ? candidate : preferred;
  });
};
