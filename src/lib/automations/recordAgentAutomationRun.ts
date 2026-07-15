import type { AgentAutomationLastRunStatusValue } from "@/lib/automations/AgentAutomationLastRunStatus.constant";
import { AGENT_AUTOMATION_TRIGGER_TYPES } from "@/lib/automations/AgentAutomationTriggerType.constant";
import { computeNextScheduleRun } from "@/lib/automations/computeNextScheduleRun";
import mapAgentAutomationRow from "@/lib/automations/mapAgentAutomationRow";
import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export const linkAgentRunToAutomation = async (
  agentRunId: string,
  automationId: string,
): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE agent_runs
    SET automation_id = ${automationId}
    WHERE id = ${agentRunId}
  `;
};

export const recordAgentAutomationRun = async (input: {
  readonly automationId: string;
  readonly status: AgentAutomationLastRunStatusValue;
  readonly errorMessage?: string | null;
  readonly automation: AgentAutomationRecord;
}): Promise<AgentAutomationRecord> => {
  const sql = getSql();
  const nextRunAt =
    input.automation.triggerType === AGENT_AUTOMATION_TRIGGER_TYPES.SCHEDULE &&
    input.automation.schedulePreset !== null
      ? computeNextScheduleRun({
          preset: input.automation.schedulePreset,
          scheduleHour: input.automation.scheduleHour,
          timeZone: input.automation.scheduleTimezone,
        }).toISOString()
      : input.automation.nextRunAt;

  const rows = asRowArray(
    await sql`
      UPDATE agent_automations
      SET
        last_run_at = NOW(),
        last_run_status = ${input.status},
        last_error = ${input.errorMessage ?? null},
        next_run_at = ${nextRunAt},
        updated_at = NOW()
      WHERE id = ${input.automationId}
      RETURNING *
    `,
  );

  return mapAgentAutomationRow(rows[0]);
};
