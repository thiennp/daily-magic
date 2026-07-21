import { resolveAgentLiveWorkingEstimateBufferMs } from "@/features/agent/utils/agentLiveWorkingEstimate.constant";

export interface AgentLiveWorkingEstimateProgress {
  readonly estimateSeconds: number;
  readonly estimateMs: number;
  readonly bufferMs: number;
  readonly budgetMs: number;
  readonly workedMs: number;
  /** 0–100 based on worked / (estimate + buffer). */
  readonly percent: number;
  readonly isExceeded: boolean;
}

export const resolveAgentLiveWorkingEstimateProgress = (input: {
  readonly estimateSeconds: number;
  readonly workedMs: number;
}): AgentLiveWorkingEstimateProgress => {
  const estimateMs = Math.max(0, input.estimateSeconds) * 1_000;
  const bufferMs = resolveAgentLiveWorkingEstimateBufferMs(estimateMs);
  const budgetMs = estimateMs + bufferMs;
  const workedMs = Math.max(0, input.workedMs);
  const percent =
    budgetMs <= 0
      ? 100
      : Math.min(100, Math.round((workedMs / budgetMs) * 100));

  return {
    estimateSeconds: input.estimateSeconds,
    estimateMs,
    bufferMs,
    budgetMs,
    workedMs,
    percent,
    isExceeded: workedMs >= budgetMs,
  };
};
