import { randomUUID } from "node:crypto";

import { AGENT_AUTOMATION_SCHEDULE_PRESETS } from "@/lib/automations/AgentAutomationSchedulePreset.constant";
import { AGENT_AUTOMATION_TRIGGER_TYPES } from "@/lib/automations/AgentAutomationTriggerType.constant";
import { computeNextScheduleRun } from "@/lib/automations/computeNextScheduleRun";
import mapAgentAutomationRow from "@/lib/automations/mapAgentAutomationRow";
import type { CreateAgentAutomationInput } from "@/lib/automations/parseAgentAutomationBody";
import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";
import {
  generateAutomationWebhookSecret,
  hashAutomationWebhookSecret,
  readAutomationWebhookSecretPrefix,
} from "@/lib/automations/automationWebhookSecret";
import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";
import { buildAutomationDispatchPrompt } from "@/lib/automations/buildAutomationDispatchPrompt";
import { asRowArray, getSql } from "@/lib/db";

export interface CreateAgentAutomationResult {
  readonly automation: AgentAutomationRecord;
  readonly webhookSecret: string | null;
}

const resolveNextRunAt = (input: CreateAgentAutomationInput): string | null => {
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

export const createAgentAutomation = async (
  ownerUserId: string,
  input: CreateAgentAutomationInput,
): Promise<CreateAgentAutomationResult | null> => {
  const capability = await getPublishedCapabilityById(input.capabilityId);

  if (capability === null || capability.ownerUserId !== ownerUserId) {
    return null;
  }

  const automationId = randomUUID();
  const fieldValuesJson = JSON.stringify(input.fieldValues ?? {});
  const localPrompt = buildAutomationDispatchPrompt(
    capability,
    input.fieldValues ?? {},
  );
  const webhookSecret =
    input.triggerType === AGENT_AUTOMATION_TRIGGER_TYPES.WEBHOOK
      ? generateAutomationWebhookSecret()
      : null;
  const nextRunAt = resolveNextRunAt(input);
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO agent_automations (
        id,
        owner_user_id,
        capability_id,
        device_id,
        executor_user_id,
        name,
        trigger_type,
        schedule_preset,
        schedule_hour,
        schedule_timezone,
        webhook_secret_hash,
        webhook_secret_prefix,
        field_values,
        local_prompt,
        enabled,
        next_run_at
      )
      VALUES (
        ${automationId},
        ${ownerUserId},
        ${input.capabilityId},
        ${input.deviceId ?? null},
        ${ownerUserId},
        ${input.name},
        ${input.triggerType},
        ${input.schedulePreset ?? null},
        ${
          input.schedulePreset === AGENT_AUTOMATION_SCHEDULE_PRESETS.HOURLY
            ? null
            : (input.scheduleHour ?? 9)
        },
        ${input.scheduleTimezone ?? "UTC"},
        ${webhookSecret ? hashAutomationWebhookSecret(webhookSecret) : null},
        ${webhookSecret ? readAutomationWebhookSecretPrefix(webhookSecret) : null},
        ${fieldValuesJson}::jsonb,
        ${localPrompt},
        ${input.enabled ?? true},
        ${nextRunAt}
      )
      RETURNING *
    `,
  );

  return {
    automation: mapAgentAutomationRow(rows[0]),
    webhookSecret,
  };
};
