/**
 * AWI slice `macos-launch` — macOS LaunchAgents (kickstart, bootout, targets).
 */
export {
  AGENT_WITCH_AUTOMATION_SCHEDULER_LAUNCH_AGENT_LABEL,
  AGENT_WITCH_UPDATER_INTERVAL_SEC,
  AGENT_WITCH_UPDATER_LAUNCH_AGENT_LABEL,
  AGENT_WITCH_WAKE_LAUNCH_AGENT_LABEL,
  AGENT_WITCH_WATCHDOG_LAUNCH_AGENT_LABEL,
} from "../internal/core/agentWitchServiceLaunchAgentLabels";

export { bootoutAgentWitchLaunchAgentSync } from "../internal/core/bootoutAgentWitchLaunchAgent";

export {
  bootoutAgentWitchAuxiliaryLaunchAgents,
  collectAgentWitchAuxiliaryLaunchAgentLabels,
} from "../internal/core/bootoutAgentWitchAuxiliaryLaunchAgents";

export { bootoutAgentWitchLaunchAgentsForCurrentUser } from "../internal/core/bootoutAgentWitchLaunchAgentsForCurrentUser";

export { collectAgentWitchLaunchAgentLabels } from "../internal/core/collectAgentWitchLaunchAgentLabels";

export { isActiveMacOsConsoleUser } from "../internal/core/isActiveMacOsConsoleUser";

export { isAgentWitchLaunchAgentRunning } from "../internal/core/isAgentWitchLaunchAgentRunning";

export { kickstartAgentWitchClientLaunchAgents } from "../internal/core/kickstartAgentWitchClientLaunchAgents";

export { kickstartAgentWitchLaunchAgent } from "../internal/core/kickstartAgentWitchLaunchAgent";

export {
  listAgentWitchLaunchTargets,
  listAgentWitchProfileEmails,
} from "../internal/core/listAgentWitchLaunchTargets";

export {
  isValidMacOsConsoleUsername,
  readMacOsConsoleUsernameSync,
} from "../internal/core/readMacOsConsoleUsername";

export {
  INVALID_MACOS_CONSOLE_USERNAMES,
  MACOS_CONSOLE_USER_GUARD_INTERVAL_MS,
} from "../internal/core/macOsConsoleUser.constants";
