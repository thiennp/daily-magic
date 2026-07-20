import { AGENT_AUTOMATION_TRIGGER_TYPES } from "@/lib/automations/AgentAutomationTriggerType.constant";
import { computeNextScheduleRun } from "@/lib/automations/computeNextScheduleRun";
import { buildAutomationDispatchPrompt } from "@/lib/automations/buildAutomationDispatchPrompt";
import mapAgentAutomationRow from "@/lib/automations/mapAgentAutomationRow";
import type { UpdateAgentAutomationInput } from "@/lib/automations/parseAgentAutomationBody";
import { prepareAutomationFieldValues } from "@/lib/automations/prepareAutomationFieldValues";
import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";
import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";
import { asRowArray, getSql } from "@/lib/db";

export type UpdateAgentAutomationOutcome =
  | { readonly kind: "updated"; readonly automation: AgentAutomationRecord }
  | { readonly kind: "not_found" }
  | { readonly kind: "validation_error"; readonly errorMessage: string };

export const updateAgentAutomation = async (
  automationId: string,
  ownerUserId: string,
  input: UpdateAgentAutomationInput,
): Promise<UpdateAgentAutomationOutcome> => {
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
    return { kind: "not_found" };
  }

  const existing = mapAgentAutomationRow(existingRows[0]);
  const name = input.name ?? existing.name;
  const deviceId =
    input.deviceId !== undefined ? input.deviceId : existing.deviceId;
  const schedulePreset = input.schedulePreset ?? existing.schedulePreset;
  const scheduleHour = input.scheduleHour ?? existing.scheduleHour;
  const scheduleTimezone = input.scheduleTimezone ?? existing.scheduleTimezone;
  const fieldValues = input.fieldValues ?? existing.fieldValues;
  const projectId =
    input.projectId !== undefined ? input.projectId : existing.projectId;
  const enabled = input.enabled ?? existing.enabled;
  const capability = await getPublishedCapabilityById(existing.capabilityId);

  if (capability === null) {
    return { kind: "not_found" };
  }

  const prepared = await prepareAutomationFieldValues({
    ownerUserId,
    capability,
    fieldValues,
    projectId,
  });

  if (!prepared.ok) {
    return { kind: "validation_error", errorMessage: prepared.errorMessage };
  }

  const localPrompt = buildAutomationDispatchPrompt(
    capability,
    prepared.fieldValues,
  );
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
        field_values = ${JSON.stringify(prepared.fieldValues)}::jsonb,
        project_id = ${prepared.projectId},
        local_prompt = ${localPrompt},
        enabled = ${enabled},
        next_run_at = ${nextRunAt},
        updated_at = NOW()
      WHERE id = ${automationId}
        AND owner_user_id = ${ownerUserId}
      RETURNING *
    `,
  );

  return rows.length > 0
    ? { kind: "updated", automation: mapAgentAutomationRow(rows[0]) }
    : { kind: "not_found" };
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
