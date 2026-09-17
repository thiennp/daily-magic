/**
 * AWI slice `self-update` — install bundle pull and install-version.json.
 */
export {
  ensureAgentWitchInstallVersionRecorded,
  isRemoteAgentWitchBundleVersionNewer,
  readAgentWitchInstallVersion,
  resolveAgentWitchHeartbeatInstallBundleVersion,
  resolveAgentWitchInstallVersionPath,
  writeAgentWitchInstallVersion,
  AGENT_WITCH_INSTALL_VERSION_FILE_NAME,
  type AgentWitchInstallVersionRecord,
} from "../internal/core/agentWitchInstallVersion";

export {
  appendAgentWitchSelfUpdateLog,
  readAgentWitchSelfUpdateLogs,
  resolveAgentWitchSelfUpdateLogPath,
  AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME,
  AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES,
  type AgentWitchSelfUpdateLogEntry,
  type AgentWitchSelfUpdateLogEvent,
} from "../internal/core/agentWitchSelfUpdateLog";

export {
  buildAgentWitchSelfUpdateStatus,
  fetchAgentWitchRemoteInstallBundleVersion,
  runAgentWitchSelfUpdate,
  type AgentWitchSelfUpdateResult,
} from "../internal/core/agentWitchSelfUpdate";

export { resolveAgentWitchAppOriginFromWsUrl } from "../internal/core/resolveAgentWitchAppOriginFromWsUrl";
