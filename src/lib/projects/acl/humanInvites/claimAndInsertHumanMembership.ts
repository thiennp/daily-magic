import { randomUUID } from "node:crypto";

import { classifyClaimInsertError } from "@/lib/projects/acl/humanInvites/classifyClaimInsertError";
import { defaultHumanMembershipScopes } from "@/lib/projects/acl/humanInvites/defaultHumanMembershipScopes";
import { hashHumanInviteToken } from "@/lib/projects/acl/humanInvites/hashHumanInviteToken";
import type { HumanInviteRole } from "@/lib/projects/acl/humanInvites/humanInvite.constants";
import { HUMAN_INVITE_USABLE_WHERE_SQL } from "@/lib/projects/acl/humanInvites/humanInviteUsableSql.constant";
import mapHumanInviteRow from "@/lib/projects/acl/humanInvites/mapHumanInviteRow";
import type HumanInviteRecord from "@/lib/projects/acl/humanInvites/types/HumanInviteRecord.type";
import mapProjectMembershipRow from "@/lib/projects/acl/mapProjectMembershipRow";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { asRowArray, getSql } from "@/lib/db";

export type ClaimAndInsertHumanResult =
  | {
      readonly ok: true;
      readonly invite: HumanInviteRecord;
      readonly membership: ProjectMembershipRecord;
    }
  | {
      readonly ok: false;
      readonly code: "invalid_token" | "already_member" | "display_name_taken";
    };

/** Atomic claim + insert; email-lock predicate races with require_email_match. */
export const claimAndInsertHumanMembership = async (input: {
  readonly token: string;
  readonly claimantUserId: string;
  readonly claimantEmailNormalized: string | null;
  readonly projectDisplayName: string;
  readonly role: HumanInviteRole;
}): Promise<ClaimAndInsertHumanResult> => {
  const trimmed = input.token.trim();
  if (trimmed.length < 16) {
    return { ok: false, code: "invalid_token" };
  }
  await ensureProjectAclSchema();
  const sql = getSql();
  const tokenHash = hashHumanInviteToken(trimmed);
  const membershipId = randomUUID();
  const scopes = [...defaultHumanMembershipScopes(input.role)];
  const claimantEmail = input.claimantEmailNormalized ?? "";
  try {
    const rows = asRowArray(
      await sql`
        WITH claimed AS (
          UPDATE project_human_invites
          SET uses_remaining = uses_remaining - 1,
              redeemed_at = NOW(),
              redeemed_by_user_id = ${input.claimantUserId},
              status = 'approved',
              updated_at = NOW()
          WHERE token_hash = ${tokenHash}
            AND ${sql.unsafe(HUMAN_INVITE_USABLE_WHERE_SQL)}
            AND requires_approval IS NOT TRUE
            AND (
              require_email_match IS NOT TRUE
              OR lower(trim(email)) = ${claimantEmail}
            )
          RETURNING *
        ),
        inserted AS (
          INSERT INTO project_memberships (
            id, project_id, user_id, role, status, team_label, scopes,
            project_display_name, member_kind
          )
          SELECT
            ${membershipId},
            claimed.project_id,
            ${input.claimantUserId},
            ${input.role},
            'active',
            NULL,
            ${scopes},
            ${input.projectDisplayName},
            'human'
          FROM claimed
          RETURNING *
        )
        SELECT
          to_jsonb(claimed) AS invite_row,
          to_jsonb(inserted) AS member_row
        FROM claimed
        INNER JOIN inserted ON true
      `,
    );
    if (rows.length === 0) {
      return { ok: false, code: "invalid_token" };
    }
    const invitePayload = rows[0].invite_row;
    const memberPayload = rows[0].member_row;
    if (
      invitePayload === null ||
      typeof invitePayload !== "object" ||
      memberPayload === null ||
      typeof memberPayload !== "object"
    ) {
      return { ok: false, code: "invalid_token" };
    }
    return {
      ok: true,
      invite: mapHumanInviteRow(invitePayload as Record<string, unknown>),
      membership: mapProjectMembershipRow(
        memberPayload as Record<string, unknown>,
      ),
    };
  } catch (error) {
    const code = classifyClaimInsertError(error);
    if (code !== null) {
      return { ok: false, code };
    }
    throw error;
  }
};
