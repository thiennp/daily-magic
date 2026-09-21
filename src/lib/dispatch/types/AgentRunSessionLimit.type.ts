/**
 * Hard stop for a single agent run session (P0 enforcement surface).
 * WORKING_ESTIMATE remains a soft UX budget — see agentRunWorkingEstimateSoftBudget.constant.ts.
 */
export type AgentRunSessionLimit = {
  readonly limitSeconds: number;
};

export const parseAgentRunSessionLimit = (
  sessionLimitSeconds: number | null | undefined,
): AgentRunSessionLimit | null => {
  if (
    sessionLimitSeconds === null ||
    sessionLimitSeconds === undefined ||
    !Number.isFinite(sessionLimitSeconds) ||
    sessionLimitSeconds <= 0
  ) {
    return null;
  }

  return { limitSeconds: Math.floor(sessionLimitSeconds) };
};

export const isAgentRunSessionLimitExceeded = (input: {
  readonly sessionLimit: AgentRunSessionLimit;
  readonly workedMs: number;
}): boolean => input.workedMs >= input.sessionLimit.limitSeconds * 1000;
