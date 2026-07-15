import { AGENT_AUTOMATION_TRIGGER_TYPES } from "@/lib/automations/AgentAutomationTriggerType.constant";
import { computeNextScheduleRun } from "@/lib/automations/computeNextScheduleRun";
import { buildAutomationDispatchPrompt } from "@/lib/automations/buildAutomationDispatchPrompt";
import mapAgentAutomationRow from "@/lib/automations/mapAgentAutomationRow";
import type { UpdateAgentAutomationInput } from "@/lib/automations/parseAgentAutomationBody";
import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";
import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";
import { asRowArray, getSql } from "@/lib/db";

export const updateAgentAutomation = async (
  automationId: string,
  ownerUserId: string,
  input: UpdateAgentAutomationInput,
): Promise<AgentAutomationRecord | null> => {
  const sql = getSql();
  const existingRows = asRowArray(
    await sql`
      SELECT *
      FROM agent_automations
      WHERE id = ${automationId}
        AND owner_user_id = ${ownerUserId}
      LIMIT 1
    `,
  );

  if (existingRows.length === 0) {
    return null;
  }

  const existing = mapAgentAutomationRow(existingRows[0]);
  const name = input.name ?? existing.name;
  const deviceId =
    input.deviceId !== undefined ? input.deviceId : existing.deviceId;
  const schedulePreset = input.schedulePreset ?? existing.schedulePreset;
  const scheduleHour = input.scheduleHour ?? existing.scheduleHour;
  const scheduleTimezone = input.scheduleTimezone ?? existing.scheduleTimezone;
  const fieldValues = input.fieldValues ?? existing.fieldValues;
  const enabled = input.enabled ?? existing.enabled;
  const capability = await getPublishedCapabilityById(existing.capabilityId);
  const localPrompt =
    capability !== null
      ? buildAutomationDispatchPrompt(capability, fieldValues)
      : existing.localPrompt;
  const nextRunAt =
    existing.triggerType === AGENT_AUTOMATION_TRIGGER_TYPES.SCHEDULE &&
    schedulePreset !== null
      ? computeNextScheduleRun({
          preset: schedulePreset,
          scheduleHour,
          timeZone: scheduleTimezone,
        }).toISOString()
      : existing.nextRunAt;

  const rows = asRowArray(
    await sql`
      UPDATE agent_automations
      SET
        name = ${name},
        device_id = ${deviceId},
        schedule_preset = ${schedulePreset},
        schedule_hour = ${scheduleHour},
        schedule_timezone = ${scheduleTimezone},
        field_values = ${JSON.stringify(fieldValues)}::jsonb,
        local_prompt = ${localPrompt},
        enabled = ${enabled},
        next_run_at = ${nextRunAt},
        updated_at = NOW()
      WHERE id = ${automationId}
        AND owner_user_id = ${ownerUserId}
      RETURNING *
    `,
  );

  return rows.length > 0 ? mapAgentAutomationRow(rows[0]) : null;
};

export const deleteAgentAutomation = async (
  automationId: string,
  ownerUserId: string,
): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      DELETE FROM agent_automations
      WHERE id = ${automationId}
        AND owner_user_id = ${ownerUserId}
      RETURNING id
    `,
  );

  return rows.length > 0;
};
