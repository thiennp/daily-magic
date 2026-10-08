/** a6053d1c: past the estimate, say so instead of a frozen "100%". */
export const AGENT_LIVE_PAST_ESTIMATE_LABEL = "Taking longer than estimated";

export const formatAgentLiveEstimatePercentLabel = (
  percent: number,
  suffix = "",
): string =>
  percent >= 100 ? AGENT_LIVE_PAST_ESTIMATE_LABEL : `${percent}%${suffix}`;
