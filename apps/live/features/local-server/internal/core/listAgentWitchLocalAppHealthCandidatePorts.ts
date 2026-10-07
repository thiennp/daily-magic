import fs from "node:fs";
import path from "node:path";

import { readAgentWitchLocalAppPortRangeFile } from "./allocateOrLoadAgentWitchLocalAppPortRange";
import { AGENT_WITCH_LOCAL_APP_LEGACY_PORT } from "./agentWitchLocalAppPortRange.constants";
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
 * DF-030/031: ports to probe for this install's AWL `/health` after H6.
 * Order matches the Mac app (`candidateLocalAppPorts`): each profile's saved
 * listen port (local-app-port.json) → each profile's range
 * (local-port-range.json) → legacy 43347 for pre-H6 cores.
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
  const profileDirs = listProfileDirs(profilesDir);
  for (const profileDir of profileDirs) {
    const saved = readAgentWitchLocalAppPortFile(profileDir);
    if (saved !== null) {
      add(saved);
    }
  }
  for (const profileDir of profileDirs) {
    const range = readAgentWitchLocalAppPortRangeFile(profileDir);
    if (range === null) {
      continue;
    }
    for (let port = range.start; port <= range.end; port += 1) {
      add(port);
    }
  }
  add(AGENT_WITCH_LOCAL_APP_LEGACY_PORT);
  return ports;
};
