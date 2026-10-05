import fs from "node:fs";
import os from "node:os";

import {
  readAgentWitchLaunchAgentPlistWakePort,
  writeAgentWitchLaunchAgentPlistWakePort,
} from "./agentWitchLaunchAgentPlistWakePortEntry";
import { decideAgentWitchLaunchAgentWakePortSync } from "./decideAgentWitchLaunchAgentWakePortSync";
import { resolveAgentWitchLaunchAgentPlistPath } from "./ensureAgentWitchLaunchAgentPlist";

/** Rewrites one plist's wake port when it drifted from the file; true when it changed. */
const syncOnePlistWakePort = (
  plistPath: string,
  filePort: number | null,
): boolean => {
  const decision = decideAgentWitchLaunchAgentWakePortSync({
    filePort,
    plistValue: readAgentWitchLaunchAgentPlistWakePort(plistPath),
  });
  if (decision.kind !== "sync") {
    return false;
  }
  writeAgentWitchLaunchAgentPlistWakePort(plistPath, decision.wakePort);
  return true;
};

/**
 * Keeps `AGENT_WITCH_WAKE_PORT` in the client / wake / live LaunchAgent plists equal to
 * `wake-port.json` (`wakePort`; null when the file is missing or invalid → no change).
 * Used after a wake port realloc and on client start (heals plists that drifted earlier).
 * Idempotent; only that one key is rewritten, atomically; takes effect on the next load.
 * Returns the plist paths that changed; missing plists (Linux, external agents off) are skipped.
 */
export const syncAgentWitchLaunchAgentPlistWakePort = (input: {
  readonly launchAgentPrefix: string;
  readonly wakePort: number | null;
  readonly homeDir?: string;
}): readonly string[] => {
  const homeDir = input.homeDir ?? os.homedir();
  const labels = [
    input.launchAgentPrefix,
    `${input.launchAgentPrefix}-wake`,
    `${input.launchAgentPrefix}-live`,
  ];

  return labels
    .map((label) => resolveAgentWitchLaunchAgentPlistPath(label, homeDir))
    .filter((plistPath) => fs.existsSync(plistPath))
    .filter((plistPath) => syncOnePlistWakePort(plistPath, input.wakePort));
};
