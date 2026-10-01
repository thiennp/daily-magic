import { resolveAgentWitchLaunchAgentPrefix } from "@agent-witch/install-layout/presentation";
import { AGENT_WITCH_PROD_INSTALL_DIR_NAME } from "@agent-witch/install-layout/types";
import os from "node:os";
import path from "node:path";

const resolveDefaultInstallDirForLaunchLabels = (): string => {
  const fromEnv = process.env.AGENT_WITCH_HOME?.trim();
  if (fromEnv !== undefined && fromEnv.length > 0) {
    return path.resolve(fromEnv);
  }

  return path.join(os.homedir(), AGENT_WITCH_PROD_INSTALL_DIR_NAME);
};

const launchAgentPrefix = resolveAgentWitchLaunchAgentPrefix(
  resolveDefaultInstallDirForLaunchLabels(),
);

export const AGENT_WITCH_WAKE_LAUNCH_AGENT_LABEL = `${launchAgentPrefix}-wake`;

export const AGENT_WITCH_LIVE_LAUNCH_AGENT_LABEL = `${launchAgentPrefix}-live`;

export const AGENT_WITCH_WATCHDOG_LAUNCH_AGENT_LABEL = `${launchAgentPrefix}-watchdog`;

export const AGENT_WITCH_AUTOMATION_SCHEDULER_LAUNCH_AGENT_LABEL = `${launchAgentPrefix}-automation-scheduler`;

export const AGENT_WITCH_UPDATER_LAUNCH_AGENT_LABEL = `${launchAgentPrefix}-updater`;

export const AGENT_WITCH_UPDATER_INTERVAL_SEC = 3600;
