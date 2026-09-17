/**
 * AWB adapters — legacy `scripts/` implementations during FSA migration.
 * Feature slices should import handlers only through this module.
 */

export {
  buildAgentWitchSelfUpdateStatusFromWakeServer,
  readAgentWitchSelfUpdateLogEntries,
  readAgentWitchWatchdogLogEntries,
  reviveAgentWitchWebSocketFromWakeServer,
  restartAgentWitchFromWakeServer,
  buildAgentWitchWatchdogStatus,
  runAgentWitchSelfUpdateFromWakeServer,
  runAgentWitchUninstallLocalFromWakeServer,
  wakeAgentWitchLaunchAgents,
} from "../../../scripts/agentWitchWakeHandlers";

export { installHarnessFromWakeServer } from "../features/awc-proxy/features/harness-proxy/public-api/infrastructure";

export {
  buildAgentWitchAutomationStatusFromWakeServer,
  runAutomationFromWakeServer,
  syncAutomationsFromWakeServer,
} from "../features/awc-proxy/features/automations-proxy/public-api/infrastructure";

export { buildWakeServerCorsHeaders } from "../features/server/features/cors-origin/public-api/infrastructure";

export {
  buildAgentWitchWakeLocalLogHtml,
  buildAgentWitchWakeLocalPageHeaders,
} from "../../../scripts/buildAgentWitchWakeLocalLogHtml";

export { resolveAgentWitchWakeListenPort } from "../../../scripts/resolveAgentWitchWakeListenPort";

export { parseAgentWitchSelfUpdateRunBody } from "../../../scripts/parseAgentWitchSelfUpdateRunBody";

export { ensureAgentWitchProjectFolderFromWakeServer } from "../features/awc-proxy/features/projects-proxy/public-api/infrastructure";

export {
  exitUnlessActiveMacOsConsoleUser,
  startActiveMacOsConsoleUserGuard,
} from "../../../scripts/guardMacOsConsoleUser";

export { isAgentWitchScriptEntryPoint } from "../../../scripts/isAgentWitchScriptEntryPoint";

export { isAgentWitchBundled } from "../../../scripts/agentWitchBundled.constant";
