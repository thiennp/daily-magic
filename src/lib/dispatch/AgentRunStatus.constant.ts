export const AgentRunStatus = {
  PENDING_APPROVAL: "pending_approval",
  RUNNING: "running",
  COMPLETED: "completed",
  FAILED: "failed",
  DENIED: "denied",
} as const;

export type AgentRunStatusValue =
  (typeof AgentRunStatus)[keyof typeof AgentRunStatus];

export const isAgentRunStatus = (value: string): value is AgentRunStatusValue =>
  Object.values(AgentRunStatus).includes(value as AgentRunStatusValue);
