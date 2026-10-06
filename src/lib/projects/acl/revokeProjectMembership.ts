import { clearStickyOnMembershipLeave } from "@/lib/projects/acl/composer/clearStickyOnMembershipLeave";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectMembershipRow from "@/lib/projects/acl/mapProjectMembershipRow";
import { purgeProjectMembershipData } from "@/lib/projects/acl/purgeProjectMembershipData";
import { revokeProjectApiKeysForMembership } from "@/lib/projects/acl/projectApiKeys/revokeProjectApiKeysForMembership";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type RevokeProjectMembershipResult =
  | { readonly ok: true; readonly membership: ProjectMembershipRecord }
  | {
      readonly ok: false;
      readonly code: "not_found" | "forbidden" | "not_active";
    };

export const revokeProjectMembership = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly ownerUserId: string;
}): Promise<RevokeProjectMembershipResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId !== input.ownerUserId) {
    return { ok: false, code: "forbidden" };
  }

  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE project_memberships
      SET status = 'revoked', revoked_at = NOW()
      WHERE id = ${input.membershipId}
        AND project_id = ${input.projectId}
        AND status IN ('active', 'naming_required')
        AND role = 'member'
      RETURNING *
    `,
  );
  if (rows.length === 0) {
    return { ok: false, code: "not_active" };
  }
  const membership = mapProjectMembershipRow(rows[0]);
  await purgeProjectMembershipData({
    projectId: input.projectId,
    membership,
  });
  await clearStickyOnMembershipLeave({
    projectId: input.projectId,
    membershipId: membership.id,
    displayName: membership.projectDisplayName,
  });
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    action: "webhook.disable",
    targetUserId: membership.userId,
    detail: { membershipId: membership.id },
  });
  await revokeProjectApiKeysForMembership({
    projectId: input.projectId,
    membershipId: membership.id,
    actorUserId: input.ownerUserId,
    targetUserId: membership.userId,
  });
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    action: "revoke",
    targetUserId: membership.userId,
    targetLabel: membership.projectDisplayName,
    detail: { membershipId: membership.id, memberKind: membership.memberKind ?? "bot" },
  });
  return { ok: true, membership };
};
