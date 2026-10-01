import { expireStaleProjectAccessRequestsForRequester } from "@/lib/projects/acl/expireStaleProjectAccessRequests";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type ProjectMembershipStatusView =
  "none" | "pending" | "active" | "revoked" | "owner";

export const checkProjectMembershipStatus = async (
  projectId: string,
  userId: string,
): Promise<ProjectMembershipStatusView> => {
  const project = await getUserProjectById(projectId);
  if (project === null) {
    return "none";
  }
  if (project.ownerUserId === userId) {
    return "owner";
  }

  const active = await getActiveProjectMembership(projectId, userId);
  if (active !== null) {
    return "active";
  }

  await expireStaleProjectAccessRequestsForRequester({
    projectId,
    requesterUserId: userId,
  });
  await ensureProjectAclSchema();
  const sql = getSql();
  const pending = asRowArray(
    await sql`
      SELECT id FROM project_access_requests
      WHERE project_id = ${projectId}
        AND requester_user_id = ${userId}
        AND status = 'pending'
        AND expires_at > NOW()
      LIMIT 1
    `,
  );
  if (pending.length > 0) {
    return "pending";
  }

  const revoked = asRowArray(
    await sql`
      SELECT id FROM project_memberships
      WHERE project_id = ${projectId}
        AND user_id = ${userId}
        AND status = 'revoked'
      ORDER BY revoked_at DESC NULLS LAST
      LIMIT 1
    `,
  );
  return revoked.length > 0 ? "revoked" : "none";
};
