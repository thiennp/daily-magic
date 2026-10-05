import { PROJECT_MESSAGE_OWNER_SENDER_DISPLAY_NAME } from "@/lib/projects/acl/messaging/projectMessage.constants";
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

/** No sender membership: the owner when sender_user_id is the owner, else a system notice. */
const senderKindOf = (
  row: Record<string, unknown>,
  ownerUserId: string,
): ProjectMessengerPartyKind => {
  if (
    row.sender_membership_id === null ||
    row.sender_membership_id === undefined
  ) {
    return String(row.sender_user_id) === ownerUserId ? "owner" : "system";
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
  };
};
