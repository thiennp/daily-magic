import { hashHumanInviteToken } from "@/lib/projects/acl/humanInvites/hashHumanInviteToken";
import mapHumanInviteRow from "@/lib/projects/acl/humanInvites/mapHumanInviteRow";
import type HumanInviteRecord from "@/lib/projects/acl/humanInvites/types/HumanInviteRecord.type";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { asRowArray, getSql } from "@/lib/db";

export type ClaimHumanInviteResult =
  | { readonly ok: true; readonly invite: HumanInviteRecord }
  | { readonly ok: false; readonly code: "invalid_token" };

/**
 * Atomic guarded claim: decrement uses + stamp redeemed when still usable.
 * Double-accept races leave exactly one winner.
 */
export const claimHumanInviteToken = async (input: {
  readonly token: string;
  readonly claimantUserId: string;
}): Promise<ClaimHumanInviteResult> => {
  const trimmed = input.token.trim();
  if (trimmed.length < 16) {
    return { ok: false, code: "invalid_token" };
  }
  await ensureProjectAclSchema();
  const sql = getSql();
  const tokenHash = hashHumanInviteToken(trimmed);
  const claimed = asRowArray(
    await sql`
      UPDATE project_human_invites
      SET uses_remaining = uses_remaining - 1,
          redeemed_at = NOW(),
          redeemed_by_user_id = ${input.claimantUserId}
      WHERE token_hash = ${tokenHash}
        AND revoked_at IS NULL
        AND expires_at > NOW()
        AND uses_remaining > 0
      RETURNING *
    `,
  );
  if (claimed.length === 0) {
    return { ok: false, code: "invalid_token" };
  }
  return { ok: true, invite: mapHumanInviteRow(claimed[0]) };
};
