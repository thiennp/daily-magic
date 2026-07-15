import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  AGENT_WITCH_LEGACY_LAUNCH_AGENT_LABEL,
  AGENT_WITCH_WAKE_LAUNCH_AGENT_LABEL,
} from "./agentWitchWakeConstants";
import {
  AGENT_WITCH_PROFILES_DIR_NAME,
  readActiveProfileEmailFromFile,
  resolveAgentWitchInstallDir,
  sanitizeProfileEmailForLaunchAgentLabel,
} from "./resolveAgentWitchLocalLayout";

export interface AgentWitchLaunchTarget {
  readonly profileEmail: string | null;
  readonly launchAgentLabel: string;
}

const buildProfileLaunchAgentLabel = (profileEmail: string): string =>
  `${AGENT_WITCH_LEGACY_LAUNCH_AGENT_LABEL}.${sanitizeProfileEmailForLaunchAgentLabel(profileEmail)}`;

const isAgentWitchClientLaunchAgent = (launchAgentLabel: string): boolean =>
  launchAgentLabel !== AGENT_WITCH_WAKE_LAUNCH_AGENT_LABEL &&
  (launchAgentLabel === AGENT_WITCH_LEGACY_LAUNCH_AGENT_LABEL ||
    launchAgentLabel.startsWith(`${AGENT_WITCH_LEGACY_LAUNCH_AGENT_LABEL}.`));

const dedupeLaunchTargets = (
  targets: readonly AgentWitchLaunchTarget[],
): readonly AgentWitchLaunchTarget[] => {
  const seenLabels = new Set<string>();

  return targets.filter((target) => {
    if (seenLabels.has(target.launchAgentLabel)) {
      return false;
    }

    seenLabels.add(target.launchAgentLabel);
    return true;
  });
};

const listProfileLaunchTargets = (
  installDir: string,
): readonly AgentWitchLaunchTarget[] => {
  const profilesDir = path.join(installDir, AGENT_WITCH_PROFILES_DIR_NAME);
  if (!fs.existsSync(profilesDir)) {
    return [];
  }

  return fs
    .readdirSync(profilesDir)
    .filter((entry) => fs.statSync(path.join(profilesDir, entry)).isDirectory())
    .map((profileEmail) => ({
      profileEmail,
      launchAgentLabel: buildProfileLaunchAgentLabel(profileEmail),
    }));
};

const listPlistLaunchTargets = (
  launchAgentsDir: string,
): readonly AgentWitchLaunchTarget[] => {
  if (!fs.existsSync(launchAgentsDir)) {
    return [];
  }

  return fs
    .readdirSync(launchAgentsDir)
    .filter((entry) => entry.endsWith(".plist"))
    .map((entry) => entry.slice(0, -".plist".length))
    .filter(isAgentWitchClientLaunchAgent)
    .map((launchAgentLabel) => ({
      profileEmail: null,
      launchAgentLabel,
    }));
};

export interface ListAgentWitchLaunchTargetsOptions {
  readonly launchAgentsDir?: string;
}

export const listAgentWitchLaunchTargets = (
  installDir: string = resolveAgentWitchInstallDir(),
  options?: ListAgentWitchLaunchTargetsOptions,
): readonly AgentWitchLaunchTarget[] => {
  const profileTargets = listProfileLaunchTargets(installDir);
  const targets: AgentWitchLaunchTarget[] = [...profileTargets];

  const activeProfileEmail = readActiveProfileEmailFromFile(installDir);
  if (activeProfileEmail !== null) {
    targets.push({
      profileEmail: activeProfileEmail,
      launchAgentLabel: buildProfileLaunchAgentLabel(activeProfileEmail),
    });
  }

  const legacyConfigPath = path.join(installDir, "config.json");
  if (fs.existsSync(legacyConfigPath) && profileTargets.length === 0) {
    targets.push({
      profileEmail: null,
      launchAgentLabel: AGENT_WITCH_LEGACY_LAUNCH_AGENT_LABEL,
    });
  }

  if (options?.launchAgentsDir !== undefined) {
    targets.push(...listPlistLaunchTargets(options.launchAgentsDir));
  } else {
    targets.push(
      ...listPlistLaunchTargets(
        path.join(os.homedir(), "Library", "LaunchAgents"),
      ),
    );
  }

  return dedupeLaunchTargets(targets);
};
