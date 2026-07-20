import {
  AGENT_LIVE_PROGRESS_CHECKPOINT_ANSWER_PREFIX,
  AGENT_LIVE_PROGRESS_CHECKPOINT_QA_MARKER,
  AGENT_LIVE_PROGRESS_CHECKPOINT_QUESTION_PREFIX,
} from "@/features/agent/utils/agentLiveProgressCheckpoint.constant";

export const formatAgentLiveProgressCheckpointRecord = (input: {
  readonly question: string;
  readonly answer: string;
}): string =>
  [
    AGENT_LIVE_PROGRESS_CHECKPOINT_QA_MARKER,
    `${AGENT_LIVE_PROGRESS_CHECKPOINT_QUESTION_PREFIX}${input.question}`,
    `${AGENT_LIVE_PROGRESS_CHECKPOINT_ANSWER_PREFIX}${input.answer}`,
    "",
  ].join("\n");
