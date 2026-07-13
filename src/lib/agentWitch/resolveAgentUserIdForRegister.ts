import type { AgentWitchPairingStore } from "@/lib/agentWitch/agentWitchPairingStore";

export const resolveAgentUserIdForRegister = async (
  pairingStore: AgentWitchPairingStore,
  pairingToken: string,
): Promise<string | undefined> => {
  const claimedPairing = await pairingStore.resolveClaimedPairing(pairingToken);
  if (claimedPairing !== null) {
    void pairingStore.touchLastSeen(pairingToken);
  }
  return claimedPairing?.userId;
};
