import { AGENT_AUTOMATION_SCHEDULE_PRESETS } from "@/lib/automations/AgentAutomationSchedulePreset.constant";
import mapAgentAutomationRow from "@/lib/automations/mapAgentAutomationRow";
import type { CreateAgentAutomationInput } from "@/lib/automations/parseAgentAutomationBody";
import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";
import {
  hashAutomationWebhookSecret,
  readAutomationWebhookSecretPrefix,
} from "@/lib/automations/automationWebhookSecret";
import { asRowArray, getSql } from "@/lib/db";

export const insertAgentAutomationRecord = async (input: {
  readonly automationId: string;
  readonly ownerUserId: string;
  readonly createInput: CreateAgentAutomationInput;
  readonly fieldValuesJson: string;
  readonly projectId: string | null;
  readonly localPrompt: string;
  readonly webhookSecret: string | null;
  readonly nextRunAt: string | null;
}): Promise<AgentAutomationRecord> => {
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
        project_id,
        local_prompt,
        enabled,
        next_run_at
      )
      VALUES (
        ${input.automationId},
        ${input.ownerUserId},
        ${input.createInput.capabilityId},
        ${input.createInput.deviceId ?? null},
        ${input.ownerUserId},
        ${input.createInput.name},
        ${input.createInput.triggerType},
        ${input.createInput.schedulePreset ?? null},
        ${
          input.createInput.schedulePreset ===
          AGENT_AUTOMATION_SCHEDULE_PRESETS.HOURLY
            ? null
            : (input.createInput.scheduleHour ?? 9)
        },
        ${input.createInput.scheduleTimezone ?? "UTC"},
        ${input.webhookSecret ? hashAutomationWebhookSecret(input.webhookSecret) : null},
        ${input.webhookSecret ? readAutomationWebhookSecretPrefix(input.webhookSecret) : null},
        ${input.fieldValuesJson}::jsonb,
        ${input.projectId},
        ${input.localPrompt},
        ${input.createInput.enabled ?? true},
        ${input.nextRunAt}
      )
      RETURNING *
    `,
  );

  return mapAgentAutomationRow(rows[0]);
};
