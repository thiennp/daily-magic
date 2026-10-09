import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectInviteRow from "@/lib/projects/acl/invites/mapProjectInviteRow";
import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { isActiveMemberInviteCreator } from "@/lib/projects/acl/invites/isActiveMemberInviteCreator";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type RevokeProjectInviteResult =
  | { readonly ok: true; readonly invite: ProjectInviteRecord }
  | {
      readonly ok: false;
      readonly code:
        "not_found" | "forbidden" | "already_revoked" | "exhausted";
    };

/** `ownerUserId` is the acting user: the owner, or the member who created the invite. */
export const revokeProjectInvite = async (input: {
  readonly projectId: string;
  readonly inviteId: string;
  readonly ownerUserId: string;
}): Promise<RevokeProjectInviteResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  await ensureProjectAclSchema();
  const sql = getSql();
  if (
    project.ownerUserId !== input.ownerUserId &&
    !(await isActiveMemberInviteCreator(input))
  ) {
    return { ok: false, code: "forbidden" };
  }
  const rows = asRowArray(
    await sql`
      UPDATE project_invites
      SET revoked_at = NOW(), token_ciphertext = NULL, token_iv = NULL
      WHERE id = ${input.inviteId}
        AND project_id = ${input.projectId}
        AND revoked_at IS NULL
      RETURNING *
    `,
  );
  if (rows.length === 0) {
    const existing = asRowArray(
      await sql`
        SELECT * FROM project_invites
        WHERE id = ${input.inviteId} AND project_id = ${input.projectId}
        LIMIT 1
      `,
    );
    if (existing.length === 0) {
      return { ok: false, code: "not_found" };
    }
    return { ok: false, code: "already_revoked" };
  }
  const invite = mapProjectInviteRow(rows[0]);
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    action: "invite.revoke",
    detail: { inviteId: invite.id },
  });
  return { ok: true, invite };
};
