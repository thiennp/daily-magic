import { randomUUID } from "node:crypto";

import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { buildProjectInviteUrl } from "@/lib/projects/acl/invites/buildProjectInviteUrl";
import {
  createProjectInviteToken,
  hashProjectInviteToken,
} from "@/lib/projects/acl/invites/hashProjectInviteToken";
import mapProjectInviteRow from "@/lib/projects/acl/invites/mapProjectInviteRow";
import {
  PROJECT_INVITE_DEFAULT_EXPIRES_DAYS,
  PROJECT_INVITE_DEFAULT_MAX_USES,
  PROJECT_INVITE_HARD_MAX_EXPIRES_DAYS,
  PROJECT_INVITE_HARD_MAX_USES,
} from "@/lib/projects/acl/invites/projectInvite.constants";
import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";
import {
  isProjectAclScope,
  PROJECT_ACL_DEFAULT_MEMBER_SCOPES,
  type ProjectAclScope,
} from "@/lib/projects/acl/projectAclScopes.constant";
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

const clampMaxUses = (raw: unknown): number => {
  if (typeof raw !== "number" || !Number.isFinite(raw)) {
    return PROJECT_INVITE_DEFAULT_MAX_USES;
  }
  const n = Math.floor(raw);
  if (n < 1) return PROJECT_INVITE_DEFAULT_MAX_USES;
  return Math.min(n, PROJECT_INVITE_HARD_MAX_USES);
};

const clampExpiresDays = (raw: unknown): number => {
  if (typeof raw !== "number" || !Number.isFinite(raw)) {
    return PROJECT_INVITE_DEFAULT_EXPIRES_DAYS;
  }
  const n = Math.floor(raw);
  if (n < 1) return PROJECT_INVITE_DEFAULT_EXPIRES_DAYS;
  return Math.min(n, PROJECT_INVITE_HARD_MAX_EXPIRES_DAYS);
};

const parseScopes = (raw: unknown): readonly ProjectAclScope[] => {
  if (!Array.isArray(raw)) {
    return PROJECT_ACL_DEFAULT_MEMBER_SCOPES;
  }
  const filtered = raw.filter(
    (item): item is ProjectAclScope =>
      typeof item === "string" && isProjectAclScope(item),
  );
  return filtered.length > 0 ? filtered : PROJECT_ACL_DEFAULT_MEMBER_SCOPES;
};

export const createProjectInvite = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly teamLabel?: string | null;
  readonly scopes?: unknown;
  readonly maxUses?: unknown;
  readonly expiresInDays?: unknown;
}): Promise<CreateProjectInviteResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId !== input.ownerUserId) {
    return { ok: false, code: "forbidden" };
  }

  const maxUses = clampMaxUses(input.maxUses);
  const expiresInDays = clampExpiresDays(input.expiresInDays);
  const scopes = parseScopes(input.scopes);
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
        max_uses, uses_remaining, expires_at
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
        ${expiresAt}::timestamptz
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
    },
  });
  return {
    ok: true,
    invite,
    url: buildProjectInviteUrl(token),
    token,
  };
};
