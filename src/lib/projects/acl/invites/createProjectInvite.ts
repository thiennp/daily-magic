import { randomUUID } from "node:crypto";

import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { buildProjectInviteUrl } from "@/lib/projects/acl/invites/buildProjectInviteUrl";
import { parseProjectInvitePlatform } from "@/lib/projects/acl/invites/projectInvitePlatform.constant";
import {
  createProjectInviteToken,
  hashProjectInviteToken,
} from "@/lib/projects/acl/invites/hashProjectInviteToken";
import mapProjectInviteRow from "@/lib/projects/acl/invites/mapProjectInviteRow";
import type { CreateProjectInviteResult } from "@/lib/projects/acl/invites/types/CreateProjectInviteResult.type";
import {
  clampInviteExpiresDays,
  clampInviteMaxUses,
  parseInviteScopes,
} from "@/lib/projects/acl/invites/clampProjectInviteParams";
import { clearUnusableProjectInviteCiphertexts } from "@/lib/projects/acl/invites/clearUnusableProjectInviteCiphertexts";
import { tryEncryptProjectInviteToken } from "@/lib/projects/acl/invites/projectInviteTokenCipher";
import { auditProjectInviteCreated } from "@/lib/projects/acl/invites/auditProjectInviteCreated";
import { setProjectInviteIsolateBots } from "@/lib/projects/acl/invites/setProjectInviteIsolateBots";
import { resolveProjectInviteCreator } from "@/lib/projects/acl/invites/resolveProjectInviteCreator";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type { CreateProjectInviteResult };

export const createProjectInvite = async (input: {
  readonly projectId: string;
  /** The creating actor: the owner, or an active member (not viewer). */
  readonly ownerUserId: string;
  readonly teamLabel?: string | null;
  readonly scopes?: unknown;
  readonly maxUses?: unknown;
  readonly expiresInDays?: unknown;
  /** Owner opt-in; default false. Ignored for members (owner approves). */
  readonly autoApprove?: boolean;
  /** grok | muse; unknown → NULL. Drives the join-time delivery_mode. */
  readonly platform?: unknown;
  /** Checkbox: the joining bot may not message other people's bots. */
  readonly isolateBots?: boolean;
}): Promise<CreateProjectInviteResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  const creator = await resolveProjectInviteCreator(project, input.ownerUserId);
  if (!creator.ok) {
    return { ok: false, code: "forbidden" };
  }

  const maxUses = clampInviteMaxUses(input.maxUses);
  const expiresInDays = clampInviteExpiresDays(input.expiresInDays);
  const requestedScopes = parseInviteScopes(input.scopes);
  const scopes = creator.isOwner
    ? requestedScopes
    : requestedScopes.filter((s) => creator.grantableScopes.includes(s));
  const autoApprove = creator.isOwner && input.autoApprove === true;
  const teamLabel =
    typeof input.teamLabel === "string" && input.teamLabel.trim().length > 0
      ? input.teamLabel.trim().slice(0, 64)
      : null;
  const platform = parseProjectInvitePlatform(input.platform);

  const token = createProjectInviteToken();
  const tokenHash = hashProjectInviteToken(token);
  // 107: encrypted copy so the owner can Copy the prompt from any device.
  const encrypted = tryEncryptProjectInviteToken(token);
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
        max_uses, uses_remaining, expires_at, auto_approve, platform,
        token_ciphertext, token_iv
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
        ${autoApprove},
        ${platform},
        ${encrypted?.ciphertext ?? null},
        ${encrypted?.iv ?? null}
      )
      RETURNING *
    `,
  );
  if (rows.length === 0) {
    return { ok: false, code: "invalid" };
  }
  const invite = mapProjectInviteRow(rows[0]);
  if (input.isolateBots === true) await setProjectInviteIsolateBots(invite.id);
  await clearUnusableProjectInviteCiphertexts(input.projectId);
  await auditProjectInviteCreated({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    invite,
  });
  return {
    ok: true,
    invite,
    url: buildProjectInviteUrl(token),
    token,
  };
};
