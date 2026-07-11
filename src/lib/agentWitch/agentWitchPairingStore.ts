import { claimPairingInDatabase } from "@/lib/agentWitch/claimPairingInDatabase";
import { claimPairingInMemory } from "@/lib/agentWitch/claimPairingInMemory";
import {
  evictDeviceFromPairingCache,
  evictPairingTokenFromCache,
} from "@/lib/agentWitch/evictPairingCache";
import { createPairAttemptRateLimiter } from "@/lib/agentWitch/pairAttemptRateLimiter";
import { resolveClaimedPairingFromDatabase } from "@/lib/agentWitch/resolveClaimedPairingFromDatabase";
import type AgentWitchClaimedPairing from "@/lib/agentWitch/types/AgentWitchClaimedPairing.type";
import type AgentWitchPairingStoreOptions from "@/lib/agentWitch/types/AgentWitchPairingStoreOptions.type";
import type ClaimPairingResult from "@/lib/agentWitch/types/ClaimPairingResult.type";

export class AgentWitchPairingStore {
  private readonly claimedByToken = new Map<string, AgentWitchClaimedPairing>();
  private readonly pairAttemptRateLimiter = createPairAttemptRateLimiter();
  private readonly persistToDatabase: boolean;

  constructor(options: AgentWitchPairingStoreOptions = {}) {
    this.persistToDatabase = options.persistToDatabase === true;
  }

  async claimPairing(
    pairingToken: string,
    userId: string,
    email: string,
    deviceLabel?: string | null,
  ): Promise<ClaimPairingResult> {
    const trimmedToken = pairingToken.trim();
    if (trimmedToken.length === 0) {
      return {
        success: false,
        errorMessage: "Pairing token is required.",
      };
    }

    if (!this.pairAttemptRateLimiter.isPairAttemptAllowed(userId)) {
      return {
        success: false,
        errorMessage: "Too many pairing attempts. Try again in a minute.",
      };
    }

    this.pairAttemptRateLimiter.recordPairAttempt(userId);

    if (this.persistToDatabase) {
      const databaseResult = await claimPairingInDatabase(
        trimmedToken,
        userId,
        email,
        deviceLabel,
      );
      if (!databaseResult.success) {
        return databaseResult;
      }

      if (databaseResult.claimedPairing) {
        this.claimedByToken.set(trimmedToken, databaseResult.claimedPairing);
      }

      return databaseResult;
    }

    return claimPairingInMemory(
      this.claimedByToken,
      trimmedToken,
      userId,
      email,
    );
  }

  getClaimedPairing(pairingToken: string): AgentWitchClaimedPairing | null {
    return this.claimedByToken.get(pairingToken.trim()) ?? null;
  }

  async resolveClaimedPairing(
    pairingToken: string,
    emailByUserId?: (userId: string) => Promise<string | null>,
  ): Promise<AgentWitchClaimedPairing | null> {
    const trimmedToken = pairingToken.trim();
    const cachedPairing = this.getClaimedPairing(trimmedToken);
    if (cachedPairing !== null) {
      return cachedPairing;
    }

    if (!this.persistToDatabase) {
      return null;
    }

    const claimedPairing = await resolveClaimedPairingFromDatabase(
      trimmedToken,
      emailByUserId,
    );
    if (claimedPairing !== null) {
      this.claimedByToken.set(trimmedToken, claimedPairing);
    }

    return claimedPairing;
  }

  async touchLastSeen(
    pairingToken: string,
    deviceLabel?: string | null,
  ): Promise<void> {
    const trimmedToken = pairingToken.trim();
    if (this.persistToDatabase) {
      const { touchAgentWitchDeviceLastSeen } =
        await import("@/lib/agentWitch/touchAgentWitchDeviceLastSeen");
      await touchAgentWitchDeviceLastSeen(trimmedToken, deviceLabel);
    }

    const cachedPairing = this.getClaimedPairing(trimmedToken);
    if (cachedPairing !== null) {
      this.claimedByToken.set(trimmedToken, cachedPairing);
    }
  }

  evictDeviceFromCache(deviceId: string): void {
    evictDeviceFromPairingCache(this.claimedByToken, deviceId);
  }

  evictPairingToken(pairingToken: string): void {
    evictPairingTokenFromCache(this.claimedByToken, pairingToken);
  }

  isPairingOwnedByUser(pairingToken: string, userId: string): boolean {
    const claimedPairing = this.getClaimedPairing(pairingToken);
    return claimedPairing?.userId === userId;
  }
}
