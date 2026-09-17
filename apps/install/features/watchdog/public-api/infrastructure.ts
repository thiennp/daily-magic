/**
 * AWI slice `watchdog` — reinstall cooldown state and revive orchestration.
 */
export {
  canRunAgentWitchWatchdogReinstall,
  readAgentWitchWatchdogReinstallState,
  recordAgentWitchWatchdogReinstallAttempt,
} from "../internal/core/agentWitchWatchdogReinstallState";

export {
  attemptAgentWitchWatchdogReinstall,
  type ReinstallAgentWitchFromInstallScriptResult,
} from "../internal/core/attemptAgentWitchWatchdogReinstall";
