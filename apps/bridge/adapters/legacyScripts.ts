/**
 * AWB adapters — non-handler entry utilities during FSA migration.
 * Wake handlers: import from feature `public-api/infrastructure` or `public-api/wakeHandlers`.
 */

export { buildWakeServerCorsHeaders } from "../features/server/features/cors-origin/public-api/infrastructure";

export {
  buildAgentWitchWakeLocalLogHtml,
  buildAgentWitchWakeLocalPageHeaders,
} from "../../../scripts/buildAgentWitchWakeLocalLogHtml";

export { resolveAgentWitchWakeListenPort } from "../../../scripts/resolveAgentWitchWakeListenPort";

export { parseAgentWitchSelfUpdateRunBody } from "../../../scripts/parseAgentWitchSelfUpdateRunBody";

export {
  exitUnlessActiveMacOsConsoleUser,
  startActiveMacOsConsoleUserGuard,
} from "../../../scripts/guardMacOsConsoleUser";

export { isAgentWitchScriptEntryPoint } from "../../../scripts/isAgentWitchScriptEntryPoint";

export { isAgentWitchBundled } from "../../../scripts/agentWitchBundled.constant";
