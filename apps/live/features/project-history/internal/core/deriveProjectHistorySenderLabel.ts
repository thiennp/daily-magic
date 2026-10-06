import { projectMessageSenderDisplayName } from "../../../../adapters/projectHistorySharedMappers";

import { readOptionalHistoryStringKeys } from "./readOptionalHistoryString";

/**
 * Sender label for history record v2. Prefers the already-mapped
 * `fromProjectDisplayName` (cloud uses `projectMessageSenderDisplayName`);
 * else applies that same shared mapper to snake_case payload fields.
 */
export const deriveProjectHistorySenderLabel = (
  message: Readonly<Record<string, unknown>>,
): string | null => {
  const mapped = readOptionalHistoryStringKeys(message, [
    "fromProjectDisplayName",
    "senderLabel",
    "sender_label",
  ]);
  if (mapped !== null) {
    return mapped;
  }
  return projectMessageSenderDisplayName({
    sender_membership_id:
      message.sender_membership_id ??
      message.fromMembershipId ??
      message.senderMembershipId ??
      null,
    sender_display_name:
      message.sender_display_name ?? message.senderDisplayName ?? null,
    kind: message.kind,
  });
};
