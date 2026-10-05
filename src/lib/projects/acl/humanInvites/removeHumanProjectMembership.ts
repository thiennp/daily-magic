import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { decideHumanMembershipTransition } from "@/lib/projects/acl/humanInvites/decideHumanMembershipTransition";
import mapProjectMembershipRow from "@/lib/projects/acl/mapProjectMembershipRow";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { asRowArray, getSql } from "@/lib/db";

export type RemoveHumanMembershipResult =
  | { readonly ok: true; readonly membership: ProjectMembershipRecord }
  | {
      readonly ok: false;
      readonly code: "not_found" | "forbidden" | "not_active";
    };

/** Owner removes an active human seat (member_kind=human). */
export const removeHumanProjectMembership = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly ownerUserId: string;
}): Promise<RemoveHumanMembershipResult> => {
  const access = await authorizeProjectOwner({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
  });
  if (!access.allow) {
    return { ok: false, code: access.reason };
  }
  if (decideHumanMembershipTransition({ from: "active", event: "remove" }) === null) {
    return { ok: false, code: "not_active" };
  }
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE project_memberships
      SET status = 'revoked', revoked_at = NOW()
      WHERE id = ${input.membershipId}
        AND project_id = ${input.projectId}
        AND status = 'active'
        AND member_kind = 'human'
        AND role IN ('member', 'viewer')
      RETURNING *
    `,
  );
  if (rows.length === 0) {
    return { ok: false, code: "not_active" };
  }
  return { ok: true, membership: mapProjectMembershipRow(rows[0]) };
};
