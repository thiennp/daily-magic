/** AWL migration adapter — writer CLI and local probe helpers from scripts/. */

export {
  buildWriterCliInvocation,
  isHarnessWriterAgentId,
  resolveWriterCliCommands,
  type HarnessWriterAgentId,
} from "../../../scripts/buildWriterCliInvocation";
export { probeLocalRunClis } from "../../../scripts/dispatch/probeLocalRunClis";
export { parseClaudeCliPrintResult } from "../../../scripts/dispatch/parseClaudeCliPrintResult";
