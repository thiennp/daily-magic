/**
 * AWI slice `runtime-client` — Mac runtime config loading and helpers.
 */
export { runHeadlessWriter } from "../internal/core/agentWitchHeadlessWriterRun";

export { readAgentWitchClientConfig } from "../internal/core/readAgentWitchClientConfig";

export { resolveAgentWitchClientWsUrl } from "../internal/core/resolveAgentWitchClientWsUrl";

export { resolveRunProjectFolderPath } from "../internal/core/resolveRunProjectFolderPath";

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
