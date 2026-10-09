import { asRowArray, getSql } from "@/lib/db";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";

/** A member (not a viewer) may revoke an invite they created themselves. */
export const isActiveMemberInviteCreator = async (input: {
  readonly projectId: string;
  readonly inviteId: string;
  readonly ownerUserId: string;
}): Promise<boolean> => {
  const seat = await getActiveProjectMembership(
    input.projectId,
    input.ownerUserId,
  );
  if (seat === null || seat.memberKind !== "human" || seat.role !== "member") {
    return false;
  }
  const rows = asRowArray(
    await getSql()`
      SELECT 1 FROM project_invites
      WHERE id = ${input.inviteId} AND project_id = ${input.projectId}
        AND created_by_user_id = ${input.ownerUserId}
      LIMIT 1
    `,
  );
  return rows.length > 0;
};
