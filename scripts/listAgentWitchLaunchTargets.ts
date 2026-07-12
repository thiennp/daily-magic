import fs from "node:fs";
import path from "node:path";

import { AGENT_WITCH_LEGACY_LAUNCH_AGENT_LABEL } from "./agentWitchWakeConstants";
import {
  AGENT_WITCH_PROFILES_DIR_NAME,
  resolveAgentWitchInstallDir,
  sanitizeProfileEmailForLaunchAgentLabel,
} from "./resolveAgentWitchLocalLayout";

export interface AgentWitchLaunchTarget {
  readonly profileEmail: string | null;
  readonly launchAgentLabel: string;
}

const buildProfileLaunchAgentLabel = (profileEmail: string): string =>
  `${AGENT_WITCH_LEGACY_LAUNCH_AGENT_LABEL}.${sanitizeProfileEmailForLaunchAgentLabel(profileEmail)}`;

export const listAgentWitchLaunchTargets = (
  installDir: string = resolveAgentWitchInstallDir(),
): readonly AgentWitchLaunchTarget[] => {
  const targets: AgentWitchLaunchTarget[] = [];
  const profilesDir = path.join(installDir, AGENT_WITCH_PROFILES_DIR_NAME);

  if (fs.existsSync(profilesDir)) {
    for (const entry of fs.readdirSync(profilesDir)) {
      const profileDir = path.join(profilesDir, entry);
      if (!fs.statSync(profileDir).isDirectory()) {
        continue;
      }

      targets.push({
        profileEmail: entry,
        launchAgentLabel: buildProfileLaunchAgentLabel(entry),
      });
    }
  }

  const legacyConfigPath = path.join(installDir, "config.json");
  if (fs.existsSync(legacyConfigPath) && targets.length === 0) {
    targets.push({
      profileEmail: null,
      launchAgentLabel: AGENT_WITCH_LEGACY_LAUNCH_AGENT_LABEL,
    });
  }

  return targets;
};
