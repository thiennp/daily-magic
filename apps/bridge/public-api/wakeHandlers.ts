export type {
  AgentWitchWakeHealthResponse,
  AgentWitchWakeIdentityResponse,
} from "../features/discovery/features/health-identity/public-api/types";

export {
  buildAgentWitchWakeHealthResponse,
  buildAgentWitchWakeIdentityResponse,
} from "../features/discovery/features/health-identity/public-api/infrastructure";

export type { AgentWitchHarnessInstallWakeResponse } from "../features/awc-proxy/features/harness-proxy/public-api/types";

export { installHarnessFromWakeServer } from "../features/awc-proxy/features/harness-proxy/public-api/infrastructure";

export type {
  AgentWitchAutomationRunWakeResponse,
  AgentWitchAutomationStatusWakeResponse,
  AgentWitchAutomationSyncWakeResponse,
} from "../features/awc-proxy/features/automations-proxy/public-api/types";

export {
  buildAgentWitchAutomationStatusFromWakeServer,
  runAutomationFromWakeServer,
  syncAutomationsFromWakeServer,
} from "../features/awc-proxy/features/automations-proxy/public-api/infrastructure";

export type {
  AgentWitchWakeKickResult,
  AgentWitchWakeResponse,
} from "../features/operations/features/process-control/public-api/types";

export {
  restartAgentWitchFromWakeServer,
  reviveAgentWitchWebSocketFromWakeServer,
  wakeAgentWitchLaunchAgents,
} from "../features/operations/features/process-control/public-api/infrastructure";

export type {
  AgentWitchWatchdogLogEntry,
  AgentWitchWatchdogStatusResponse,
} from "../features/operations/features/watchdog-api/public-api/types";

export {
  buildAgentWitchWatchdogStatus,
  readAgentWitchWatchdogLogEntries,
} from "../features/operations/features/watchdog-api/public-api/infrastructure";

export {
  buildAgentWitchSelfUpdateStatusFromWakeServer,
  readAgentWitchSelfUpdateLogEntries,
  runAgentWitchSelfUpdateFromWakeServer,
} from "../features/operations/features/self-update-api/public-api/infrastructure";

export { runAgentWitchUninstallLocalFromWakeServer } from "../features/operations/features/install-delete-api/public-api/infrastructure";

export type { AgentWitchReviveResult } from "../adapters/macLifecycle";
