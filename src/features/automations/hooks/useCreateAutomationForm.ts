import { useState } from "react";

import { submitCreateAutomation } from "@/features/automations/submitCreateAutomation";
import { AGENT_AUTOMATION_SCHEDULE_PRESETS } from "@/lib/automations/AgentAutomationSchedulePreset.constant";
import type { AgentAutomationSchedulePresetValue } from "@/lib/automations/AgentAutomationSchedulePreset.constant";
import { AGENT_AUTOMATION_TRIGGER_TYPES } from "@/lib/automations/AgentAutomationTriggerType.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

export const useCreateAutomationForm = (
  capabilities: readonly PublishedCapabilityRecord[],
  initialCapabilityId: string | undefined,
  onCreated: () => void,
) => {
  const [capabilityId, setCapabilityId] = useState(initialCapabilityId ?? "");
  const [name, setName] = useState("");
  const [triggerType, setTriggerType] = useState<
    | typeof AGENT_AUTOMATION_TRIGGER_TYPES.SCHEDULE
    | typeof AGENT_AUTOMATION_TRIGGER_TYPES.WEBHOOK
  >(AGENT_AUTOMATION_TRIGGER_TYPES.SCHEDULE);
  const [preset, setPreset] = useState<AgentAutomationSchedulePresetValue>(
    AGENT_AUTOMATION_SCHEDULE_PRESETS.DAILY,
  );
  const [scheduleHour, setScheduleHour] = useState(9);
  const [scheduleTimezone, setScheduleTimezone] = useState("UTC");
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [webhookSecret, setWebhookSecret] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const capability =
    capabilities.find((item) => item.id === capabilityId) ?? null;

  const handleCapabilityChange = (nextCapabilityId: string): void => {
    setCapabilityId(nextCapabilityId);
    const selected =
      capabilities.find((item) => item.id === nextCapabilityId) ?? null;

    if (selected !== null) {
      setName(`${selected.name} automation`);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (capabilityId.length === 0 || name.trim().length === 0) {
      setError("Choose a workflow and name.");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    const result = await submitCreateAutomation({
      name: name.trim(),
      capabilityId,
      triggerType,
      ...(triggerType === AGENT_AUTOMATION_TRIGGER_TYPES.SCHEDULE
        ? { schedulePreset: preset, scheduleHour, scheduleTimezone }
        : {}),
      fieldValues,
    });
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.errorMessage);
      return;
    }

    setWebhookSecret(result.webhookSecret);
    setWebhookUrl(result.webhookUrl);
    onCreated();
  };

  return {
    capability,
    capabilityId,
    name,
    triggerType,
    preset,
    scheduleHour,
    scheduleTimezone,
    fieldValues,
    error,
    webhookSecret,
    webhookUrl,
    isSubmitting,
    setFieldValues,
    handleCapabilityChange,
    handleSubmit,
    setName,
    setTriggerType,
    setPreset,
    setScheduleHour,
    setScheduleTimezone,
  };
};
