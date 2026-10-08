import type { MessengerKeptRecipient } from "@/features/projects/messenger/types/messengerChatStore.type";

const nonEmpty = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0;

/**
 * IndexedDB may hold pre-093103ac shapes ({ kind: "everyone" } or
 * { kind: "assistants", membershipIds }). Only one assistant can be kept now:
 * a legacy single id maps over; "everyone" or several ids load as nothing kept.
 */
export const normalizeMessengerKeptRecipient = (
  value: unknown,
): MessengerKeptRecipient | null => {
  if (value === null || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  if (row.kind === "assistant" && nonEmpty(row.membershipId)) {
    return { kind: "assistant", membershipId: row.membershipId };
  }
  if (
    row.kind === "assistants" &&
    Array.isArray(row.membershipIds) &&
    row.membershipIds.length === 1 &&
    nonEmpty(row.membershipIds[0])
  ) {
    return { kind: "assistant", membershipId: row.membershipIds[0] };
  }
  return null;
};
