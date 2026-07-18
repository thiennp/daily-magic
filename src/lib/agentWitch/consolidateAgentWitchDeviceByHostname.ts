import { revokeSiblingDevicesWithSameLabel } from "@/lib/agentWitch/claimAgentWitchDeviceHelpers";
import {
  findActiveAgentWitchDeviceByUserAndLabel,
  isReusableDeviceLabel,
} from "@/lib/agentWitch/findActiveAgentWitchDeviceByUserAndLabel";
import { rotatePairingTokenOnExistingDevice } from "@/lib/agentWitch/rotatePairingTokenOnExistingDevice";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";

/**
 * If this Mac hostname already has a preferred named device row, move the
 * pairing token onto that row and revoke unlabeled duplicates.
 */
export const consolidateAgentWitchDeviceByHostname = async (input: {
  readonly claimedDevice: AgentWitchDeviceRecord;
  readonly userId: string;
  readonly tokenHash: string;
  readonly deviceLabel: string | null;
}): Promise<AgentWitchDeviceRecord> => {
  const label = input.deviceLabel ?? input.claimedDevice.deviceLabel;
  if (!isReusableDeviceLabel(label)) {
    return input.claimedDevice;
  }

  const preferred = await findActiveAgentWitchDeviceByUserAndLabel(
    input.userId,
    label.trim(),
  );
  if (preferred === null || preferred.id === input.claimedDevice.id) {
    return input.claimedDevice;
  }

  const rotated = await rotatePairingTokenOnExistingDevice({
    deviceId: preferred.id,
    userId: input.userId,
    tokenHash: input.tokenHash,
    deviceLabel: label,
  });
  if (rotated === null) {
    return input.claimedDevice;
  }

  await revokeSiblingDevicesWithSameLabel({
    keepDeviceId: rotated.id,
    userId: input.userId,
    deviceLabel: label,
  });

  return rotated;
};
