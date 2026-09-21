/**
 * Single import surface from `scripts/` for AWI hub client entry.
 * New code should use `@agent-witch/install-*` / `@agent-witch/live-*` slices instead.
 */

export {
  claimAgentWitchMachineLease,
  releaseAgentWitchMachineLease,
} from "../../../scripts/claimAgentWitchMachineLease";
export { terminateOtherAgentWitchClientProcesses } from "../../../scripts/terminateOtherAgentWitchClientProcesses";
export { migrateLegacyAgentWitchInstallLogsForActiveProfiles } from "../../../scripts/migrateLegacyAgentWitchInstallLogs";
export { startAgentWitchInProcessServices } from "../../../scripts/startAgentWitchInProcessServices";
export { resolveAgentWitchWakePort } from "../../../scripts/agentWitchWakeConstants";
export {
  continueClaudeTaskAfterInput,
  configureAgentWitchRunCloudApi,
  flushPendingAgentRunCompletions,
  replayPendingRunInputRequests,
  runWriterTask,
  stopAgentRun,
} from "../../../scripts/agentWitchRunSessions";
export { ensureHarnessWriterCli } from "../../../scripts/ensureHarnessWriterCli";
export {
  buildWriterCliInvocation,
  isHarnessWriterAgentId,
  resolveWriterCliCommands,
} from "../../../scripts/buildWriterCliInvocation";
export {
  listAgentRunsLocal,
  loadAgentRunLocal,
} from "../../../scripts/agentWitchLocalRunStore";
export {
  acceptTerminalStream,
  isTerminalStreamAccepted,
  queueTerminalStreamChunk,
} from "../../../scripts/agentWitchTerminalStreamState";
export { requestLocalAgentWitchRestart } from "../../../scripts/requestLocalAgentWitchRestart";
export { runLocalInstallBundleUpdate } from "../../../scripts/runLocalInstallBundleUpdate";
export {
  beginAgentWitchWriterWork,
  deferAgentWitchInstallBundleUpdate,
  deferAgentWitchLocalRestart,
  endAgentWitchWriterWork,
  isAgentWitchWriterWorkInProgress,
  subscribeAgentWitchWriterWorkIdle,
  takeDeferredAgentWitchInstallBundleUpdate,
  takeDeferredAgentWitchLocalRestartReason,
} from "../../../scripts/agentWitchWriterWorkGuard";
export { readInstallBundleVersionFromHeartbeatAck } from "../../../scripts/readInstallBundleVersionFromHeartbeatAck";
export {
  applyAutomationsRunFromCloud,
  applyAutomationsSyncFromCloud,
} from "../../../scripts/handleAgentWitchCloudControlMessages";
export { resolveAgentWitchCloudApiConfig } from "../../../scripts/agentWitchCloudApi";
export { buildDefaultUserProjectFolderPath } from "../../../scripts/buildDefaultUserProjectFolderPath";
export { registerAgentWitchProcessTraceHandlers } from "../../../scripts/registerAgentWitchProcessTraceHandlers";
export { runWriterEnsure } from "../../../scripts/handleAgentWitchWriterEnsure";
export { wrapPromptWithAgentRunReportInstruction } from "../../../scripts/dispatch/agentRunReport.constant";
export { wrapPromptWithPrerecordedAgentRunEstimate } from "../../../scripts/dispatch/wrapPromptWithPrerecordedAgentRunEstimate";
export { generateAgentRunReportKey } from "../../../scripts/dispatch/generateAgentRunReportKey";
export { AGENT_RUN_WORKING_ESTIMATE_MARKER } from "../../../scripts/dispatch/agentRunWorkingEstimate.constant";
export { seedAgentRunReportFile } from "../../../scripts/agentWitchRunReport";
export { runAgentRunPreEstimate } from "../../../scripts/runAgentRunPreEstimate";
export {
  closeShellPtySession,
  openInteractiveShellPty,
  resizeShellPty,
  writeShellPtyInput,
} from "../../../scripts/agentWitchShellSession";
export {
  buildWriterSessionReadyMessage,
  buildWriterSessionWarmupMessage,
  clearWriterSession,
  isWriterConversationStarted,
  isWriterSessionWarmed,
  markWriterSessionWarmed,
  runWriterSessionStart,
  supportsWriterSessionContinuation,
  supportsWriterSessionWarmup,
} from "../../../scripts/agentWitchWriterSession";
