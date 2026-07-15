import type { AgentAutomationSchedulePresetValue } from "@/lib/automations/AgentAutomationSchedulePreset.constant";
import { isAgentAutomationSchedulePreset } from "@/lib/automations/AgentAutomationSchedulePreset.constant";
import type { AgentAutomationTriggerTypeValue } from "@/lib/automations/AgentAutomationTriggerType.constant";
import { isAgentAutomationTriggerType } from "@/lib/automations/AgentAutomationTriggerType.constant";

export const readNonEmptyString = (value: unknown): string | null =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : null;

export const readScheduleHour = (value: unknown): number | undefined =>
  typeof value === "number" &&
  Number.isInteger(value) &&
  value >= 0 &&
  value <= 23
    ? value
    : undefined;

export const parseFieldValues = (
  value: unknown,
): Readonly<Record<string, string>> | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).flatMap(([key, fieldValue]) =>
      typeof fieldValue === "string" ? [[key, fieldValue]] : [],
    ),
  );
};

export const readSchedulePreset = (
  value: unknown,
): AgentAutomationSchedulePresetValue | undefined => {
  const schedulePresetValue = readNonEmptyString(value);

  return schedulePresetValue !== null &&
    isAgentAutomationSchedulePreset(schedulePresetValue)
    ? schedulePresetValue
    : undefined;
};

export const readTriggerType = (
  value: unknown,
): AgentAutomationTriggerTypeValue | null => {
  const triggerType = readNonEmptyString(value);

  if (triggerType === null || !isAgentAutomationTriggerType(triggerType)) {
    return null;
  }

  return triggerType;
};
