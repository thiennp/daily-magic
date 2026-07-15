import { AGENT_AUTOMATION_TRIGGER_TYPES } from "@/lib/automations/AgentAutomationTriggerType.constant";
import type {
  CreateAgentAutomationInput,
  UpdateAgentAutomationInput,
} from "@/lib/automations/parseAgentAutomationBody.types";
import {
  parseFieldValues,
  readNonEmptyString,
  readScheduleHour,
  readSchedulePreset,
  readTriggerType,
} from "@/lib/automations/parseAgentAutomationBody.util";

export type {
  CreateAgentAutomationInput,
  UpdateAgentAutomationInput,
} from "@/lib/automations/parseAgentAutomationBody.types";

export const parseCreateAgentAutomationBody = (
  body: unknown,
): CreateAgentAutomationInput | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const record = body as Record<string, unknown>;
  const name = readNonEmptyString(record.name);
  const capabilityId = readNonEmptyString(record.capabilityId);
  const triggerType = readTriggerType(record.triggerType);
  const schedulePreset = readSchedulePreset(record.schedulePreset);

  if (name === null || capabilityId === null || triggerType === null) {
    return null;
  }

  if (
    triggerType === AGENT_AUTOMATION_TRIGGER_TYPES.SCHEDULE &&
    schedulePreset === undefined
  ) {
    return null;
  }

  const deviceId =
    record.deviceId === null
      ? null
      : (readNonEmptyString(record.deviceId) ?? undefined);
  const scheduleHour = readScheduleHour(record.scheduleHour);
  const scheduleTimezone = readNonEmptyString(record.scheduleTimezone);
  const fieldValues = parseFieldValues(record.fieldValues);

  return {
    name,
    capabilityId,
    triggerType,
    ...(deviceId !== undefined ? { deviceId } : {}),
    ...(schedulePreset !== undefined ? { schedulePreset } : {}),
    ...(scheduleHour !== undefined ? { scheduleHour } : {}),
    ...(scheduleTimezone !== null ? { scheduleTimezone } : {}),
    ...(fieldValues !== undefined ? { fieldValues } : {}),
    ...(typeof record.enabled === "boolean" ? { enabled: record.enabled } : {}),
  };
};

export const parseUpdateAgentAutomationBody = (
  body: unknown,
): UpdateAgentAutomationInput | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const record = body as Record<string, unknown>;
  const schedulePreset = readSchedulePreset(record.schedulePreset);
  const name = readNonEmptyString(record.name);
  const deviceId = readNonEmptyString(record.deviceId);
  const scheduleHour = readScheduleHour(record.scheduleHour);
  const scheduleTimezone = readNonEmptyString(record.scheduleTimezone);
  const fieldValues = parseFieldValues(record.fieldValues);

  return {
    ...(name !== null ? { name } : {}),
    ...(record.deviceId === null
      ? { deviceId: null }
      : deviceId !== null
        ? { deviceId }
        : {}),
    ...(schedulePreset !== undefined ? { schedulePreset } : {}),
    ...(scheduleHour !== undefined ? { scheduleHour } : {}),
    ...(scheduleTimezone !== null ? { scheduleTimezone } : {}),
    ...(fieldValues !== undefined ? { fieldValues } : {}),
    ...(typeof record.enabled === "boolean" ? { enabled: record.enabled } : {}),
  };
};

export const parseAutomationTriggerFieldValues = (
  body: unknown,
): Readonly<Record<string, string>> | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const record = body as Record<string, unknown>;
  return parseFieldValues(record.fieldValues) ?? {};
};
