import { asRowArray, getSql } from "@/lib/db";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

/** Task with its owner seat display name filled in (null owner: unchanged). */
export const withProjectTaskOwnerName = async (
  task: ProjectTaskRecord,
): Promise<ProjectTaskRecord> => {
  if (task.ownerMembershipId === null) return task;
  const rows = asRowArray(
    await getSql()`
      SELECT project_display_name FROM project_memberships
      WHERE id = ${task.ownerMembershipId} AND project_id = ${task.projectId}
      LIMIT 1
    `,
  );
  const name = rows[0]?.project_display_name;
  return { ...task, ownerDisplayName: typeof name === "string" ? name : null };
};
