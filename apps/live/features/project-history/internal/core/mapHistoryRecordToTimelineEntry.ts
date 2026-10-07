import {
  PROJECT_MESSENGER_KIND_NEEDS_REPLY,
  readProjectMessengerInReplyTo,
  type ProjectMessengerPartyKind,
  type ProjectMessengerTimelineEntry,
} from "../../../../adapters/projectHistorySharedMappers";

import { deriveProjectHistorySenderLabel } from "./deriveProjectHistorySenderLabel";
import { extractHistoryIndexFields } from "./extractHistoryIndexFields";
import { extractProjectHistoryMessageText } from "./extractProjectHistoryMessageText";
import { inferHistoryBotIds } from "./inferHistoryBotIds";
import {
  readOptionalHistoryString,
  readOptionalHistoryStringKeys,
} from "./readOptionalHistoryString";
import type { ProjectHistoryMessageRecord } from "./writeProjectHistoryMessage";

const authorKind = (
  membershipId: string | null,
  botIds: ReadonlySet<string>,
): Exclude<ProjectMessengerPartyKind, "system"> => {
  if (membershipId === null) {
    return "owner";
  }
  return botIds.has(membershipId) ? "bot" : "member";
};

/**
 * Best-effort map from a durable history file to the Messenger TimelineEntry
 * shape Dispatch already returns from Neon. Local store has no delivery chips,
 * so `states` is always empty here.
 */
export const mapHistoryRecordToTimelineEntry = (
  record: ProjectHistoryMessageRecord,
): ProjectMessengerTimelineEntry => {
  const message = record.message;
  const fields = extractHistoryIndexFields(record);
  const botIds = inferHistoryBotIds(message);
  const membershipId = readOptionalHistoryStringKeys(message, [
    "fromMembershipId",
    "senderMembershipId",
    "sender_membership_id",
  ]);
  const kind =
    readOptionalHistoryString(message.kind) ??
    readOptionalHistoryStringKeys(message, ["messageKind"]) ??
    "chat.note";
  const summary =
    readOptionalHistoryString(message.summary) ??
    extractProjectHistoryMessageText(record);
  const senderKind = authorKind(membershipId, botIds);
  const explicitInReplyTo = readOptionalHistoryStringKeys(message, [
    "inReplyTo",
    "in_reply_to",
  ]);
  const reply =
    explicitInReplyTo !== null
      ? { inReplyTo: explicitInReplyTo, text: summary }
      : senderKind === "bot"
        ? readProjectMessengerInReplyTo(summary)
        : { inReplyTo: null, text: summary };
  const displayName =
    deriveProjectHistorySenderLabel(message) ??
    readOptionalHistoryStringKeys(message, [
      "senderDisplayName",
      "sender_display_name",
    ]);
  return {
    messageId: record.messageId,
    createdAt: fields.createdAt,
    author: {
      kind: senderKind,
      membershipId,
      displayName,
    },
    kind,
    text: reply.text,
    needsReply: kind === PROJECT_MESSENGER_KIND_NEEDS_REPLY,
    inReplyTo: reply.inReplyTo,
    states: [],
  };
};
