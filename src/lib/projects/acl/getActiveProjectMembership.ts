import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectMembershipRow from "@/lib/projects/acl/mapProjectMembershipRow";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export const getActiveProjectMembership = async (
  projectId: string,
  userId: string,
): Promise<ProjectMembershipRecord | null> => {
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM project_memberships
      WHERE project_id = ${projectId}
        AND user_id = ${userId}
        AND status = 'active'
      LIMIT 1
    `,
  );
  if (rows.length === 0) {
    return null;
  }
  return mapProjectMembershipRow(rows[0]);
};
