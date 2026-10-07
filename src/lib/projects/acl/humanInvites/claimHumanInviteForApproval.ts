import { hashHumanInviteToken } from "@/lib/projects/acl/humanInvites/hashHumanInviteToken";
import { HUMAN_INVITE_ACCEPTED_USER_UNIQUE_IDX } from "@/lib/projects/acl/humanInvites/humanInviteEmail.constant";
import { HUMAN_INVITE_USABLE_WHERE_SQL } from "@/lib/projects/acl/humanInvites/humanInviteUsableSql.constant";
import mapHumanInviteRow from "@/lib/projects/acl/humanInvites/mapHumanInviteRow";
import type HumanInviteRecord from "@/lib/projects/acl/humanInvites/types/HumanInviteRecord.type";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { asRowArray, getSql } from "@/lib/db";

export type ClaimHumanInviteForApprovalResult =
  | { readonly ok: true; readonly invite: HumanInviteRecord }
  | {
      readonly ok: false;
      readonly code: "invalid_token" | "already_requested";
    };

/**
 * Approval path accept (108): consume the single use and park the invite in
 * status 'accepted' with the claimant + chosen nickname. NO membership row is
 * created here — only the owner's Approve creates it (never auto-approve).
 */
export const claimHumanInviteForApproval = async (input: {
  readonly token: string;
  readonly claimantUserId: string;
  readonly claimantEmailNormalized: string | null;
  readonly projectDisplayName: string;
}): Promise<ClaimHumanInviteForApprovalResult> => {
  const trimmed = input.token.trim();
  if (trimmed.length < 16) return { ok: false, code: "invalid_token" };
  await ensureProjectAclSchema();
  const sql = getSql();
  const claimantEmail = input.claimantEmailNormalized ?? "";
  try {
    const rows = asRowArray(
      await sql`
        UPDATE project_human_invites
        SET uses_remaining = uses_remaining - 1,
            status = 'accepted',
            accepted_at = NOW(),
            accepted_by_user_id = ${input.claimantUserId},
            accepted_display_name = ${input.projectDisplayName},
            updated_at = NOW()
        WHERE token_hash = ${hashHumanInviteToken(trimmed)}
          AND ${sql.unsafe(HUMAN_INVITE_USABLE_WHERE_SQL)}
          AND requires_approval = true
          AND status = 'pending'
          AND (
            require_email_match IS NOT TRUE
            OR lower(trim(email)) = ${claimantEmail}
          )
        RETURNING *
      `,
    );
    if (rows.length === 0) return { ok: false, code: "invalid_token" };
    return { ok: true, invite: mapHumanInviteRow(rows[0]) };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes(HUMAN_INVITE_ACCEPTED_USER_UNIQUE_IDX)) {
      return { ok: false, code: "already_requested" };
    }
    throw error;
  }
};
