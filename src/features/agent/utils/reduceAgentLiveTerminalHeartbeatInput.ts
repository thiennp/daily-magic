import {
  AGENT_LIVE_PROGRESS_CHECKPOINT_QA_MARKER,
  AGENT_LIVE_PROGRESS_CHECKPOINT_QUESTION_PREFIX,
} from "@/features/agent/utils/agentLiveProgressCheckpoint.constant";
import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

import type { AgentLiveTerminalState } from "./agentLiveTerminalState.type";
import { matchesActiveRun } from "./agentLiveTerminalMessageUtils";

const WAITING_FOR_ANSWER_PREFIX = /^Waiting for your answer:\s*/i;

const wasAlreadyAnswered = (output: string, question: string): boolean => {
  const questionStart = question.replace(/(?:\.\.\.|…)$/, "").trim();
  return output.includes(
    `${AGENT_LIVE_PROGRESS_CHECKPOINT_QA_MARKER}\n${AGENT_LIVE_PROGRESS_CHECKPOINT_QUESTION_PREFIX}${questionStart}`,
  );
};

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
    payload.awaitingInput !== true ||
    state.pendingInput !== null ||
    !matchesActiveRun(state.activeRunId, payload)
  ) {
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
  if (question.length === 0 || wasAlreadyAnswered(state.output, question)) {
    return state;
  }

  return {
    ...state,
    pendingInput: {
      agentRunId: state.activeRunId ?? "",
      question,
      partialOutput: "",
    } satisfies AgentRunInputRequest,
  };
};
