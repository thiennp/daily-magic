/**
 * AWI slice `install-layout` — path resolution (Node / server only).
 */
export {
  isAgentWitchLocalInstallDir,
  readActiveProfileEmailFromFile,
  resolveActiveProfileEmail,
  resolveActiveProfileEmailFromEnv,
  resolveAgentWitchAppBundlePath,
  resolveAgentWitchAppDir,
  resolveAgentWitchDefaultWakePort,
  resolveAgentWitchDeviceKeypairPath,
  resolveAgentWitchErrorLogPath,
  resolveAgentWitchInstallDir,
  resolveAgentWitchLaunchAgentPrefix,
  resolveAgentWitchLocalLayout,
  resolveAgentWitchLogsDir,
  resolveAgentWitchMainLogPath,
  resolveAgentWitchProjectsDir,
  resolveAgentWitchReportsDir,
  sanitizeProfileEmailForDir,
  sanitizeProfileEmailForLaunchAgentLabel,
} from "../internal/core/resolveAgentWitchLocalLayout";

export { isValidAgentWitchWakePort } from "../internal/core/isValidAgentWitchWakePort";

export {
  readAgentWitchWakePortFromFile,
  resolveAgentWitchRuntimeWakePort,
} from "../internal/core/resolveAgentWitchRuntimeWakePort";

export { resolveAgentWitchWakePortFromSources } from "../internal/core/resolveAgentWitchWakePortFromSources";

export {
  AGENT_WITCH_HOST_ACCOUNT_ENV,
  AGENT_WITCH_HOST_SERVICES_FILE_NAME,
} from "../internal/core/hostAccountServices/hostAccountServices.constant";

export {
  resolveAgentWitchAccountHash,
  resolveAgentWitchAccountLaunchAgentLabel,
  resolveAgentWitchAccountSystemdUnitName,
} from "../internal/core/hostAccountServices/resolveAgentWitchAccountServiceNames";

export {
  readAgentWitchHostServices,
  resolveAgentWitchHostServicesFilePath,
  writeAgentWitchHostServices,
} from "../internal/core/hostAccountServices/agentWitchHostServicesFile";

export {
  resolveAgentWitchHostAccountFromEnv,
  resolveAgentWitchHostProcessScope,
} from "../internal/core/hostAccountServices/resolveAgentWitchHostProcessScope";

export { ensureAgentWitchAccountWakePort } from "../internal/core/hostAccountServices/ensureAgentWitchAccountWakePort";

export {
  resolveAgentWitchAccountProfileDir,
  resolveAgentWitchWakePortDir,
} from "../internal/core/hostAccountServices/resolveAgentWitchWakePortDir";
