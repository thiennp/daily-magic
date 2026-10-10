import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectTaskRefinementSchema } from "@/lib/projects/tasks/refine/ensureProjectTaskRefinementSchema";

export type SkillBlockedTask = {
  readonly taskId: string;
  readonly parentTaskId: string | null;
  readonly title: string;
  readonly blockCount: number;
  readonly blockedAt: string | null;
};

export const listSkillBlockedTasks = async (
  projectId: string,
): Promise<readonly SkillBlockedTask[]> => {
  await ensureProjectTaskRefinementSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT r.task_id, r.parent_task_id, r.block_count, t.title, t.blocked_at
      FROM project_task_refinement r
      JOIN project_task_records t ON t.id = r.task_id
      WHERE r.project_id = ${projectId} AND r.blocked_on = 'skill'
        AND t.status = 'blocked'
      ORDER BY t.blocked_at, t.id`,
  );
  return rows.map((row) => ({
    taskId: String(row.task_id),
    parentTaskId:
      typeof row.parent_task_id === "string" ? row.parent_task_id : null,
    title: String(row.title),
    blockCount: Number(row.block_count ?? 0),
    blockedAt:
      row.blocked_at instanceof Date ? row.blocked_at.toISOString() : null,
  }));
};

/** Skill blocks older than `hours` are handed to a person. Returns the task ids. */
export const handOffStaleSkillBlocks = async (input: {
  readonly projectId: string;
  readonly hours: number;
}): Promise<readonly string[]> => {
  await ensureProjectTaskRefinementSchema();
  const rows = asRowArray(
    await getSql()`
      UPDATE project_task_refinement r SET blocked_on = 'user', updated_at = NOW()
      FROM project_task_records t
      WHERE t.id = r.task_id AND r.project_id = ${input.projectId}
        AND r.blocked_on = 'skill' AND t.status = 'blocked'
        AND t.blocked_at < NOW() - make_interval(hours => ${input.hours}::int)
      RETURNING r.task_id`,
  );
  return rows.map((row) => String(row.task_id));
};

/** A matching skill now exists: point the task at it and clear the block. */
export const clearSkillBlock = async (input: {
  readonly taskId: string;
  readonly skillId: string;
}): Promise<void> => {
  await ensureProjectTaskRefinementSchema();
  await getSql()`
    UPDATE project_task_refinement SET
      skill_id = ${input.skillId}, effort_tier = 'script',
      blocked_on = NULL, updated_at = NOW()
    WHERE task_id = ${input.taskId}`;
};
