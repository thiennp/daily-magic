import path from "node:path";

import {
  readActiveProfileEmailFromFile,
  resolveAgentWitchInstallDir,
} from "@agent-witch/install-layout";
import { AGENT_WITCH_PROFILES_DIR_NAME } from "@agent-witch/install-layout/types";

import hashPairingToken from "./hashPairingToken";
import { readPairingTokenHashFromConfigPath } from "./listAgentWitchLocalTokenHashes";
import { readAgentWitchRunConfig } from "@agent-witch/install-runtime-client";

/**
 * Primary hash for AWB `/identity` — always the active LaunchAgent profile when set,
 * not another profile folder that happens to sort first or legacy layout quirks.
 */
export const resolveAgentWitchWakeIdentityPrimaryTokenHash = (
  installDir: string = resolveAgentWitchInstallDir(),
): string | null => {
  const activeProfileEmail = readActiveProfileEmailFromFile(installDir);
  if (activeProfileEmail !== null) {
    const fromActiveProfile = readPairingTokenHashFromConfigPath(
      path.join(
        installDir,
        AGENT_WITCH_PROFILES_DIR_NAME,
        activeProfileEmail,
        "config.json",
      ),
    );
    if (fromActiveProfile !== null) {
      return fromActiveProfile;
    }
  }

  const pairingToken = readAgentWitchRunConfig()?.pairingToken.trim() ?? "";
  if (pairingToken.length === 0) {
    return null;
  }

  return hashPairingToken(pairingToken);
};
