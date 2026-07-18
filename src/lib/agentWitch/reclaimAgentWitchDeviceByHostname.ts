import { revokeSiblingDevicesWithSameLabel } from "@/lib/agentWitch/claimAgentWitchDeviceHelpers";
import {
  findActiveAgentWitchDeviceByUserAndLabel,
  isReusableDeviceLabel,
} from "@/lib/agentWitch/findActiveAgentWitchDeviceByUserAndLabel";
import { rotatePairingTokenOnExistingDevice } from "@/lib/agentWitch/rotatePairingTokenOnExistingDevice";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";

export const reclaimAgentWitchDeviceByHostname = async (input: {
  readonly userId: string;
  readonly tokenHash: string;
  readonly deviceLabel: string | null;
}): Promise<AgentWitchDeviceRecord | null> => {
  if (!isReusableDeviceLabel(input.deviceLabel)) {
    return null;
  }

  const sameMac = await findActiveAgentWitchDeviceByUserAndLabel(
    input.userId,
    input.deviceLabel.trim(),
  );
  if (sameMac === null) {
    return null;
  }

  const rotated = await rotatePairingTokenOnExistingDevice({
    deviceId: sameMac.id,
    userId: input.userId,
    tokenHash: input.tokenHash,
    deviceLabel: input.deviceLabel,
  });
  if (rotated === null) {
    return null;
  }

  await revokeSiblingDevicesWithSameLabel({
    keepDeviceId: rotated.id,
    userId: input.userId,
    deviceLabel: input.deviceLabel,
  });

  return rotated;
};
