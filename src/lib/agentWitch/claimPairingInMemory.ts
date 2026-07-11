import type AgentWitchClaimedPairing from "@/lib/agentWitch/types/AgentWitchClaimedPairing.type";
import type ClaimPairingResult from "@/lib/agentWitch/types/ClaimPairingResult.type";

export function claimPairingInMemory(
  claimedByToken: Map<string, AgentWitchClaimedPairing>,
  pairingToken: string,
  userId: string,
  email: string,
): ClaimPairingResult {
  const existingPairing = claimedByToken.get(pairingToken) ?? null;
  if (existingPairing !== null && existingPairing.userId !== userId) {
    return {
      success: false,
      errorMessage: "This pairing token is already linked to another account.",
    };
  }

  const claimedPairing: AgentWitchClaimedPairing = {
    userId,
    email,
    claimedAt: new Date().toISOString(),
  };
  claimedByToken.set(pairingToken, claimedPairing);

  return {
    success: true,
    claimedPairing,
  };
}
