import type { BlockedOn, EffortTier } from "@agent-witch/shared/taskRefinement";

import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectTaskRefinementSchema } from "@/lib/projects/tasks/refine/ensureProjectTaskRefinementSchema";
import { mapProjectTaskRefinementRow } from "@/lib/projects/tasks/refine/mapProjectTaskRefinementRow";
import type { ProjectTaskRefinement } from "@/lib/projects/tasks/refine/projectTaskRefinement.type";

export const loadProjectTaskRefinement = async (
  taskId: string,
): Promise<ProjectTaskRefinement | null> => {
  await ensureProjectTaskRefinementSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT * FROM project_task_refinement WHERE task_id = ${taskId}`,
  );
  return rows[0] === undefined ? null : mapProjectTaskRefinementRow(rows[0]);
};

export const insertProjectTaskRefinement = async (input: {
  readonly taskId: string;
  readonly projectId: string;
  readonly parentTaskId: string;
  readonly skillId: string | null;
  readonly skillParams: Readonly<Record<string, unknown>>;
  readonly effortTier: EffortTier;
  readonly blockedOn: BlockedOn | null;
}): Promise<void> => {
  await ensureProjectTaskRefinementSchema();
  await getSql()`
    INSERT INTO project_task_refinement (
      task_id, project_id, parent_task_id, skill_id, skill_params,
      effort_tier, blocked_on, block_count
    ) VALUES (
      ${input.taskId}, ${input.projectId}, ${input.parentTaskId}, ${input.skillId},
      ${JSON.stringify(input.skillParams)}::jsonb, ${input.effortTier},
      ${input.blockedOn}, ${input.blockedOn === null ? 0 : 1}
    )
    ON CONFLICT (task_id) DO NOTHING`;
};

export type ProjectTaskChildRow = {
  readonly taskId: string;
  readonly title: string;
  readonly status: string;
  readonly skillId: string | null;
  readonly skillParams: Readonly<Record<string, unknown>>;
};

export const listProjectTaskChildren = async (
  parentTaskId: string,
): Promise<readonly ProjectTaskChildRow[]> => {
  await ensureProjectTaskRefinementSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT r.task_id, r.skill_id, r.skill_params, t.title, t.status
      FROM project_task_refinement r
      JOIN project_task_records t ON t.id = r.task_id
      WHERE r.parent_task_id = ${parentTaskId}
      ORDER BY t.created_at, t.id`,
  );
  return rows.map((row) => ({
    taskId: String(row.task_id),
    title: String(row.title),
    status: String(row.status),
    skillId: typeof row.skill_id === "string" ? row.skill_id : null,
    skillParams: mapProjectTaskRefinementRow(row).skillParams,
  }));
};
