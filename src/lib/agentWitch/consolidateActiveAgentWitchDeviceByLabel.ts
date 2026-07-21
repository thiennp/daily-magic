import { revokeSiblingDevicesWithSameLabel } from "@/lib/agentWitch/claimAgentWitchDeviceHelpers";
import { isReusableDeviceLabel } from "@/lib/agentWitch/findActiveAgentWitchDeviceByUserAndLabel";

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
    deviceLabel: input.deviceLabel.trim(),
  });
};
