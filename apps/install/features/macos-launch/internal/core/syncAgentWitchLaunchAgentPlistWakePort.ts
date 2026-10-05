import fs from "node:fs";
import os from "node:os";

import { resolveAgentWitchLaunchAgentPlistPath } from "./ensureAgentWitchLaunchAgentPlist";
import { replaceAgentWitchLaunchAgentPlistWakePort } from "./replaceAgentWitchLaunchAgentPlistWakePort";

/**
 * Keeps `AGENT_WITCH_WAKE_PORT` in the client / wake / live LaunchAgent plists equal to
 * `wake-port.json` after the wake server had to move ports. Takes effect on the next load.
 * Returns the plist paths that changed; missing plists (Linux, external agents off) are skipped.
 */
export const syncAgentWitchLaunchAgentPlistWakePort = (input: {
  readonly launchAgentPrefix: string;
  readonly wakePort: number;
  readonly homeDir?: string;
}): readonly string[] => {
  const homeDir = input.homeDir ?? os.homedir();
  const labels = [
    input.launchAgentPrefix,
    `${input.launchAgentPrefix}-wake`,
    `${input.launchAgentPrefix}-live`,
  ];
  const updated: string[] = [];

  for (const label of labels) {
    const plistPath = resolveAgentWitchLaunchAgentPlistPath(label, homeDir);
    if (!fs.existsSync(plistPath)) {
      continue;
    }
    const xml = fs.readFileSync(plistPath, "utf8");
    const next = replaceAgentWitchLaunchAgentPlistWakePort(xml, input.wakePort);
    if (next === null || next === xml) {
      continue;
    }
    fs.writeFileSync(plistPath, next, "utf8");
    updated.push(plistPath);
  }

  return updated;
};
