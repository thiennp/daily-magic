import type { AgentWitchDevicePlatform } from "@/lib/agentWitch/types/AgentWitchDevicePlatform.type";

export { buildMacDeviceDisplayNameById } from "@/features/agent-witch/utils/buildMacDeviceDisplayNameById";

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
  readonly platform?: AgentWitchDevicePlatform;
}): string => {
  if (input.platform === "linux") {
    if (input.deviceCount === 1 || input.fallbackIndex === 0) {
      return "Linux device";
    }
    if (input.fallbackIndex !== undefined) {
      return `Linux device ${input.fallbackIndex + 1}`;
    }
    return "Linux device";
  }

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
