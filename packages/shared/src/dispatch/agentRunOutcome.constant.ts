export const AgentRunOutcomeCode = {
  SESSION_LIMIT: "session_limit",
  PROVIDER_QUOTA: "provider_quota",
} as const;

export type AgentRunOutcomeCodeValue =
  (typeof AgentRunOutcomeCode)[keyof typeof AgentRunOutcomeCode];

export const isAgentRunOutcomeCode = (
  value: string,
): value is AgentRunOutcomeCodeValue =>
  Object.values(AgentRunOutcomeCode).includes(
    value as AgentRunOutcomeCodeValue,
  );
