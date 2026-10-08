import { asRowArray, getSql } from "@/lib/db";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import { afterProjectTaskWrite } from "@/lib/projects/tasks/afterProjectTaskWrite";
import { ensureProjectTaskRecordsSchema } from "@/lib/projects/tasks/ensureProjectTaskRecordsSchema";
import { mapAgentRunToTaskStatus } from "@/lib/projects/tasks/mapAgentRunToTaskStatus";
import { mapProjectTaskRecordRow } from "@/lib/projects/tasks/mapProjectTaskRecordRow";

const TITLE_MAX_CHARS = 120;

const titleFromSummary = (summary: string): string =>
  (summary.trim().split("\n")[0] ?? "").trim().slice(0, TITLE_MAX_CHARS) ||
  "Assigned task";

/**
 * Link a dispatched run to a task record: an existing one (taskRecordId, same
 * project) or a new In progress record titled by the first line of the text.
 * Best effort: a failure here must never fail the dispatch.
 */
export const linkDispatchedRunToTaskRecord = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly agentRunId: string;
  readonly summary: string;
  readonly assigneeMembershipId: string | null;
  readonly taskRecordId: string | null;
}): Promise<void> => {
  try {
    await ensureProjectTaskRecordsSchema();
    const sql = getSql();
    const rows =
      input.taskRecordId !== null
        ? asRowArray(
            await sql`
              UPDATE project_task_records
              SET agent_run_id = ${input.agentRunId}, status = 'in_progress',
                  started_at = COALESCE(started_at, NOW()), updated_at = NOW()
              WHERE id = ${input.taskRecordId}
                AND project_id = ${input.projectId}
                AND status NOT IN ('cancelled', 'done')
              RETURNING *`,
          )
        : asRowArray(
            await sql`
              INSERT INTO project_task_records (
                project_id, created_by_user_id, owner_membership_id,
                title, status, agent_run_id, started_at
              ) VALUES (
                ${input.projectId}, ${input.actorUserId},
                ${input.assigneeMembershipId},
                ${titleFromSummary(input.summary)}, 'in_progress',
                ${input.agentRunId}, NOW()
              ) RETURNING *`,
          );
    if (rows[0] !== undefined) {
      await afterProjectTaskWrite({
        task: mapProjectTaskRecordRow(rows[0]),
        origin: "local",
      });
    }
  } catch {
    // Task board link is secondary to the dispatch itself.
  }
};

/** Move the task linked to this run to match its new status (best effort). */
export const syncProjectTaskWithRun = async (input: {
  readonly runId: string;
  readonly status: AgentRunStatusValue;
  readonly exitCode?: number | null;
  readonly reason?: string | null;
}): Promise<void> => {
  const next = mapAgentRunToTaskStatus(input);
  if (next === null) return;
  try {
    await ensureProjectTaskRecordsSchema();
    const rows = asRowArray(
      await getSql()`
        UPDATE project_task_records SET
          status = ${next.status},
          description = CASE WHEN ${next.status} = 'blocked'
            THEN ${next.note} ELSE description END,
          started_at = CASE WHEN ${next.status} = 'in_progress'
            THEN COALESCE(started_at, NOW()) ELSE started_at END,
          blocked_at = CASE WHEN ${next.status} = 'blocked'
            THEN NOW() ELSE blocked_at END,
          done_at = CASE WHEN ${next.status} = 'done'
            THEN COALESCE(done_at, NOW()) ELSE done_at END,
          updated_at = NOW()
        WHERE agent_run_id = ${input.runId} AND status <> 'cancelled'
        RETURNING *`,
    );
    for (const row of rows) {
      await afterProjectTaskWrite({
        task: mapProjectTaskRecordRow(row),
        origin: "local",
      });
    }
  } catch {
    // Run status handling must not fail because the board could not follow.
  }
};
