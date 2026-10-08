/**
 * AWI slice `runtime-client` — Mac runtime config loading and helpers.
 */
export { runHeadlessWriter } from "../internal/core/agentWitchHeadlessWriterRun";

export { runMarketplacePlanEstimateHeadlessWriter } from "../internal/core/writerApi/runMarketplacePlanEstimateHeadlessWriter";

export type {
  MarketplacePlanEstimateHeadlessWriterBackend,
  MarketplacePlanEstimateHeadlessWriterExecution,
} from "../internal/core/writerApi/MarketplacePlanEstimateHeadlessWriterExecution.type";

export { readAgentWitchClientConfig } from "../internal/core/readAgentWitchClientConfig";

export { resolveAgentWitchClientWsUrl } from "../internal/core/resolveAgentWitchClientWsUrl";

export { resolveRunProjectFolderPath } from "../internal/core/resolveRunProjectFolderPath";

export { default as parseProjectCompositionSnapshotWire } from "../internal/core/composition/parseProjectCompositionSnapshotWire";

export { default as verifyProjectCompositionSnapshotBlobs } from "../internal/core/composition/verifyProjectCompositionSnapshotBlobs";

export { default as materializeRunScopedCompositionOverlay } from "../internal/core/composition/materializeRunScopedCompositionOverlay";

export { default as removeRunCompositionOverlay } from "../internal/core/composition/removeRunCompositionOverlay";

export { default as resolveWriterSpawnEnv } from "../internal/core/composition/resolveWriterSpawnEnv";

export { resolveWriterExecutionBackend } from "../internal/core/writerApi/resolveWriterExecutionBackend";

export {
  readAgentWitchRunConfig,
  type AgentWitchRunConfig,
} from "../internal/core/readAgentWitchRunConfig";

export { applyWriterApiSettings } from "../internal/core/writerApi/applyWriterApiSettings";

export { readWriterApiSecretsFile } from "../internal/core/writerApi/readWriterApiSecrets";

export { resolveAgentWitchProfileDirFromConfigPath } from "../internal/core/writerApi/shouldUseWriterApi";

export { maskWriterApiKeyForDisplay } from "../internal/core/writerApi/maskWriterApiKeyForDisplay";

export {
  resolveWriterApiModel,
  resolveWriterApiModelSelectValue,
} from "../internal/core/writerApi/resolveWriterApiModel";

export { WRITER_API_KEY_CONSOLE_LINKS } from "../internal/core/writerApi/writerApiKeyConsoleUrls.constant";

export { runWriterApiPrompt } from "../internal/core/writerApi/runWriterApiPrompt";

export { shouldUseWriterApi } from "../internal/core/writerApi/shouldUseWriterApi";
export { shouldEmitWriterApiMissingCliFallbackHonesty } from "../internal/core/writerApi/shouldEmitWriterApiMissingCliFallbackHonesty";

export { resolveWriterApiProvider } from "../internal/core/writerApi/resolveWriterApiProvider";

export { readWriterApiProviderSecret } from "../internal/core/writerApi/readWriterApiSecrets";

export type { AgentWitchHeadlessWriterConfig } from "../internal/core/agentWitchHeadlessWriterRun";

export { waitForAgentWitchClientConfigs } from "../internal/core/waitForAgentWitchClientConfigsDefault";

export {
  parseAgentWitchClientConfigFromRecord,
  type ParseAgentWitchClientConfigFromRecordInput,
  type ParseAgentWitchClientConfigFromRecordResult,
} from "../internal/core/parseAgentWitchClientConfigFromRecord";

export {
  waitForAgentWitchClientConfigsWithDeps,
  type WaitForAgentWitchClientConfigsDeps,
} from "../internal/core/waitForAgentWitchClientConfigs";

export {
  buildAgentWitchDeviceRestartAckPayload,
  type AgentWitchDeviceRestartAckPayload,
  type AgentWitchDeviceRestartAckStatus,
} from "../internal/core/buildAgentWitchDeviceRestartAck";

export { scrubOutboundRunFrame } from "../internal/core/safety/scrubOutboundRunFrame";

export {
  isCodingToolsPaused,
  readCodingToolsPause,
  resolveCodingToolsPausePath,
  writeCodingToolsPause,
} from "../internal/core/safety/codingToolsPauseStore";

export type { CodingToolsPauseState } from "../internal/core/safety/parseCodingToolsPauseFile";

export { watchCodingToolsPause } from "../internal/core/safety/watchCodingToolsPause";

export {
  createBoundedRunIdLedger,
  rememberRunId,
  type RunIdLedger,
} from "../internal/core/safety/boundedRunIdLedger";

export { buildLocalCodingToolRefusalResult } from "../internal/core/safety/buildLocalCodingToolRefusalResult";

export {
  handleAgentWake,
  registerAgentTerminal,
  unregisterAgentTerminal,
} from "../internal/core/agentWake/handleAgentWake";

export {
  listenAgentTerminalSocket,
  writeToAgentTerminalSocket,
} from "../internal/core/agentWake/agentTerminalSocket";
export { replayPendingAgentWakes } from "../internal/core/agentWake/replayPendingAgentWakes";
export {
  AGENT_RUN_USAGE,
  parseAgentRunArgs,
} from "../internal/core/agentWake/parseAgentRunArgs";
