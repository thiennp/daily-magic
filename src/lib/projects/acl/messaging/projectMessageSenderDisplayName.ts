import {
  PROJECT_MESSAGE_SYSTEM_NOTICE_KINDS,
  PROJECT_MESSAGE_SYSTEM_SENDER_DISPLAY_NAME,
  PROJECT_MESSAGE_OWNER_SENDER_DISPLAY_NAME,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

const SYSTEM_KINDS: ReadonlySet<string> = new Set(
  PROJECT_MESSAGE_SYSTEM_NOTICE_KINDS,
);

/** Sender name for inbox and log rows: system notice, owner, or the member. */
export const projectMessageSenderDisplayName = (
  row: Record<string, unknown>,
): string | null => {
  if (
    row.sender_membership_id === null ||
    row.sender_membership_id === undefined
  ) {
    return SYSTEM_KINDS.has(String(row.kind))
      ? PROJECT_MESSAGE_SYSTEM_SENDER_DISPLAY_NAME
      : PROJECT_MESSAGE_OWNER_SENDER_DISPLAY_NAME;
  }
  return row.sender_display_name ? String(row.sender_display_name) : null;
};
