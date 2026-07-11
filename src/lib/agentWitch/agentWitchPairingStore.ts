export interface AgentWitchClaimedPairing {
  readonly userId: string;
  readonly email: string;
  readonly claimedAt: string;
  readonly deviceId?: string;
}

export interface ClaimPairingResult {
  readonly success: boolean;
  readonly claimedPairing?: AgentWitchClaimedPairing;
  readonly errorMessage?: string;
}

export interface AgentWitchPairingStoreOptions {
  readonly persistToDatabase?: boolean;
}

const PAIR_ATTEMPT_WINDOW_MS = 60_000;
const MAX_PAIR_ATTEMPTS_PER_WINDOW = 10;

export class AgentWitchPairingStore {
  private readonly claimedByToken = new Map<string, AgentWitchClaimedPairing>();
  private readonly pairAttemptsByUserId = new Map<string, number[]>();
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

    if (!this.isPairAttemptAllowed(userId)) {
      return {
        success: false,
        errorMessage: "Too many pairing attempts. Try again in a minute.",
      };
    }

    this.recordPairAttempt(userId);

    if (this.persistToDatabase) {
      const databaseResult = await this.claimPairingInDatabase(
        trimmedToken,
        userId,
        email,
        deviceLabel,
      );
      if (!databaseResult.success) {
        return databaseResult;
      }

      return databaseResult;
    }

    const existingPairing = this.getClaimedPairing(trimmedToken);
    if (existingPairing !== null && existingPairing.userId !== userId) {
      return {
        success: false,
        errorMessage:
          "This pairing token is already linked to another account.",
      };
    }

    const claimedPairing: AgentWitchClaimedPairing = {
      userId,
      email,
      claimedAt: new Date().toISOString(),
    };
    this.claimedByToken.set(trimmedToken, claimedPairing);

    return {
      success: true,
      claimedPairing,
    };
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

    const { findAgentWitchDeviceByToken } =
      await import("./agentWitchDeviceRepository");
    const device = await findAgentWitchDeviceByToken(trimmedToken);

    if (device === null || device.revokedAt !== null) {
      return null;
    }

    const resolvedEmail =
      emailByUserId === undefined
        ? device.userId
        : ((await emailByUserId(device.userId)) ?? device.userId);

    const claimedPairing: AgentWitchClaimedPairing = {
      userId: device.userId,
      email: resolvedEmail,
      claimedAt: device.claimedAt,
      deviceId: device.id,
    };
    this.claimedByToken.set(trimmedToken, claimedPairing);
    return claimedPairing;
  }

  async touchLastSeen(
    pairingToken: string,
    deviceLabel?: string | null,
  ): Promise<void> {
    const trimmedToken = pairingToken.trim();
    if (this.persistToDatabase) {
      const { touchAgentWitchDeviceLastSeen } =
        await import("./agentWitchDeviceRepository");
      await touchAgentWitchDeviceLastSeen(trimmedToken, deviceLabel);
    }

    const cachedPairing = this.getClaimedPairing(trimmedToken);
    if (cachedPairing !== null) {
      this.claimedByToken.set(trimmedToken, cachedPairing);
    }
  }

  evictDeviceFromCache(deviceId: string): void {
    [...this.claimedByToken.entries()].forEach(([token, pairing]) => {
      if (pairing.deviceId === deviceId) {
        this.claimedByToken.delete(token);
      }
    });
  }

  evictPairingToken(pairingToken: string): void {
    this.claimedByToken.delete(pairingToken.trim());
  }

  isPairingOwnedByUser(pairingToken: string, userId: string): boolean {
    const claimedPairing = this.getClaimedPairing(pairingToken);
    return claimedPairing?.userId === userId;
  }

  private async claimPairingInDatabase(
    pairingToken: string,
    userId: string,
    email: string,
    deviceLabel?: string | null,
  ): Promise<ClaimPairingResult> {
    const { claimAgentWitchDevice, findAgentWitchDeviceByToken } =
      await import("./agentWitchDeviceRepository");
    const existingDevice = await findAgentWitchDeviceByToken(pairingToken);

    if (
      existingDevice !== null &&
      existingDevice.revokedAt === null &&
      existingDevice.userId !== userId
    ) {
      return {
        success: false,
        errorMessage:
          "This pairing token is already linked to another account.",
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
        errorMessage:
          "This pairing token is already linked to another account.",
      };
    }

    const claimedPairing: AgentWitchClaimedPairing = {
      userId,
      email,
      claimedAt: device.claimedAt,
      deviceId: device.id,
    };
    this.claimedByToken.set(pairingToken, claimedPairing);

    return {
      success: true,
      claimedPairing,
    };
  }

  private isPairAttemptAllowed(userId: string): boolean {
    const now = Date.now();
    const recentAttempts = (this.pairAttemptsByUserId.get(userId) ?? []).filter(
      (timestamp) => now - timestamp < PAIR_ATTEMPT_WINDOW_MS,
    );
    this.pairAttemptsByUserId.set(userId, recentAttempts);
    return recentAttempts.length < MAX_PAIR_ATTEMPTS_PER_WINDOW;
  }

  private recordPairAttempt(userId: string): void {
    const now = Date.now();
    const recentAttempts = (this.pairAttemptsByUserId.get(userId) ?? []).filter(
      (timestamp) => now - timestamp < PAIR_ATTEMPT_WINDOW_MS,
    );
    recentAttempts.push(now);
    this.pairAttemptsByUserId.set(userId, recentAttempts);
  }
}
