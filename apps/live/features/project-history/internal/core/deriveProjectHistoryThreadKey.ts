import {
  projectMessengerThreadKeyForRow,
  readProjectMessengerInReplyTo,
  type ProjectMessengerPartyKind,
  type ProjectMessengerRow,
} from "../../../../adapters/projectHistorySharedMappers";

import { inferHistoryBotIds } from "./inferHistoryBotIds";
import {
  readOptionalHistoryString,
  readOptionalHistoryStringKeys,
} from "./readOptionalHistoryString";

const partyKind = (
  membershipId: string | null,
  botIds: ReadonlySet<string>,
  whenHuman: ProjectMessengerPartyKind,
): ProjectMessengerPartyKind => {
  if (membershipId === null) {
    return whenHuman;
  }
  return botIds.has(membershipId) ? "bot" : whenHuman;
};

const toMessengerRow = (
  message: Readonly<Record<string, unknown>>,
  botIds: ReadonlySet<string>,
): ProjectMessengerRow => {
  const fromMembershipId = readOptionalHistoryStringKeys(message, [
    "fromMembershipId",
    "senderMembershipId",
    "sender_membership_id",
  ]);
  const toMembershipId = readOptionalHistoryStringKeys(message, [
    "toMembershipId",
    "to_membership_id",
  ]);
  const toUserId = readOptionalHistoryStringKeys(message, [
    "toUserId",
    "to_user_id",
  ]);
  const toTeamLabel = readOptionalHistoryStringKeys(message, [
    "toTeamLabel",
    "to_team_label",
  ]);
  const senderKind = partyKind(fromMembershipId, botIds, "owner");
  const recipientKind =
    toMembershipId !== null
      ? partyKind(toMembershipId, botIds, "member")
      : toUserId !== null
        ? "owner"
        : "none";
  return {
    messageId:
      readOptionalHistoryStringKeys(message, ["messageId", "id"]) ?? "unknown",
    kind: readOptionalHistoryString(message.kind) ?? "chat.note",
    summary: readOptionalHistoryString(message.summary) ?? "",
    createdAt:
      readOptionalHistoryStringKeys(message, ["createdAt", "created_at"]) ??
      new Date(0).toISOString(),
    senderKind,
    senderMembershipId: fromMembershipId,
    senderUserId: "history-local",
    senderDisplayName: null,
    recipientKind,
    toMembershipId,
    toUserId,
    toTeamLabel,
  };
};

/**
 * Prefer explicit threadKey on the payload; else DRY-call
 * `projectMessengerThreadKeyForRow` (S12 may not be on Neon yet).
 */
export const deriveProjectHistoryThreadKey = (input: {
  readonly message: Readonly<Record<string, unknown>>;
  readonly botIds?: ReadonlySet<string>;
  readonly wholeMessageIds?: ReadonlySet<string>;
}): string | null => {
  const explicit = readOptionalHistoryStringKeys(input.message, [
    "threadKey",
    "thread_key",
  ]);
  if (explicit !== null) {
    return explicit;
  }
  const botIds = input.botIds ?? inferHistoryBotIds(input.message);
  const row = toMessengerRow(input.message, botIds);
  const inReplyTo =
    readOptionalHistoryStringKeys(input.message, ["inReplyTo", "in_reply_to"]) ??
    (row.senderKind === "bot"
      ? readProjectMessengerInReplyTo(row.summary).inReplyTo
      : null);
  return projectMessengerThreadKeyForRow({
    row,
    botIds,
    wholeMessageIds: input.wholeMessageIds ?? new Set(),
    inReplyTo,
  });
};
