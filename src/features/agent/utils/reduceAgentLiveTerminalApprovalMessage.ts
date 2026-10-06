import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

import type { AgentLiveTerminalState } from "./agentLiveTerminalState.type";
import {
  isRecord,
  matchesActiveRun,
  mergeTerminalResultOutput,
} from "./agentLiveTerminalMessageUtils";
import { appendAgentLiveTerminalPrompt } from "./agentLiveTerminalPrompt.constant";

export const reduceAgentLiveTerminalApprovalMessage = (
  state: AgentLiveTerminalState,
  parsed: Record<string, unknown>,
  payload: Record<string, unknown>,
): AgentLiveTerminalState => {
  if (
    parsed.type === AGENT_WITCH_MESSAGE_TYPES.AGENT_RUN_RECORD &&
    isRecord(payload.run)
  ) {
    const run = payload.run as unknown as AgentRunRecord;
    if (
      run.id === state.activeRunId &&
      run.status === AgentRunStatus.RUNNING &&
      state.status === "waiting_approval"
    ) {
      return {
        ...state,
        status: "streaming",
      };
    }

    if (
      run.id === state.activeRunId &&
      (run.status === AgentRunStatus.COMPLETED ||
        run.status === AgentRunStatus.FAILED ||
        run.status === AgentRunStatus.EXPIRED ||
        run.status === AgentRunStatus.DENIED) &&
      state.status !== "finished" &&
      state.status !== "idle" &&
      state.status !== "timed_out"
    ) {
      const resultOutput =
        typeof run.resultOutput === "string" ? run.resultOutput : "";
      const timedOut = run.status === AgentRunStatus.EXPIRED;
      return {
        ...state,
        output: appendAgentLiveTerminalPrompt(
          mergeTerminalResultOutput(state.output, resultOutput),
        ),
        status: timedOut ? "timed_out" : "finished",
        pendingInput: null,
        pendingCommandLine: null,
      };
    }
  }

  if (
    parsed.type === AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_RESULT &&
    matchesActiveRun(state.activeRunId, payload)
  ) {
    if (payload.status === AgentRunStatus.DENIED) {
      const denialReason =
        typeof payload.denialReason === "string"
          ? payload.denialReason
          : "Dispatch denied.";
      return {
        ...state,
        status: "finished",
        output: `${state.output}${denialReason}\n`,
        pendingInput: null,
        pendingCommandLine: null,
      };
    }

    if (
      payload.status === AgentRunStatus.EXPIRED ||
      payload.status === "timed_out"
    ) {
      const reason =
        typeof payload.denialReason === "string"
          ? payload.denialReason
          : "Dispatch approval expired.";
      return {
        ...state,
        status: "timed_out",
        output: `${state.output}${reason}\n`,
        pendingInput: null,
        pendingCommandLine: null,
      };
    }

    if (payload.status === AgentRunStatus.RUNNING) {
      return {
        ...state,
        status: "streaming",
        pendingInput: null,
        pendingCommandLine: null,
      };
    }
  }

  return state;
};
