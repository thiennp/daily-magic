import { isAgentAutomationLastRunStatus } from "@/lib/automations/AgentAutomationLastRunStatus.constant";
import { isAgentAutomationSchedulePreset } from "@/lib/automations/AgentAutomationSchedulePreset.constant";
import { isAgentAutomationTriggerType } from "@/lib/automations/AgentAutomationTriggerType.constant";
import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";

const parseFieldValues = (value: unknown): Readonly<Record<string, string>> => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).flatMap(([key, fieldValue]) =>
      typeof fieldValue === "string" ? [[key, fieldValue]] : [],
    ),
  );
};

export default function mapAgentAutomationRow(
  row: Record<string, unknown>,
): AgentAutomationRecord {
  const triggerType = String(row.trigger_type);
  const schedulePreset =
    row.schedule_preset === null || row.schedule_preset === undefined
      ? null
      : String(row.schedule_preset);
  const lastRunStatus =
    row.last_run_status === null || row.last_run_status === undefined
      ? null
      : String(row.last_run_status);

  return {
    id: String(row.id),
    ownerUserId: String(row.owner_user_id),
    capabilityId: String(row.capability_id),
    deviceId: row.device_id ? String(row.device_id) : null,
    executorUserId: String(row.executor_user_id),
    name: String(row.name),
    triggerType: isAgentAutomationTriggerType(triggerType)
      ? triggerType
      : "schedule",
    schedulePreset:
      schedulePreset !== null && isAgentAutomationSchedulePreset(schedulePreset)
        ? schedulePreset
        : null,
    scheduleHour:
      typeof row.schedule_hour === "number" ? row.schedule_hour : null,
    scheduleTimezone:
      typeof row.schedule_timezone === "string" &&
      row.schedule_timezone.length > 0
        ? row.schedule_timezone
        : "UTC",
    webhookSecretPrefix: row.webhook_secret_prefix
      ? String(row.webhook_secret_prefix)
      : null,
    fieldValues: parseFieldValues(row.field_values),
    projectId: row.project_id ? String(row.project_id) : null,
    localPrompt:
      typeof row.local_prompt === "string" && row.local_prompt.length > 0
        ? row.local_prompt
        : null,
    enabled: row.enabled === true,
    lastRunAt: row.last_run_at ? String(row.last_run_at) : null,
    nextRunAt: row.next_run_at ? String(row.next_run_at) : null,
    lastRunStatus:
      lastRunStatus !== null && isAgentAutomationLastRunStatus(lastRunStatus)
        ? lastRunStatus
        : null,
    lastError: row.last_error ? String(row.last_error) : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}
