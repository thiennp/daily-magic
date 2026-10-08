import { formatAgentRunTerminalReasonLine } from "@/lib/dispatch/agentRunLostConnectionReasons.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { isAgentRunUserStopped } from "@/lib/dispatch/isAgentRunUserStopped";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

import type { AgentLiveTerminalState } from "./agentLiveTerminalState.type";
import { mergeTerminalResultOutput } from "./agentLiveTerminalMessageUtils";
import { appendAgentLiveTerminalPrompt } from "./agentLiveTerminalPrompt.constant";

const resolveTerminalStatus = (
  runStatus: string,
  failed: boolean,
): AgentLiveTerminalState["status"] => {
  if (runStatus === AgentRunStatus.EXPIRED) {
    return "timed_out";
  }
  return failed ? "error" : "finished";
};

/**
 * The server says the active run is over (socket broadcast or S7 re-read):
 * append its result plus the reason line, and end the floater. S2: a
 * server-failed run (stale / lost host) ends in error, never Success.
 */
export const reduceAgentLiveTerminalRunRecordEnd = (
  state: AgentLiveTerminalState,
  run: AgentRunRecord,
): AgentLiveTerminalState => {
  const resultOutput =
    typeof run.resultOutput === "string" ? run.resultOutput : "";
  const reasonLine = formatAgentRunTerminalReasonLine(run.denialReason);
  const terminalText = [resultOutput.trimEnd(), reasonLine]
    .filter((part) => part.length > 0)
    .join("\n");
  const output = appendAgentLiveTerminalPrompt(
    mergeTerminalResultOutput(state.output, terminalText),
  );
  const failed =
    run.status === AgentRunStatus.FAILED &&
    !isAgentRunUserStopped(output, run.resultExitCode);
  return {
    ...state,
    output,
    status: resolveTerminalStatus(run.status, failed),
    pendingInput: null,
    pendingCommandLine: null,
  };
};
