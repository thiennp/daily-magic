import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectTaskRecordsSchema } from "@/lib/projects/tasks/ensureProjectTaskRecordsSchema";
import { mapProjectTaskRecordRow } from "@/lib/projects/tasks/mapProjectTaskRecordRow";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import { PROJECT_TASK_LIST_LIMIT } from "@/lib/projects/tasks/projectTaskTools.constant";

/** Tasks tab list: newest first, owner seat display name joined (meta only). */
export const listProjectTaskRecords = async (
  projectId: string,
): Promise<readonly ProjectTaskRecord[]> => {
  await ensureProjectTaskRecordsSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT t.*, owner.project_display_name AS owner_display_name, run.last_run_heartbeat_at AS run_heartbeat_at
      FROM project_task_records t
      LEFT JOIN project_memberships owner ON owner.id = t.owner_membership_id
      LEFT JOIN agent_runs run ON run.id = t.agent_run_id AND run.status = 'running'
      WHERE t.project_id = ${projectId}
      ORDER BY t.created_at DESC, t.id DESC
      LIMIT ${PROJECT_TASK_LIST_LIMIT}
    `,
  );
  return rows.map(mapProjectTaskRecordRow);
};

/** One record of this project (null when missing or another project's). */
export const loadProjectTaskRecord = async (input: {
  readonly projectId: string;
  readonly taskId: string;
}): Promise<ProjectTaskRecord | null> => {
  await ensureProjectTaskRecordsSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT * FROM project_task_records
      WHERE id = ${input.taskId} AND project_id = ${input.projectId}
      LIMIT 1
    `,
  );
  return rows[0] === undefined ? null : mapProjectTaskRecordRow(rows[0]);
};

/** How many of `ids` are tasks of this project (dependsOn validation). */
export const countProjectTaskRecordsIn = async (input: {
  readonly projectId: string;
  readonly ids: readonly string[];
}): Promise<number> => {
  if (input.ids.length === 0) return 0;
  const rows = asRowArray(
    await getSql()`
      SELECT COUNT(*)::int AS c FROM project_task_records
      WHERE project_id = ${input.projectId} AND id = ANY(${[...input.ids]})
    `,
  );
  return Number(rows[0]?.c ?? 0);
};

/** All task records of a project (per-project row cap). */
export const countProjectTaskRecords = async (
  projectId: string,
): Promise<number> => {
  await ensureProjectTaskRecordsSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT COUNT(*)::int AS c FROM project_task_records WHERE project_id = ${projectId}
    `,
  );
  return Number(rows[0]?.c ?? 0);
};

/** Creates by this caller in the rolling hour + the oldest one (retry-after). */
export const loadProjectTaskHourlyCreates = async (input: {
  readonly creatorUserId: string;
}): Promise<{ readonly count: number; readonly oldestAt: Date | null }> => {
  await ensureProjectTaskRecordsSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT COUNT(*)::int AS c, MIN(created_at) AS oldest
      FROM project_task_records
      WHERE created_by_user_id = ${input.creatorUserId}
        AND created_at > NOW() - INTERVAL '1 hour'
    `,
  );
  const oldest = rows[0]?.oldest;
  return {
    count: Number(rows[0]?.c ?? 0),
    oldestAt:
      oldest instanceof Date
        ? oldest
        : typeof oldest === "string"
          ? new Date(oldest)
          : null,
  };
};

/** Active, non-viewer seat of this project (ownerBot check). */
export const isActiveProjectTaskOwnerSeat = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
}): Promise<boolean> => {
  const rows = asRowArray(
    await getSql()`
      SELECT 1 FROM project_memberships
      WHERE id = ${input.membershipId}
        AND project_id = ${input.projectId}
        AND status = 'active'
        AND role <> 'viewer'
      LIMIT 1
    `,
  );
  return rows.length > 0;
};
