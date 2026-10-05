import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { ensureProjectComputerMembershipSchema } from "@/lib/projects/acl/ensureProjectComputerMembershipSchema";
import mapProjectMembershipRow from "@/lib/projects/acl/mapProjectMembershipRow";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export const listProjectMembershipsForProject = async (
  projectId: string,
): Promise<readonly ProjectMembershipRecord[]> => {
  await ensureProjectAclSchema();
  await ensureProjectComputerMembershipSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM project_memberships
      WHERE project_id = ${projectId}
        AND status = 'active'
      ORDER BY created_at ASC
    `,
  );
  return rows.map((row) => mapProjectMembershipRow(row));
};
