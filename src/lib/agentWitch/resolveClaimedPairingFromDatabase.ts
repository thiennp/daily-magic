import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";
import type AgentWitchClaimedPairing from "@/lib/agentWitch/types/AgentWitchClaimedPairing.type";

export async function resolveClaimedPairingFromDatabase(
  pairingToken: string,
  emailByUserId?: (userId: string) => Promise<string | null>,
): Promise<AgentWitchClaimedPairing | null> {
  const device = await findAgentWitchDeviceByToken(pairingToken);

  if (device === null || device.revokedAt !== null) {
    return null;
  }

  const resolvedEmail =
    emailByUserId === undefined
      ? device.userId
      : ((await emailByUserId(device.userId)) ?? device.userId);

  return {
    userId: device.userId,
    email: resolvedEmail,
    claimedAt: device.claimedAt,
    deviceId: device.id,
  };
}
