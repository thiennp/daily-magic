import { resolveAgentWitchLaunchAgentPrefix } from "@agent-witch/install-layout";

const launchAgentPrefix = resolveAgentWitchLaunchAgentPrefix();

export const AGENT_WITCH_WAKE_LAUNCH_AGENT_LABEL = `${launchAgentPrefix}-wake`;

export const AGENT_WITCH_LIVE_LAUNCH_AGENT_LABEL = `${launchAgentPrefix}-live`;

export const AGENT_WITCH_WATCHDOG_LAUNCH_AGENT_LABEL = `${launchAgentPrefix}-watchdog`;

export const AGENT_WITCH_AUTOMATION_SCHEDULER_LAUNCH_AGENT_LABEL = `${launchAgentPrefix}-automation-scheduler`;

export const AGENT_WITCH_UPDATER_LAUNCH_AGENT_LABEL = `${launchAgentPrefix}-updater`;

export const AGENT_WITCH_UPDATER_INTERVAL_SEC = 3600;
