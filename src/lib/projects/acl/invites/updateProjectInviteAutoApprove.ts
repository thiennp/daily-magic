import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectInviteRow from "@/lib/projects/acl/invites/mapProjectInviteRow";
import { recordProjectInviteAutoApproveEvent } from "@/lib/projects/acl/invites/recordProjectInviteAutoApproveEvent";
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

/** Owner-only toggle. Affects future redeems only. Writes history only on change. */
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
  const next = input.autoApprove === true;
  const rows = asRowArray(
    await sql`
      UPDATE project_invites
      SET auto_approve = ${next}
      WHERE id = ${input.inviteId}
        AND project_id = ${input.projectId}
        AND revoked_at IS NULL
        AND auto_approve IS DISTINCT FROM ${next}
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
    const current = mapProjectInviteRow(existing[0]);
    if (current.revokedAt !== null) {
      return { ok: false, code: "revoked" };
    }
    // Same value — no history row.
    return { ok: true, invite: current };
  }
  const invite = mapProjectInviteRow(rows[0]);
  const label = invite.id.slice(0, 8);
  const event = next ? ("enabled" as const) : ("disabled" as const);
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    action: next ? "invite.auto_approve_on" : "invite.auto_approve_off",
    detail: { inviteId: invite.id, label },
  });
  await recordProjectInviteAutoApproveEvent({
    projectId: input.projectId,
    inviteId: invite.id,
    event,
    actorUserId: input.ownerUserId,
  });
  return { ok: true, invite };
};
