import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectComputerMembershipSchema } from "@/lib/projects/acl/ensureProjectComputerMembershipSchema";

/** Owner, active human member, or this Mac's active computer seat may post candidates. */
export const canUserSubmitProjectKnowledgeCandidate = async (input: {
  readonly projectId: string;
  readonly userId: string;
  readonly deviceId?: string | null;
}): Promise<boolean> => {
  const projectId = input.projectId.trim();
  const userId = input.userId.trim();
  if (projectId.length === 0 || userId.length === 0) {
    return false;
  }

  const sql = getSql();
  const ownerRows = asRowArray(
    await sql`
      SELECT id
      FROM user_projects
      WHERE id = ${projectId}
        AND owner_user_id = ${userId}
      LIMIT 1
    `,
  );
  if (ownerRows.length > 0) {
    return true;
  }

  const humanMemberRows = asRowArray(
    await sql`
      SELECT project_id
      FROM project_memberships
      WHERE project_id = ${projectId}
        AND user_id = ${userId}
        AND member_kind = 'human'
        AND status = 'active'
      LIMIT 1
    `,
  );
  if (humanMemberRows.length > 0) {
    return true;
  }

  const deviceId = input.deviceId?.trim() ?? "";
  if (deviceId.length === 0) {
    return false;
  }

  await ensureProjectComputerMembershipSchema();
  const computerRows = asRowArray(
    await sql`
      SELECT m.id
      FROM project_memberships AS m
      JOIN agent_witch_devices AS d ON d.id = m.device_id
      WHERE m.project_id = ${projectId}
        AND m.device_id = ${deviceId}
        AND m.member_kind = 'computer'
        AND m.status = 'active'
        AND d.revoked_at IS NULL
      LIMIT 1
    `,
  );
  return computerRows.length > 0;
};
