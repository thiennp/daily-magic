export interface AgentWitchClaimedPairing {
  readonly userId: string;
  readonly email: string;
  readonly claimedAt: string;
}

export class AgentWitchPairingStore {
  private readonly claimedByToken = new Map<string, AgentWitchClaimedPairing>();

  claimPairing(
    pairingToken: string,
    userId: string,
    email: string,
  ): AgentWitchClaimedPairing {
    const claimedPairing: AgentWitchClaimedPairing = {
      userId,
      email,
      claimedAt: new Date().toISOString(),
    };
    this.claimedByToken.set(pairingToken, claimedPairing);
    return claimedPairing;
  }

  getClaimedPairing(pairingToken: string): AgentWitchClaimedPairing | null {
    return this.claimedByToken.get(pairingToken) ?? null;
  }

  isPairingOwnedByUser(pairingToken: string, userId: string): boolean {
    const claimedPairing = this.getClaimedPairing(pairingToken);
    return claimedPairing?.userId === userId;
  }
}
