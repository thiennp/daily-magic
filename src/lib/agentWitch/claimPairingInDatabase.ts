import { claimAgentWitchDevice } from "@/lib/agentWitch/claimAgentWitchDevice";
import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";
import type AgentWitchClaimedPairing from "@/lib/agentWitch/types/AgentWitchClaimedPairing.type";
import type ClaimPairingResult from "@/lib/agentWitch/types/ClaimPairingResult.type";

export async function claimPairingInDatabase(
  pairingToken: string,
  userId: string,
  email: string,
  deviceLabel?: string | null,
): Promise<ClaimPairingResult> {
  const existingDevice = await findAgentWitchDeviceByToken(pairingToken);

  if (
    existingDevice !== null &&
    existingDevice.revokedAt === null &&
    existingDevice.userId !== userId
  ) {
    return {
      success: false,
      errorMessage: "This pairing token is already linked to another account.",
    };
  }

  if (
    existingDevice !== null &&
    existingDevice.revokedAt !== null &&
    existingDevice.userId !== userId
  ) {
    return {
      success: false,
      errorMessage:
        "This pairing token was revoked and cannot be claimed by another account.",
    };
  }

  const device = await claimAgentWitchDevice({
    pairingToken,
    userId,
    deviceLabel: deviceLabel ?? existingDevice?.deviceLabel ?? null,
  });

  if (device.revokedAt !== null) {
    return {
      success: false,
      errorMessage: "This device has been revoked.",
    };
  }

  if (device.userId !== userId) {
    return {
      success: false,
      errorMessage: "This pairing token is already linked to another account.",
    };
  }

  const claimedPairing: AgentWitchClaimedPairing = {
    userId,
    email,
    claimedAt: device.claimedAt,
    deviceId: device.id,
  };

  return {
    success: true,
    claimedPairing,
  };
}
