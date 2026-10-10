import { refreshLocalAgentWitchIdentity } from "@/features/agent-witch/public-api/presentation";
import { setLocalMacTokenHash } from "@/features/home/utils/localMacTokenHashStore";

/** Persist a minted install-token hash as this browser's local Mac identity. */
export const rememberAgentWitchInstallTokenHash = (
  tokenHash: string | undefined,
): void => {
  if (tokenHash !== undefined && tokenHash.length > 0) {
    setLocalMacTokenHash(tokenHash);
    void refreshLocalAgentWitchIdentity();
  }
};
