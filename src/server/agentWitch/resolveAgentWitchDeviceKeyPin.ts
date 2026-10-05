export type AgentWitchDeviceKeyPinDecision =
  | { readonly outcome: "allow-legacy" }
  | { readonly outcome: "proceed" }
  | { readonly outcome: "write-pin"; readonly publicKey: string }
  | { readonly outcome: "reject"; readonly errorMessage: string };

const devicePublicKeysMatch = (pinned: string, presented: string): boolean =>
  pinned.trim() === presented.trim();

/**
 * Pure pin decision for register:
 * first-hello pin / match refresh / mismatch / hello-less-when-pinned.
 * Caller verifies hello signature before acting on write-pin or mismatch.
 */
export const resolveAgentWitchDeviceKeyPin = (input: {
  readonly deviceId: string | undefined;
  readonly pinnedPublicKey: string | null;
  readonly presentedPublicKey: string;
  readonly helloMissing: boolean;
}): AgentWitchDeviceKeyPinDecision => {
  const { deviceId, pinnedPublicKey, presentedPublicKey, helloMissing } = input;

  if (helloMissing) {
    if (deviceId !== undefined && pinnedPublicKey !== null) {
      return {
        outcome: "reject",
        errorMessage: "Device authentication is required for this computer.",
      };
    }
    return { outcome: "allow-legacy" };
  }

  if (deviceId === undefined) {
    return { outcome: "proceed" };
  }

  if (pinnedPublicKey === null) {
    return { outcome: "write-pin", publicKey: presentedPublicKey };
  }

  if (devicePublicKeysMatch(pinnedPublicKey, presentedPublicKey)) {
    return { outcome: "write-pin", publicKey: presentedPublicKey };
  }

  return {
    outcome: "reject",
    errorMessage:
      "Device public key does not match the pinned key for this computer. Re-pair to replace the key.",
  };
};
