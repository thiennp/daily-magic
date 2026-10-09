import {
  createHumanInviteToken,
  hashHumanInviteToken,
} from "@/lib/projects/acl/humanInvites/hashHumanInviteToken";
import { HUMAN_INVITE_USABLE_WHERE_SQL } from "@/lib/projects/acl/humanInvites/humanInviteUsableSql.constant";
import { loadUserEmailVerified } from "@/lib/projects/acl/humanInvites/loadUserEmailVerified";
import { parseHumanInviteEmail } from "@/lib/projects/acl/humanInvites/clampHumanInviteParams";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { asRowArray, getSql } from "@/lib/db";

/**
 * Invite tokens are stored hashed, so an in-app invitation has no link to
 * open. For the verified recipient (matched by email) mint a fresh token and
 * return the normal accept path; the emailed link stops working, which is
 * fine: the same person is accepting. Null when it is not theirs / not usable.
 */
export const openMyHumanInvite = async (input: {
  readonly inviteId: string;
  readonly userId: string;
  readonly email: string;
}): Promise<string | null> => {
  const email = parseHumanInviteEmail(input.email);
  if (email === null || !(await loadUserEmailVerified(input.userId))) {
    return null;
  }
  await ensureProjectAclSchema();
  const token = createHumanInviteToken();
  const rows = asRowArray(
    await getSql()`
      UPDATE project_human_invites
      SET token_hash = ${hashHumanInviteToken(token)}, updated_at = NOW()
      WHERE id = ${input.inviteId}
        AND lower(trim(email)) = ${email}
        AND status = 'pending'
        AND uses_remaining = max_uses
        AND ${getSql().unsafe(HUMAN_INVITE_USABLE_WHERE_SQL)}
      RETURNING id
    `,
  );
  return rows.length === 0 ? null : `/invite/h/${encodeURIComponent(token)}`;
};
