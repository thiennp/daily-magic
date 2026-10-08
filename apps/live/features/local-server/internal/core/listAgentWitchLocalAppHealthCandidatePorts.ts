import fs from "node:fs";
import path from "node:path";

import { readAgentWitchHostLocalAppAccountsDiscovery } from "./agentWitchHostLocalAppAccountsDiscovery";
import { readAgentWitchLocalAppPortFile } from "./resolveAgentWitchLocalAppListenPort";

const listProfileDirs = (profilesDir: string): readonly string[] => {
  try {
    return fs
      .readdirSync(profilesDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(profilesDir, entry.name))
      .sort();
  } catch {
    return [];
  }
};

/**
 * Ports to probe for this install's AWL `/health`.
 * Order: install-root `local-app-accounts.json` → each profile legacy shim.
 * No hard-coded legacy 43347 fallback.
 */
export const listAgentWitchLocalAppHealthCandidatePorts = (
  profilesDir: string,
): readonly number[] => {
  const ports: number[] = [];
  const add = (port: number): void => {
    if (!ports.includes(port)) {
      ports.push(port);
    }
  };

  const installDir = path.dirname(profilesDir);
  for (const row of readAgentWitchHostLocalAppAccountsDiscovery(installDir)) {
    add(row.port);
  }

  for (const profileDir of listProfileDirs(profilesDir)) {
    const saved = readAgentWitchLocalAppPortFile(profileDir);
    if (saved !== null) {
      add(saved);
    }
  }

  return ports;
};
