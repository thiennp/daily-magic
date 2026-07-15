export const AGENT_AUTOMATION_LAST_RUN_STATUSES = {
  OK: "ok",
  SKIPPED: "skipped",
  FAILED: "failed",
} as const;

export type AgentAutomationLastRunStatusValue =
  (typeof AGENT_AUTOMATION_LAST_RUN_STATUSES)[keyof typeof AGENT_AUTOMATION_LAST_RUN_STATUSES];

export const isAgentAutomationLastRunStatus = (
  value: string,
): value is AgentAutomationLastRunStatusValue =>
  Object.values(AGENT_AUTOMATION_LAST_RUN_STATUSES).includes(
    value as AgentAutomationLastRunStatusValue,
  );
