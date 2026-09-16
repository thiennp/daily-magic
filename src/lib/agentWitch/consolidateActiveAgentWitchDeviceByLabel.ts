import { parseAgentWitchInstallDeviceLabel } from "@/lib/agentWitch/buildAgentWitchInstallDeviceLabel";
import { revokeSiblingDevicesWithSameLabel } from "@/lib/agentWitch/claimAgentWitchDeviceHelpers";
import { isReusableDeviceLabel } from "@/lib/agentWitch/findActiveAgentWitchDeviceByUserAndLabel";

/**
 * Legacy installs stored the bare hostname; current installs store
 * `hostname#macosusername`. Both label shapes describe this Mac, so the
 * bare-hostname row is a duplicate of the composite one and must be superseded
 * too — otherwise it stays active, visible, and undispatchable.
 */
const listDuplicateDeviceLabels = (deviceLabel: string): readonly string[] => {
  const trimmed = deviceLabel.trim();
  const parsed = parseAgentWitchInstallDeviceLabel(trimmed);

  return parsed.macOsUsername === null ? [trimmed] : [trimmed, parsed.hostname];
};

export const consolidateActiveAgentWitchDeviceByLabel = async (input: {
  readonly userId: string;
  readonly keepDeviceId: string;
  readonly deviceLabel: string | null;
}): Promise<void> => {
  if (!isReusableDeviceLabel(input.deviceLabel)) {
    return;
  }

  await revokeSiblingDevicesWithSameLabel({
    keepDeviceId: input.keepDeviceId,
    userId: input.userId,
    deviceLabels: listDuplicateDeviceLabels(input.deviceLabel),
  });
};
