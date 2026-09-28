import {
  insertAgentWitchDeviceClaim,
  isUniqueTokenHashViolation,
} from "@/lib/agentWitch/claimAgentWitchDeviceHelpers";
import { updateExistingClaimForUser } from "@/lib/agentWitch/updateExistingClaimForUser";
import { consolidateAgentWitchDeviceByHostname } from "@/lib/agentWitch/consolidateAgentWitchDeviceByHostname";
import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";
import hashPairingToken from "@/lib/agentWitch/hashPairingToken";
import { reclaimAgentWitchDeviceByHostname } from "@/lib/agentWitch/reclaimAgentWitchDeviceByHostname";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";

export async function claimAgentWitchDevice(input: {
  readonly pairingToken: string;
  readonly userId: string;
  readonly deviceLabel?: string | null;
  readonly recordLastSeen?: boolean;
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
      recordLastSeen: input.recordLastSeen,
    });
    if (updated !== null) {
      return consolidateAgentWitchDeviceByHostname({
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
      return consolidateAgentWitchDeviceByHostname({
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
      recordLastSeen: input.recordLastSeen,
    });
    return consolidateAgentWitchDeviceByHostname({
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
        return consolidateAgentWitchDeviceByHostname({
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
