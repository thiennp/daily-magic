import fs from "node:fs";
import path from "node:path";

import {
  resolveAgentWitchInstallDir,
  resolveAgentWitchLocalLayout,
} from "@agent-witch/install-layout";
import { AGENT_WITCH_PROFILES_DIR_NAME } from "@agent-witch/install-layout/types";
import {
  isAgentWitchConnectionHealthStale,
  readAgentWitchConnectionHealth,
} from "@agent-witch/install-connection-health";

import { readPairingTokenHashFromConfigPath } from "./listAgentWitchLocalTokenHashes";

const AGENT_WITCH_CONNECTION_STALE_MS = 120_000;

const listProfileDirNames = (installDir: string): readonly string[] => {
  const profilesDir = path.join(installDir, AGENT_WITCH_PROFILES_DIR_NAME);
  if (!fs.existsSync(profilesDir)) {
    return [];
  }

  return fs
    .readdirSync(profilesDir)
    .filter((entry) =>
      fs.statSync(path.join(profilesDir, entry)).isDirectory(),
    );
};

/**
 * Prefer the profile whose connection-health is freshest and not stale — matches
 * the pairing token the hub actually sees when active-profile.json drifted.
 */
export const resolveConnectedProfileWakeIdentityPrimaryTokenHash = (
  installDir: string = resolveAgentWitchInstallDir(),
): string | null => {
  let bestHash: string | null = null;
  let bestAckMs = -1;

  for (const profileDirName of listProfileDirNames(installDir)) {
    const layout = resolveAgentWitchLocalLayout(profileDirName);
    const health = readAgentWitchConnectionHealth(layout);
    if (
      health === null ||
      isAgentWitchConnectionHealthStale(health, AGENT_WITCH_CONNECTION_STALE_MS)
    ) {
      continue;
    }

    const tokenHash = readPairingTokenHashFromConfigPath(layout.configPath);
    if (tokenHash === null) {
      continue;
    }

    const ackMs = Date.parse(health.lastAckAt);
    if (!Number.isFinite(ackMs) || ackMs <= bestAckMs) {
      continue;
    }

    bestAckMs = ackMs;
    bestHash = tokenHash;
  }

  return bestHash;
};
