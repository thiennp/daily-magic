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

/** Complete AI-session timeline fixture (completed + report link). */
export const aiSessionCompletedFixture = (): AwcMessengerTimelineEntry => ({
  messageId: "task:sess-completed-1",
  createdAt: "2026-10-07T09:30:00.000Z",
  author: {
    kind: "bot",
    membershipId: null,
    displayName: "claude-cli",
  },
  kind: "ai.session",
  entryKind: "ai_session",
  text: "Refactored the messenger Load older path and fixed the offline banner.",
  needsReply: false,
  inReplyTo: null,
  states: [],
  session: {
    status: "completed",
    writerAgent: "claude-cli",
    agentRunId: "run-completed-abc",
  },
});

/** Failed AI-session fixture without report id (expand summary only). */
export const aiSessionFailedFixture = (): AwcMessengerTimelineEntry => ({
  messageId: "task:sess-failed-1",
  createdAt: "2026-10-07T08:15:00.000Z",
  author: {
    kind: "bot",
    membershipId: null,
    displayName: "cursor",
  },
  kind: "ai.session",
  entryKind: "ai_session",
  text: "Stopped: writer could not apply the patch to the locked file.",
  needsReply: false,
  inReplyTo: null,
  states: [],
  session: {
    status: "failed",
    writerAgent: "cursor",
    agentRunId: null,
  },
});

