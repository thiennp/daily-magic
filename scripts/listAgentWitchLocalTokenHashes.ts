import fs from "node:fs";
import path from "node:path";

import hashPairingToken from "./hashPairingToken";
import {
  AGENT_WITCH_PROFILES_DIR_NAME,
  resolveAgentWitchInstallDir,
} from "./resolveAgentWitchLocalLayout";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readPairingTokenHashFromConfigPath = (
  configPath: string,
): string | null => {
  if (!fs.existsSync(configPath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(configPath, "utf8"));
    if (
      !isRecord(parsed) ||
      typeof parsed.pairingToken !== "string" ||
      parsed.pairingToken.trim().length === 0
    ) {
      return null;
    }

    return hashPairingToken(parsed.pairingToken.trim());
  } catch {
    return null;
  }
};

/** Collect sha256 pairing-token hashes for every local profile + legacy config. */
export const listAgentWitchLocalTokenHashes = (
  installDir: string = resolveAgentWitchInstallDir(),
): readonly string[] => {
  const hashes: string[] = [];
  const seen = new Set<string>();

  const pushHash = (tokenHash: string | null): void => {
    if (tokenHash === null || seen.has(tokenHash)) {
      return;
    }
    seen.add(tokenHash);
    hashes.push(tokenHash);
  };

  pushHash(
    readPairingTokenHashFromConfigPath(path.join(installDir, "config.json")),
  );

  const profilesDir = path.join(installDir, AGENT_WITCH_PROFILES_DIR_NAME);
  if (!fs.existsSync(profilesDir)) {
    return hashes;
  }

  for (const entry of fs.readdirSync(profilesDir)) {
    const profileDir = path.join(profilesDir, entry);
    if (!fs.statSync(profileDir).isDirectory()) {
      continue;
    }
    pushHash(
      readPairingTokenHashFromConfigPath(path.join(profileDir, "config.json")),
    );
  }

  return hashes;
};
