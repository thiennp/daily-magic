import type {
  ProjectMessengerKeyedRow,
  ProjectMessengerLinkedReply,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

/**
 * Bot replies (oldest first) → parent message id → bot membership id → that
 * bot's latest linked reply. Later replies overwrite earlier ones.
 * Bot↔bot rows (DF-023 owner view) and notice rows never move chips on
 * human messages.
 */
export const indexProjectMessengerReplies = (
  rows: readonly ProjectMessengerKeyedRow[],
): ReadonlyMap<string, ReadonlyMap<string, ProjectMessengerLinkedReply>> => {
  const index = new Map<string, Map<string, ProjectMessengerLinkedReply>>();
  for (const keyed of rows) {
    const botId = keyed.row.senderMembershipId;
    if (
      keyed.peer !== undefined ||
      keyed.notice === true ||
      keyed.row.senderKind !== "bot" ||
      keyed.inReplyTo === null ||
      botId === null
    ) {
      continue;
    }
    const byBot =
      index.get(keyed.inReplyTo) ??
      new Map<string, ProjectMessengerLinkedReply>();
    byBot.set(botId, { kind: keyed.row.kind, text: keyed.text });
    index.set(keyed.inReplyTo, byBot);
  }
  return index;
};
