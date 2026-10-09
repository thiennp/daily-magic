import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectTaskRecordsSchema } from "@/lib/projects/tasks/ensureProjectTaskRecordsSchema";
import { mapProjectTaskRecordRow } from "@/lib/projects/tasks/mapProjectTaskRecordRow";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import type { ProjectTaskStatus } from "@/lib/projects/tasks/projectTaskTools.constant";

/** Full meta snapshot written on insert/update (Neon meta only, no body). */
export type ProjectTaskRecordWrite = Pick<
  ProjectTaskRecord,
  | "title"
  | "description"
  | "resultSummary"
  | "priority"
  | "stage"
  | "tipSha"
  | "ownerMembershipId"
  | "dependsOn"
  | "planItemId"
> & { readonly status: ProjectTaskStatus };

export const insertProjectTaskRecord = async (input: {
  readonly projectId: string;
  readonly createdByUserId: string;
  readonly createdByMembershipId: string | null;
  readonly values: ProjectTaskRecordWrite;
}): Promise<ProjectTaskRecord> => {
  await ensureProjectTaskRecordsSchema();
  const v = input.values;
  const rows = asRowArray(
    await getSql()`
      INSERT INTO project_task_records (
        project_id, created_by_user_id, created_by_membership_id,
        owner_membership_id, title, description, result_summary, status, priority, stage,
        tip_sha, depends_on, plan_item_id, stage_times
      ) VALUES (
        ${input.projectId}, ${input.createdByUserId}, ${input.createdByMembershipId},
        ${v.ownerMembershipId}, ${v.title}, ${v.description}, ${v.resultSummary}, ${v.status},
        ${v.priority}, ${v.stage}, ${v.tipSha}, ${[...v.dependsOn]}, ${v.planItemId},
        CASE WHEN ${v.stage}::text IS NULL THEN '{}'::jsonb
             ELSE jsonb_build_object(${v.stage}::text, NOW()) END
      )
      RETURNING *
    `,
  );
  return mapProjectTaskRecordRow(rows[0] ?? {});
};

/**
 * Compare-and-set on the status AND updated_at read before deciding (null =
 * lost race: a concurrent status move or field edit; ms precision, as read).
 * Step times: started_at first in_progress, blocked_at latest block,
 * done_at on done, stage_times[stage] when the step changes.
 */
export const updateProjectTaskRecord = async (input: {
  readonly projectId: string;
  readonly taskId: string;
  readonly expectedStatus: ProjectTaskStatus;
  readonly expectedUpdatedAt: string;
  readonly values: ProjectTaskRecordWrite;
}): Promise<ProjectTaskRecord | null> => {
  const v = input.values;
  const rows = asRowArray(
    await getSql()`
      UPDATE project_task_records SET
        owner_membership_id = ${v.ownerMembershipId},
        title = ${v.title},
        description = ${v.description},
        result_summary = ${v.resultSummary},
        status = ${v.status},
        priority = ${v.priority},
        stage = ${v.stage},
        tip_sha = ${v.tipSha},
        depends_on = ${[...v.dependsOn]},
        plan_item_id = ${v.planItemId},
        started_at = CASE WHEN ${v.status} = 'in_progress'
          THEN COALESCE(started_at, NOW()) ELSE started_at END,
        blocked_at = CASE WHEN ${v.status} = 'blocked' AND status <> 'blocked'
          THEN NOW() ELSE blocked_at END,
        done_at = CASE WHEN ${v.status} = 'done'
          THEN COALESCE(done_at, NOW()) ELSE done_at END,
        cancelled_at = CASE WHEN ${v.status} = 'cancelled'
          THEN COALESCE(cancelled_at, NOW()) ELSE cancelled_at END,
        stage_times = CASE
          WHEN ${v.stage}::text IS NOT NULL AND stage IS DISTINCT FROM ${v.stage}::text
          THEN stage_times || jsonb_build_object(${v.stage}::text, NOW())
          ELSE stage_times END,
        updated_at = NOW()
      WHERE id = ${input.taskId}
        AND project_id = ${input.projectId}
        AND status = ${input.expectedStatus}
        AND date_trunc('milliseconds', updated_at) =
          date_trunc('milliseconds', ${input.expectedUpdatedAt}::timestamptz)
      RETURNING *
    `,
  );
  return rows[0] === undefined ? null : mapProjectTaskRecordRow(rows[0]);
};
