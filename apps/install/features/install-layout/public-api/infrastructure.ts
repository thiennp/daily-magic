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
