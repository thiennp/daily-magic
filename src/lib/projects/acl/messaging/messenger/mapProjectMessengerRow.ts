import {
  PROJECT_MESSAGE_OWNER_SENDER_DISPLAY_NAME,
  PROJECT_MESSAGE_SYSTEM_NOTICE_KINDS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";
import type {
  ProjectMessengerPartyKind,
  ProjectMessengerRow,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

const optionalString = (value: unknown): string | null =>
  value === null || value === undefined ? null : String(value);

const toIso = (value: unknown): string =>
  value instanceof Date ? value.toISOString() : String(value);

const memberKind = (value: unknown): ProjectMessengerPartyKind =>
  value === "human" ? "member" : "bot";

const SYSTEM_NOTICE_KINDS: ReadonlySet<string> = new Set(
  PROJECT_MESSAGE_SYSTEM_NOTICE_KINDS,
);

/**
 * No sender membership: a system notice kind (its sender_user_id is the
 * told user, often the owner) or a non-owner user is "system"; else owner.
 */
const senderKindOf = (
  row: Record<string, unknown>,
  ownerUserId: string,
): ProjectMessengerPartyKind => {
  if (
    row.sender_membership_id === null ||
    row.sender_membership_id === undefined
  ) {
    return String(row.sender_user_id) === ownerUserId &&
      !SYSTEM_NOTICE_KINDS.has(String(row.kind))
      ? "owner"
      : "system";
  }
  return memberKind(row.sender_member_kind);
};

const recipientKindOf = (
  row: Record<string, unknown>,
  ownerUserId: string,
): ProjectMessengerRow["recipientKind"] => {
  if (row.to_membership_id === null || row.to_membership_id === undefined) {
    return optionalString(row.to_user_id) === ownerUserId ? "owner" : "none";
  }
  return memberKind(row.recipient_member_kind);
};

const archiveFields = (row: Record<string, unknown>, ownerUserId: string) => {
  const by = optionalString(row.archived_by);
  return {
    archivedAt:
      row.archived_at === null || row.archived_at === undefined
        ? null
        : toIso(row.archived_at),
    archivedBy: by,
    archivedByDisplayName:
      optionalString(row.archived_by_display_name) ??
      (by !== null && by === ownerUserId
        ? PROJECT_MESSAGE_OWNER_SENDER_DISPLAY_NAME
        : null),
  };
};

/** DB row (loadProjectMessengerRows) → classified messenger row. */
export const mapProjectMessengerRow = (
  row: Record<string, unknown>,
  ownerUserId: string,
): ProjectMessengerRow => {
  const senderKind = senderKindOf(row, ownerUserId);
  return {
    messageId: String(row.id),
    kind: String(row.kind),
    summary: String(row.summary),
    createdAt: toIso(row.created_at),
    senderKind,
    senderMembershipId: optionalString(row.sender_membership_id),
    senderUserId: String(row.sender_user_id),
    senderDisplayName:
      senderKind === "owner"
        ? PROJECT_MESSAGE_OWNER_SENDER_DISPLAY_NAME
        : optionalString(row.sender_display_name),
    recipientKind: recipientKindOf(row, ownerUserId),
    toMembershipId: optionalString(row.to_membership_id),
    toUserId: optionalString(row.to_user_id),
    toTeamLabel: optionalString(row.to_team_label),
    toDisplayName: optionalString(row.recipient_display_name),
    ...("archived_at" in row ? archiveFields(row, ownerUserId) : {}),
  };
};
