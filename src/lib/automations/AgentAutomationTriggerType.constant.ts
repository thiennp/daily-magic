export const AGENT_AUTOMATION_TRIGGER_TYPES = {
  SCHEDULE: "schedule",
  WEBHOOK: "webhook",
} as const;

export type AgentAutomationTriggerTypeValue =
  (typeof AGENT_AUTOMATION_TRIGGER_TYPES)[keyof typeof AGENT_AUTOMATION_TRIGGER_TYPES];

export const isAgentAutomationTriggerType = (
  value: string,
): value is AgentAutomationTriggerTypeValue =>
  Object.values(AGENT_AUTOMATION_TRIGGER_TYPES).includes(
    value as AgentAutomationTriggerTypeValue,
  );
