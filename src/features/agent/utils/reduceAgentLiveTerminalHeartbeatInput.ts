import { isAgentRunQuestionAlreadyAnswered } from "@/features/agent/utils/isAgentRunQuestionAlreadyAnswered";
import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

import type { AgentLiveTerminalState } from "./agentLiveTerminalState.type";
import { matchesActiveRun } from "./agentLiveTerminalMessageUtils";

const WAITING_FOR_ANSWER_PREFIX = /^Waiting for your answer:\s*/i;

/**
 * 9c8a811d (Testi run 3 @292): the host paused for input, but the one-shot
 * input_required never reached the floater, so it showed "In progress" with
 * no ask. Every 15 s the paused run's heartbeat says `awaitingInput` with the
 * host report "Waiting for your answer: <question>"; the floater opens the
 * checkpoint from it when it has none (and the answer still goes to the same
 * run via input_respond).
 */
export const reduceAgentLiveTerminalHeartbeatInput = (
  state: AgentLiveTerminalState,
  parsed: Record<string, unknown>,
  payload: Record<string, unknown>,
): AgentLiveTerminalState => {
  if (
    parsed.type !== AGENT_WITCH_MESSAGE_TYPES.RUN_HEARTBEAT ||
    !matchesActiveRun(state.activeRunId, payload)
  ) {
    return state;
  }
  // 2a17ba21: the host stopped waiting, so an ask we opened from a heartbeat
  // (or one already answered) closes instead of sticking until the run ends.
  if (payload.awaitingInput !== true) {
    return state.pendingInput !== null &&
      (state.pendingInput.fromHeartbeat === true ||
        isAgentRunQuestionAlreadyAnswered(
          state.output,
          state.pendingInput.question,
        ))
      ? { ...state, pendingInput: null }
      : state;
  }
  if (state.pendingInput !== null) {
    return state;
  }

  const summary =
    typeof payload.reportSummary === "string"
      ? payload.reportSummary.trim()
      : "";
  if (!WAITING_FOR_ANSWER_PREFIX.test(summary)) {
    return state;
  }

  const question = summary.replace(WAITING_FOR_ANSWER_PREFIX, "").trim();
  if (
    question.length === 0 ||
    isAgentRunQuestionAlreadyAnswered(state.output, question)
  ) {
    return state;
  }

  return {
    ...state,
    pendingInput: {
      agentRunId: state.activeRunId ?? "",
      question,
      partialOutput: "",
      fromHeartbeat: true,
    } satisfies AgentRunInputRequest,
  };
};
