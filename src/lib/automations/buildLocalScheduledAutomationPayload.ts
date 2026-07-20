import { AGENT_AUTOMATION_TRIGGER_TYPES } from "@/lib/automations/AgentAutomationTriggerType.constant";
import { buildAutomationDispatchPrompt } from "@/lib/automations/buildAutomationDispatchPrompt";
import { prepareAutomationFieldValues } from "@/lib/automations/prepareAutomationFieldValues";
import type LocalScheduledAutomationPayload from "@/lib/automations/types/LocalScheduledAutomationPayload.type";
import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

export const buildLocalScheduledAutomationPayload = (
  automation: AgentAutomationRecord,
  capability: PublishedCapabilityRecord,
  prompt: string,
): LocalScheduledAutomationPayload | null => {
  if (
    automation.triggerType !== AGENT_AUTOMATION_TRIGGER_TYPES.SCHEDULE ||
    automation.schedulePreset === null
  ) {
    return null;
  }

  return {
    id: automation.id,
    name: automation.name,
    capabilityId: automation.capabilityId,
    prompt,
    schedulePreset: automation.schedulePreset,
    scheduleHour: automation.scheduleHour,
    scheduleTimezone: automation.scheduleTimezone,
    enabled: automation.enabled,
    nextRunAt: automation.nextRunAt,
  };
};

export const resolveAutomationLocalPrompt = async (
  automation: AgentAutomationRecord,
  capability: PublishedCapabilityRecord,
): Promise<string> => {
  const prepared = await prepareAutomationFieldValues({
    ownerUserId: automation.ownerUserId,
    capability,
    fieldValues: automation.fieldValues,
    projectId: automation.projectId,
  });
  const fieldValues = prepared.ok
    ? prepared.fieldValues
    : automation.fieldValues;

  return buildAutomationDispatchPrompt(capability, fieldValues);
};
