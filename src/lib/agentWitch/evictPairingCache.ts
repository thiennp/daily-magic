import type AgentWitchClaimedPairing from "@/lib/agentWitch/types/AgentWitchClaimedPairing.type";

export function evictDeviceFromPairingCache(
  claimedByToken: Map<string, AgentWitchClaimedPairing>,
  deviceId: string,
): void {
  [...claimedByToken.entries()].forEach(([token, pairing]) => {
    if (pairing.deviceId === deviceId) {
      claimedByToken.delete(token);
    }
  });
}

export function evictPairingTokenFromCache(
  claimedByToken: Map<string, AgentWitchClaimedPairing>,
  pairingToken: string,
): void {
  claimedByToken.delete(pairingToken.trim());
}
