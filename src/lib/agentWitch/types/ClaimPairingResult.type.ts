import type AgentWitchClaimedPairing from "@/lib/agentWitch/types/AgentWitchClaimedPairing.type";

export default interface ClaimPairingResult {
  readonly success: boolean;
  readonly claimedPairing?: AgentWitchClaimedPairing;
  readonly errorMessage?: string;
  /** Billing denial code when claim fails an entitlement gate. */
  readonly code?: string;
}
