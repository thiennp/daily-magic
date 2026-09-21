import { AGENT_LIVE_SOFT_ESTIMATE_LABEL } from "@/lib/dispatch/agentRunBudgetLabels.constant";

export const formatAgentLiveWorkingEstimateLabel = (
  estimateSeconds: number,
): string => {
  if (estimateSeconds < 60) {
    return `${AGENT_LIVE_SOFT_ESTIMATE_LABEL}: about ${estimateSeconds}s`;
  }

  const minutes = Math.round(estimateSeconds / 60);
  if (minutes < 60) {
    return `${AGENT_LIVE_SOFT_ESTIMATE_LABEL}: about ${minutes} min`;
  }

  const hours = Math.round(minutes / 60);
  return `${AGENT_LIVE_SOFT_ESTIMATE_LABEL}: about ${hours} hr`;
};
