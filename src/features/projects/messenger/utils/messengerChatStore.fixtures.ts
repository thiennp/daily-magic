import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import type {
  MessengerChatStoreAdapter,
  MessengerChatStoreRecord,
  MessengerKeptRecipientRecord,
} from "@/features/projects/messenger/types/messengerChatStore.type";

export const DAY_MS = 24 * 60 * 60 * 1000;
export const NOW = Date.parse("2026-10-06T12:00:00.000Z");

export const entryAt = (
  messageId: string,
  createdMs: number,
  text = messageId,
): AwcMessengerTimelineEntry => ({
  messageId,
  createdAt: new Date(createdMs).toISOString(),
  author: { kind: "owner", membershipId: null, displayName: null },
  kind: "message",
  text,
  needsReply: false,
  inReplyTo: null,
  states: [],
});

/** n entries oldest-first, one minute apart, ending at `endMs`. */
export const entriesEndingAt = (
  n: number,
  endMs: number,
): readonly AwcMessengerTimelineEntry[] =>
  Array.from({ length: n }, (_, i) =>
    entryAt(`m${String(i).padStart(5, "0")}`, endMs - (n - 1 - i) * 60_000),
  );

export const memoryChatStore = (options?: {
  readonly failWrites?: boolean;
}) => {
  const chats = new Map<string, MessengerChatStoreRecord>();
  const kept = new Map<string, MessengerKeptRecipientRecord>();
  const failWrites = options?.failWrites === true;
  const store: MessengerChatStoreAdapter = {
    readChat: async (key) => chats.get(key) ?? null,
    writeChat: async (record) => {
      if (failWrites) throw new Error("quota");
      chats.set(record.chatKey, record);
      return true;
    },
    readKept: async (key) => kept.get(key) ?? null,
    writeKept: async (record) => {
      kept.set(record.keptKey, record);
      return true;
    },
  };
  return { store, chats, kept };
};
