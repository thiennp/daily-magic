/**
 * AWI slice `runtime-client` — Mac runtime config loading and helpers.
 */
export { readAgentWitchClientConfig } from "../internal/core/readAgentWitchClientConfig";

export { resolveAgentWitchClientWsUrl } from "../internal/core/resolveAgentWitchClientWsUrl";

export { resolveRunProjectFolderPath } from "../internal/core/resolveRunProjectFolderPath";

export { resolveWriterExecutionBackend } from "../internal/core/resolveWriterExecutionBackend";

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
