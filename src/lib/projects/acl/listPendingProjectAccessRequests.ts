import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectAccessRequestRow from "@/lib/projects/acl/mapProjectAccessRequestRow";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export const listPendingProjectAccessRequests = async (
  projectId: string,
): Promise<readonly ProjectAccessRequestRecord[]> => {
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM project_access_requests
      WHERE project_id = ${projectId}
        AND status = 'pending'
      ORDER BY created_at ASC
    `,
  );
  return rows.map((row) => mapProjectAccessRequestRow(row));
};
