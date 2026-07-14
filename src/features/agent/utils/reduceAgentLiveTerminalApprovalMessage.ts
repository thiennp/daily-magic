import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

import type { AgentLiveTerminalState } from "./agentLiveTerminalState.type";
import { isRecord, matchesActiveRun } from "./agentLiveTerminalMessageUtils";

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
        output: `${state.output}$ task running on your Mac\n`,
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
        output: `${state.output}\n$ dispatch denied: ${denialReason}\n`,
        pendingInput: null,
      };
    }

    if (payload.status === AgentRunStatus.RUNNING) {
      return {
        ...state,
        status: "streaming",
        output: `${state.output}$ dispatch approved — running…\n`,
        pendingInput: null,
      };
    }
  }

  return state;
};
