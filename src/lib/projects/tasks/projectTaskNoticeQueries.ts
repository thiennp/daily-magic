import { asRowArray, getSql } from "@/lib/db";
import type { ProjectTaskDependent } from "@/lib/projects/tasks/buildProjectTaskChangeNotices";
import type { ProjectTaskStatus } from "@/lib/projects/tasks/projectTaskTools.constant";

export type ProjectTaskNoticeSeat = {
  readonly id: string;
  readonly userId: string;
  readonly projectDisplayName: string | null;
};

/** Tasks of this project that list `taskId` in depends_on. */
export const listProjectTaskDependents = async (input: {
  readonly projectId: string;
  readonly taskId: string;
}): Promise<readonly ProjectTaskDependent[]> => {
  const rows = asRowArray(
    await getSql()`
      SELECT title, status, owner_membership_id
      FROM project_task_records
      WHERE project_id = ${input.projectId}
        AND ${input.taskId} = ANY(depends_on)
    `,
  );
  return rows.map((row) => ({
    title: String(row.title ?? ""),
    status: String(row.status) as ProjectTaskStatus,
    ownerMembershipId:
      typeof row.owner_membership_id === "string"
        ? row.owner_membership_id
        : null,
  }));
};

/** Active seats of this project among `ids` (id → user + nickname). */
export const loadActiveProjectTaskNoticeSeats = async (input: {
  readonly projectId: string;
  readonly ids: readonly string[];
}): Promise<ReadonlyMap<string, ProjectTaskNoticeSeat>> => {
  if (input.ids.length === 0) return new Map();
  const rows = asRowArray(
    await getSql()`
      SELECT id, user_id, project_display_name
      FROM project_memberships
      WHERE project_id = ${input.projectId}
        AND status = 'active'
        AND id = ANY(${[...input.ids]})
    `,
  );
  return new Map(
    rows.map((row) => [
      String(row.id),
      {
        id: String(row.id),
        userId: String(row.user_id),
        projectDisplayName:
          typeof row.project_display_name === "string"
            ? row.project_display_name
            : null,
      },
    ]),
  );
};
