import { asRowArray, getSql } from "@/lib/db";
import {
  isBotIsolationBlocked,
  type IsolationSeat,
} from "@/lib/projects/acl/messaging/decideBotIsolation";

export const BOT_ISOLATED_MESSAGE =
  "This assistant was added without access to other people's assistants, so it cannot exchange messages with them.";

const loadSeat = async (
  membershipId: string,
): Promise<IsolationSeat | null> => {
  const rows = asRowArray(
    await getSql()`
      SELECT member_kind, invited_by_user_id, isolated_from_other_bots
      FROM project_memberships WHERE id = ${membershipId} LIMIT 1
    `,
  );
  if (rows.length === 0) return null;
  return {
    memberKind: rows[0].member_kind ? String(rows[0].member_kind) : null,
    invitedByUserId: rows[0].invited_by_user_id
      ? String(rows[0].invited_by_user_id)
      : null,
    isolated: rows[0].isolated_from_other_bots === true,
  };
};

/** Dispatch guard: ok unless one side is an isolated bot and the other is another person's bot. */
export const checkBotIsolation = async (input: {
  readonly senderMembershipId: string;
  readonly recipientMembershipId: string | null;
}): Promise<
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly code: "bot_isolated";
      readonly message: string;
    }
> => {
  if (input.recipientMembershipId === null) return { ok: true };
  const [sender, recipient] = await Promise.all([
    loadSeat(input.senderMembershipId),
    loadSeat(input.recipientMembershipId),
  ]);
  if (sender === null || recipient === null) return { ok: true };
  return isBotIsolationBlocked(sender, recipient)
    ? { ok: false, code: "bot_isolated", message: BOT_ISOLATED_MESSAGE }
    : { ok: true };
};
