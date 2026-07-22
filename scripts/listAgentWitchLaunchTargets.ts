import fs from "node:fs";
import path from "node:path";

import {
  AGENT_WITCH_PROFILES_DIR_NAME,
  resolveAgentWitchInstallDir,
  resolveAgentWitchLaunchAgentPrefix,
  sanitizeProfileEmailForDir,
} from "./resolveAgentWitchLocalLayout";

export interface AgentWitchLaunchTarget {
  readonly profileEmail: string | null;
  readonly launchAgentLabel: string;
}

const listProfileEmails = (installDir: string): readonly string[] => {
  const profilesDir = path.join(installDir, AGENT_WITCH_PROFILES_DIR_NAME);
  if (!fs.existsSync(profilesDir)) {
    return [];
  }

  return fs
    .readdirSync(profilesDir)
    .filter((entry) => fs.statSync(path.join(profilesDir, entry)).isDirectory())
    .map((entry) => sanitizeProfileEmailForDir(entry))
    .toSorted();
};

/**
 * One LaunchAgent / process per install home.
 * Multi-account profiles share that process (multiple WebSockets).
 */
export const listAgentWitchLaunchTargets = (
  installDir: string = resolveAgentWitchInstallDir(),
): readonly AgentWitchLaunchTarget[] => {
  const launchAgentLabel = resolveAgentWitchLaunchAgentPrefix(installDir);
  const profileEmails = listProfileEmails(installDir);

  return [
    {
      profileEmail: profileEmails[0] ?? null,
      launchAgentLabel,
    },
  ];
};

export const listAgentWitchProfileEmails = (
  installDir: string = resolveAgentWitchInstallDir(),
): readonly string[] => listProfileEmails(installDir);
