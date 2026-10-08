/** AWL migration adapter — writer CLI and local probe helpers from scripts/. */

export {
  buildWriterCliInvocation,
  isHarnessWriterAgentId,
  resolveWriterCliCommands,
  type HarnessWriterAgentId,
} from "../../../scripts/buildWriterCliInvocation";
export { probeLocalRunClis } from "../../../scripts/dispatch/probeLocalRunClis";
export {
  listInstalledOllamaChatModels,
  selectInstalledOllamaEstimateModel,
} from "../../../scripts/dispatch/selectInstalledOllamaEstimateModel";
export { parseClaudeCliPrintResult } from "../../../scripts/dispatch/parseClaudeCliPrintResult";
