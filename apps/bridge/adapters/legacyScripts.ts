/**
 * AWB adapters — legacy `scripts/` implementations during FSA migration.
 * Feature slices should import handlers only through this module.
 */

export {
  buildAgentWitchAutomationStatusFromWakeServer,
  buildAgentWitchSelfUpdateStatusFromWakeServer,
  installHarnessFromWakeServer,
  readAgentWitchSelfUpdateLogEntries,
  readAgentWitchWatchdogLogEntries,
  reviveAgentWitchWebSocketFromWakeServer,
  restartAgentWitchFromWakeServer,
  buildAgentWitchWatchdogStatus,
  runAgentWitchSelfUpdateFromWakeServer,
  runAgentWitchUninstallLocalFromWakeServer,
  runAutomationFromWakeServer,
  syncAutomationsFromWakeServer,
  wakeAgentWitchLaunchAgents,
} from "../../../scripts/agentWitchWakeHandlers";

export { buildWakeServerCorsHeaders } from "../features/server/features/cors-origin/public-api/infrastructure";

export {
  buildAgentWitchWakeLocalLogHtml,
  buildAgentWitchWakeLocalPageHeaders,
} from "../../../scripts/buildAgentWitchWakeLocalLogHtml";

export { resolveAgentWitchWakeListenPort } from "../../../scripts/resolveAgentWitchWakeListenPort";

export { parseAgentWitchSelfUpdateRunBody } from "../../../scripts/parseAgentWitchSelfUpdateRunBody";

export { ensureAgentWitchProjectFolderFromWakeServer } from "../../../scripts/ensureAgentWitchProjectFolderFromWakeServer";

export {
  exitUnlessActiveMacOsConsoleUser,
  startActiveMacOsConsoleUserGuard,
} from "../../../scripts/guardMacOsConsoleUser";

export { isAgentWitchScriptEntryPoint } from "../../../scripts/isAgentWitchScriptEntryPoint";

export { isAgentWitchBundled } from "../../../scripts/agentWitchBundled.constant";
