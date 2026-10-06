import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectInviteRow from "@/lib/projects/acl/invites/mapProjectInviteRow";
import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type UpdateProjectInviteAutoApproveResult =
  | { readonly ok: true; readonly invite: ProjectInviteRecord }
  | {
      readonly ok: false;
      readonly code: "not_found" | "forbidden" | "revoked";
    };

/** Owner-only toggle. Affects future redeems only. */
export const updateProjectInviteAutoApprove = async (input: {
  readonly projectId: string;
  readonly inviteId: string;
  readonly ownerUserId: string;
  readonly autoApprove: boolean;
}): Promise<UpdateProjectInviteAutoApproveResult> => {
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
      UPDATE project_invites
      SET auto_approve = ${input.autoApprove === true}
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
      `,
    );
    if (existing.length === 0) {
      return { ok: false, code: "not_found" };
    }
    return { ok: false, code: "revoked" };
  }
  const invite = mapProjectInviteRow(rows[0]);
  const label = invite.id.slice(0, 8);
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    action: input.autoApprove
      ? "invite.auto_approve_on"
      : "invite.auto_approve_off",
    detail: { inviteId: invite.id, label },
  });
  return { ok: true, invite };
};
