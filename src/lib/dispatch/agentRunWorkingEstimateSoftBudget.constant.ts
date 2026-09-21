/**
 * [[WORKING_ESTIMATE]] seconds are a soft UX budget (progress + stall hints),
 * not a hard kill switch for the Mac writer. See AGENT-052 / AGENT-061.
 */
export const AGENT_RUN_WORKING_ESTIMATE_IS_SOFT_BUDGET = true as const;
