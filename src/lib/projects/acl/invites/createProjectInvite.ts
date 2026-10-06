import { randomUUID } from "node:crypto";

import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { buildProjectInviteUrl } from "@/lib/projects/acl/invites/buildProjectInviteUrl";
import {
  createProjectInviteToken,
  hashProjectInviteToken,
} from "@/lib/projects/acl/invites/hashProjectInviteToken";
import mapProjectInviteRow from "@/lib/projects/acl/invites/mapProjectInviteRow";
import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";
import {
  clampInviteExpiresDays,
  clampInviteMaxUses,
  parseInviteScopes,
} from "@/lib/projects/acl/invites/clampProjectInviteParams";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type CreateProjectInviteResult =
  | {
      readonly ok: true;
      readonly invite: ProjectInviteRecord;
      readonly url: string;
      readonly token: string;
    }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" | "invalid" };

export const createProjectInvite = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly teamLabel?: string | null;
  readonly scopes?: unknown;
  readonly maxUses?: unknown;
  readonly expiresInDays?: unknown;
  /** Owner opt-in; default false. Only the project owner can set this. */
  readonly autoApprove?: boolean;
}): Promise<CreateProjectInviteResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId !== input.ownerUserId) {
    return { ok: false, code: "forbidden" };
  }

  const maxUses = clampInviteMaxUses(input.maxUses);
  const expiresInDays = clampInviteExpiresDays(input.expiresInDays);
  const scopes = parseInviteScopes(input.scopes);
  const autoApprove = input.autoApprove === true;
  const teamLabel =
    typeof input.teamLabel === "string" && input.teamLabel.trim().length > 0
      ? input.teamLabel.trim().slice(0, 64)
      : null;

  const token = createProjectInviteToken();
  const tokenHash = hashProjectInviteToken(token);
  const inviteId = randomUUID();
  const expiresAt = new Date(
    Date.now() + expiresInDays * 24 * 60 * 60 * 1000,
  ).toISOString();

  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO project_invites (
        id, project_id, created_by_user_id, token_hash, team_label, scopes,
        max_uses, uses_remaining, expires_at, auto_approve
      )
      VALUES (
        ${inviteId},
        ${input.projectId},
        ${input.ownerUserId},
        ${tokenHash},
        ${teamLabel},
        ${[...scopes]},
        ${maxUses},
        ${maxUses},
        ${expiresAt}::timestamptz,
        ${autoApprove}
      )
      RETURNING *
    `,
  );
  if (rows.length === 0) {
    return { ok: false, code: "invalid" };
  }
  const invite = mapProjectInviteRow(rows[0]);
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    action: "invite.create",
    detail: {
      inviteId: invite.id,
      maxUses: invite.maxUses,
      expiresAt: invite.expiresAt,
      teamLabel: invite.teamLabel,
      autoApprove: invite.autoApprove,
    },
  });
  if (autoApprove) {
    await writeProjectAccessAudit({
      projectId: input.projectId,
      actorUserId: input.ownerUserId,
      action: "invite.auto_approve_on",
      detail: { inviteId: invite.id, label: invite.id.slice(0, 8) },
    });
  }
  return {
    ok: true,
    invite,
    url: buildProjectInviteUrl(token),
    token,
  };
};
