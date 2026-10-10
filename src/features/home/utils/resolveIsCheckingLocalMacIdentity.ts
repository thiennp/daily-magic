import type { LocalAgentWitchIdentityLoadStatus } from "@/features/agent-witch/public-api/types";

/**
 * A skipped wake probe leaves identity status at "idle". That is not an
 * in-flight check — treating it as one hides Connect this computer forever.
 */
export const resolveIsCheckingLocalMacIdentity = (input: {
  readonly isMacBrowser: boolean;
  readonly identityStatus: LocalAgentWitchIdentityLoadStatus;
  readonly shouldProbeWakeIdentity: boolean;
}): boolean => {
  if (!input.isMacBrowser || input.identityStatus === "ready") {
    return false;
  }

  if (input.identityStatus === "loading") {
    return true;
  }

  return input.shouldProbeWakeIdentity;
};
