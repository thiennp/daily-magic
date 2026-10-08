/**
 * Single import surface from `scripts/` for AWI hub client entry.
 * New code should use `@agent-witch/install-*` / `@agent-witch/live-*` slices instead.
 */

export {
  claimAgentWitchMachineLease,
  releaseAgentWitchMachineLease,
  resolveAgentWitchMachineLeasePath,
} from "../../../scripts/claimAgentWitchMachineLease";
export { terminateOtherAgentWitchClientProcesses } from "../../../scripts/terminateOtherAgentWitchClientProcesses";
export { migrateLegacyAgentWitchInstallLogsForActiveProfiles } from "../../../scripts/migrateLegacyAgentWitchInstallLogs";
export { startAgentWitchInProcessServices } from "../../../scripts/startAgentWitchInProcessServices";
export { resolveAgentWitchWakePort } from "../../../scripts/agentWitchWakeConstants";
export {
  continueClaudeTaskAfterInput,
  configureAgentWitchRunCloudApi,
  setAgentWitchRunResultObserver,
  flushPendingAgentRunCompletions,
  replayPendingRunInputRequests,
  runWriterTask,
  publishAgentRunEstimateComparison,
  stopAgentRun,
  stopAllAgentRuns,
  supersedePausedRunForContinuation,
} from "../../../scripts/agentWitchRunSessions";
export { sweepOrphanedAgentRunReports } from "../../../scripts/sweepOrphanedAgentRunReports";
export { probeAgentWitchWriters } from "../../../scripts/probeAgentWitchWriters";
export { ensureHarnessWriterCli } from "../../../scripts/ensureHarnessWriterCli";
export { withRunHeartbeatWhilePreparing } from "../../../scripts/withRunHeartbeatWhilePreparing";
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
export { ensureAgentWitchCoupledLiveAppHealth } from "../../../scripts/ensureAgentWitchCoupledLiveAppHealth";
export {
  isAgentWitchInstallBundleUpdateNeeded,
  runLocalInstallBundleUpdate,
} from "../../../scripts/runLocalInstallBundleUpdate";
export {
  beginAgentWitchWriterWork,
  registerAgentWitchWriterWorkPid,
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
export { wrapPromptWithSidecarAgentRunEstimate } from "../../../scripts/dispatch/wrapPromptWithSidecarAgentRunEstimate";
export { generateAgentRunReportKey } from "../../../scripts/dispatch/generateAgentRunReportKey";
export { AGENT_RUN_WORKING_ESTIMATE_MARKER } from "../../../scripts/dispatch/agentRunWorkingEstimate.constant";
export {
  seedAgentRunReportFile,
  appendAgentRunReportDetailsLine,
} from "../../../scripts/agentWitchRunReport";
export {
  runAgentRunPreEstimate,
  beginAgentRunPreEstimate,
  recordAgentRunPreEstimateOutput,
  storeAgentRunTimeEstimateHistory,
} from "../../../scripts/runAgentRunPreEstimate";
export {
  beginAgentRunTokenPreEstimate,
  recordAgentRunTokenPreEstimateOutput,
} from "../../../scripts/runAgentRunTokenPreEstimate";
export { resolveTaskWriterEstimateLabel } from "../../../scripts/dispatch/resolveTaskWriterEstimateLabel";
export { probeLocalRunClis } from "../../../scripts/dispatch/probeLocalRunClis";
export {
  closeShellPtySession,
  openInteractiveShellPty,
  resizeShellPty,
  spawnAgentCommandInPty,
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
export {
  isAgentWitchProcessRunningUnderSystemdUserService,
  registerAgentWitchHostGracefulShutdown,
  restartAgentWitchHostAfterBundleUpdate,
} from "../../../scripts/restartAgentWitchHostAfterBundleUpdate";
export { isProcessAlive } from "../../../scripts/isProcessAlive";
export { flushPendingRunResultDeliveries } from "../../../scripts/agentWitchPendingRunResultDelivery";
export {
  bindAgentWitchLiveRunSocket,
  resolveAgentWitchLiveRunSocket,
} from "../../../scripts/agentWitchLiveRunSocket";
export { dropPendingRunInputSession } from "../../../scripts/agentWitchRunSessions";
export {
  AGENT_WITCH_BUNDLE_RESTART_RECHECK_MS,
  isAgentWitchBundleRestartBlocked,
} from "../../../scripts/agentWitchBundleRestartGate";
