import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { isAgentRunUserStopped } from "@/lib/dispatch/isAgentRunUserStopped";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

import type { AgentLiveTerminalState } from "./agentLiveTerminalState.type";

/**
 * 74408099 (Testi recheck @300): the stream ended first, so the floater was
 * already "finished" (Success) when the server's run record said Failed, and
 * that record was ignored. Tasks and Home read the run record, so the floater
 * now follows it too: Failed → error, Expired → timed out. Output is kept.
 */
export const reconcileFinishedFloaterWithRunRecord = (
  state: AgentLiveTerminalState,
  run: AgentRunRecord,
): AgentLiveTerminalState => {
  if (run.status === AgentRunStatus.EXPIRED) {
    return { ...state, status: "timed_out" };
  }
  if (
    run.status === AgentRunStatus.FAILED &&
    !isAgentRunUserStopped(state.output, run.resultExitCode)
  ) {
    return { ...state, status: "error" };
  }
  return state;
};
