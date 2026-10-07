import { randomUUID } from "node:crypto";

import { BOT_PROJECT_INVITE_MAX_USES } from "@/lib/projects/acl/invites/botInvites/botProjectInvite.constants";
import mapProjectInviteRow from "@/lib/projects/acl/invites/mapProjectInviteRow";
import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";
import type { ProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";
import { asRowArray, getSql } from "@/lib/db";

/**
 * One bot-made invite row: single-use, auto_approve FALSE (the owner-only
 * checkbox is never set here), no token ciphertext (the owner never needs to
 * Copy it; the inviting bot already holds the code), bound to the owner.
 */
export const insertBotProjectInviteRow = async (input: {
  readonly projectId: string;
  readonly inviterUserId: string;
  readonly inviterMembershipId: string;
  readonly boundOwnerUserId: string;
  readonly tokenHash: string;
  readonly teamLabel: string | null;
  readonly scopes: readonly ProjectAclScope[];
  readonly expiresAt: string;
  readonly platform: string | null;
}): Promise<ProjectInviteRecord | null> => {
  const rows = asRowArray(
    await getSql()`
      INSERT INTO project_invites (
        id, project_id, created_by_user_id, token_hash, team_label, scopes,
        max_uses, uses_remaining, expires_at, auto_approve, platform,
        created_by_membership_id, bound_owner_user_id
      )
      VALUES (
        ${randomUUID()},
        ${input.projectId},
        ${input.inviterUserId},
        ${input.tokenHash},
        ${input.teamLabel},
        ${[...input.scopes]},
        ${BOT_PROJECT_INVITE_MAX_USES},
        ${BOT_PROJECT_INVITE_MAX_USES},
        ${input.expiresAt}::timestamptz,
        FALSE,
        ${input.platform},
        ${input.inviterMembershipId},
        ${input.boundOwnerUserId}
      )
      RETURNING *
    `,
  );
  return rows.length === 0 ? null : mapProjectInviteRow(rows[0]);
};
