import { AGENT_AUTOMATION_TRIGGER_TYPES } from "@/lib/automations/AgentAutomationTriggerType.constant";
import { computeNextScheduleRun } from "@/lib/automations/computeNextScheduleRun";
import type { CreateAgentAutomationInput } from "@/lib/automations/parseAgentAutomationBody";

export const resolveAutomationNextRunAt = (
  input: CreateAgentAutomationInput,
): string | null => {
  if (
    input.triggerType !== AGENT_AUTOMATION_TRIGGER_TYPES.SCHEDULE ||
    input.schedulePreset === undefined
  ) {
    return null;
  }

  return computeNextScheduleRun({
    preset: input.schedulePreset,
    scheduleHour: input.scheduleHour ?? null,
    timeZone: input.scheduleTimezone ?? "UTC",
  }).toISOString();
};
