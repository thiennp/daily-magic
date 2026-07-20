import {
  AGENT_LIVE_PROGRESS_CHECKPOINT_ANSWER_PREFIX,
  AGENT_LIVE_PROGRESS_CHECKPOINT_QUESTION_PREFIX,
} from "@/features/agent/utils/agentLiveProgressCheckpoint.constant";
import type { AgentLiveProgressCheckpointExchange } from "@/features/agent/utils/agentLiveProgressCheckpointExchange.type";

export const parseCheckpointQaBlock = (
  block: string,
  offset: number,
): AgentLiveProgressCheckpointExchange | null => {
  const parsed = block.split(/\r?\n/).reduce<{
    readonly question: string | null;
    readonly answer: string | null;
  }>(
    (accumulator, line) => {
      if (line.startsWith(AGENT_LIVE_PROGRESS_CHECKPOINT_QUESTION_PREFIX)) {
        return {
          ...accumulator,
          question: line
            .slice(AGENT_LIVE_PROGRESS_CHECKPOINT_QUESTION_PREFIX.length)
            .trim(),
        };
      }
      if (line.startsWith(AGENT_LIVE_PROGRESS_CHECKPOINT_ANSWER_PREFIX)) {
        return {
          ...accumulator,
          answer: line
            .slice(AGENT_LIVE_PROGRESS_CHECKPOINT_ANSWER_PREFIX.length)
            .trim(),
        };
      }
      return accumulator;
    },
    { question: null, answer: null },
  );

  if (parsed.question === null || parsed.answer === null) {
    return null;
  }

  return { question: parsed.question, answer: parsed.answer, offset };
};
