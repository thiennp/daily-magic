import type { AgentLiveWorkingEstimateProgress } from "@/features/agent/utils/resolveAgentLiveWorkingEstimateProgress";

export const AGENT_LIVE_SOFT_BUDGET_APPROACHING_PERCENT = 80;

export const resolveAgentLiveSoftBudgetWarning = (input: {
  readonly isWorking: boolean;
  readonly estimateProgress: AgentLiveWorkingEstimateProgress | null;
}): string | null => {
  if (!input.isWorking || input.estimateProgress === null) {
    return null;
  }

  const { estimateProgress } = input;

  if (estimateProgress.isExceeded) {
    return "This run is past the soft time estimate. Progress can continue, but long tasks may hit Claude session limits on your Mac.";
  }

  if (estimateProgress.percent >= AGENT_LIVE_SOFT_BUDGET_APPROACHING_PERCENT) {
    return "Approaching the soft time estimate. If the task runs much longer, it may hit provider session limits before finishing.";
  }

  return null;
};
