import {
  insertAgentWitchDeviceClaim,
  isUniqueTokenHashViolation,
  updateExistingClaimForUser,
} from "@/lib/agentWitch/claimAgentWitchDeviceHelpers";
import { consolidateAgentWitchDeviceByHostname } from "@/lib/agentWitch/consolidateAgentWitchDeviceByHostname";
import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";
import hashPairingToken from "@/lib/agentWitch/hashPairingToken";
import { reclaimAgentWitchDeviceByHostname } from "@/lib/agentWitch/reclaimAgentWitchDeviceByHostname";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";

const finishClaim = async (input: {
  readonly claimedDevice: AgentWitchDeviceRecord;
  readonly userId: string;
  readonly tokenHash: string;
  readonly deviceLabel: string | null;
}): Promise<AgentWitchDeviceRecord> =>
  consolidateAgentWitchDeviceByHostname(input);

export async function claimAgentWitchDevice(input: {
  readonly pairingToken: string;
  readonly userId: string;
  readonly deviceLabel?: string | null;
}): Promise<AgentWitchDeviceRecord> {
  const tokenHash = hashPairingToken(input.pairingToken);
  const deviceLabel = input.deviceLabel ?? null;
  const existing = await findAgentWitchDeviceByToken(input.pairingToken);

  if (
    existing !== null &&
    existing.revokedAt === null &&
    existing.userId === input.userId
  ) {
    const updated = await updateExistingClaimForUser({
      tokenHash,
      userId: input.userId,
      deviceLabel,
      unrevoke: false,
    });
    if (updated !== null) {
      return finishClaim({
        claimedDevice: updated,
        userId: input.userId,
        tokenHash,
        deviceLabel,
      });
    }
  }

  if (
    existing !== null &&
    existing.revokedAt !== null &&
    existing.userId === input.userId
  ) {
    const restored = await updateExistingClaimForUser({
      tokenHash,
      userId: input.userId,
      deviceLabel,
      unrevoke: true,
    });
    if (restored !== null) {
      return finishClaim({
        claimedDevice: restored,
        userId: input.userId,
        tokenHash,
        deviceLabel,
      });
    }
  }

  if (existing !== null && existing.userId !== input.userId) {
    throw new Error("This pairing token is already linked to another account.");
  }

  const reclaimed = await reclaimAgentWitchDeviceByHostname({
    userId: input.userId,
    tokenHash,
    deviceLabel,
  });
  if (reclaimed !== null) {
    return reclaimed;
  }

  try {
    const inserted = await insertAgentWitchDeviceClaim({
      userId: input.userId,
      tokenHash,
      deviceLabel,
    });
    return finishClaim({
      claimedDevice: inserted,
      userId: input.userId,
      tokenHash,
      deviceLabel,
    });
  } catch (error) {
    if (isUniqueTokenHashViolation(error)) {
      const raced = await findAgentWitchDeviceByToken(input.pairingToken);
      if (
        raced !== null &&
        raced.userId === input.userId &&
        raced.revokedAt === null
      ) {
        return finishClaim({
          claimedDevice: raced,
          userId: input.userId,
          tokenHash,
          deviceLabel,
        });
      }

      throw new Error(
        "This pairing token is already linked to another account.",
      );
    }

    throw error;
  }
}
