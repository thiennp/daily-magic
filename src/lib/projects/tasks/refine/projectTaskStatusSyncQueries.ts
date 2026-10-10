import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectTaskRefinementSchema } from "@/lib/projects/tasks/refine/ensureProjectTaskRefinementSchema";

/**
 * Set a task's status directly (parent roll-up, claim start, unblock): these
 * moves are derived, not user edits, so they skip the edit FSM. A cancelled
 * task is never touched. Returns true when the row changed.
 */
export const setProjectTaskStatusDerived = async (input: {
  readonly projectId: string;
  readonly taskId: string;
  readonly status: string;
}): Promise<boolean> => {
  await ensureProjectTaskRefinementSchema();
  const rows = asRowArray(
    await getSql()`
      UPDATE project_task_records SET
        status = ${input.status},
        started_at = CASE WHEN ${input.status} = 'in_progress'
          THEN COALESCE(started_at, NOW()) ELSE started_at END,
        blocked_at = CASE WHEN ${input.status} = 'blocked' THEN NOW() ELSE blocked_at END,
        done_at = CASE WHEN ${input.status} = 'done'
          THEN COALESCE(done_at, NOW()) ELSE done_at END,
        updated_at = NOW()
      WHERE id = ${input.taskId} AND project_id = ${input.projectId}
        AND status <> ${input.status} AND status <> 'cancelled'
      RETURNING id`,
  );
  return rows.length > 0;
};

export const loadProjectTaskParentId = async (
  taskId: string,
): Promise<string | null> => {
  await ensureProjectTaskRefinementSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT parent_task_id FROM project_task_refinement WHERE task_id = ${taskId}`,
  );
  const parent = rows[0]?.parent_task_id;
  return typeof parent === "string" ? parent : null;
};
