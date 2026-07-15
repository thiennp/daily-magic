export const AGENT_AUTOMATION_SCHEDULE_PRESETS = {
  HOURLY: "hourly",
  DAILY: "daily",
  WEEKDAYS: "weekdays",
} as const;

export type AgentAutomationSchedulePresetValue =
  (typeof AGENT_AUTOMATION_SCHEDULE_PRESETS)[keyof typeof AGENT_AUTOMATION_SCHEDULE_PRESETS];

export const isAgentAutomationSchedulePreset = (
  value: string,
): value is AgentAutomationSchedulePresetValue =>
  Object.values(AGENT_AUTOMATION_SCHEDULE_PRESETS).includes(
    value as AgentAutomationSchedulePresetValue,
  );
