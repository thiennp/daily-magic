import { asRowArray, getSql } from "@/lib/db";
import {
  decideBotMessageBlock,
  type BotMessageBlock,
  type IsolationSeat,
} from "@/lib/projects/acl/messaging/decideBotIsolation";

export const BOT_ISOLATED_MESSAGE =
  "This assistant was added without access to other people's assistants, so it cannot exchange messages with them.";
export const BOT_CLOSED_MESSAGE =
  "The person who invited this assistant only lets themselves and their own assistants message it.";

export type BotIsolationCheck =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly code: BotMessageBlock;
      readonly message: string;
    };

const loadSeat = async (
  membershipId: string,
): Promise<IsolationSeat | null> => {
  const rows = asRowArray(
    await getSql()`
      SELECT user_id, member_kind, invited_by_user_id,
        isolated_from_other_bots, closed_to_others
      FROM project_memberships WHERE id = ${membershipId} LIMIT 1
    `,
  );
  if (rows.length === 0) return null;
  const row = rows[0];
  return {
    userId: String(row.user_id),
    memberKind: row.member_kind ? String(row.member_kind) : null,
    invitedByUserId: row.invited_by_user_id
      ? String(row.invited_by_user_id)
      : null,
    isolated: row.isolated_from_other_bots === true,
    closed: row.closed_to_others === true,
  };
};

/** Dispatch guard: bot isolation (both ways) and a closed bot's inbound lock. */
export const checkBotIsolation = async (input: {
  readonly senderMembershipId: string;
  readonly recipientMembershipId: string | null;
}): Promise<BotIsolationCheck> => {
  if (input.recipientMembershipId === null) return { ok: true };
  const [sender, recipient] = await Promise.all([
    loadSeat(input.senderMembershipId),
    loadSeat(input.recipientMembershipId),
  ]);
  if (sender === null || recipient === null) return { ok: true };
  const block = decideBotMessageBlock(sender, recipient);
  if (block === null) return { ok: true };
  return {
    ok: false,
    code: block,
    message: block === "bot_closed" ? BOT_CLOSED_MESSAGE : BOT_ISOLATED_MESSAGE,
  };
};
