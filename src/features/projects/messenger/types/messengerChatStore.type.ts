import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";

/**
 * One browser (IndexedDB) copy of a project chat. Keyed by `chatKey`
 * (`projectId:threadKey`) with a `projectId` index so a later one-window
 * timeline can read every chat of a project.
 */
export type MessengerChatStoreRecord = {
  readonly chatKey: string;
  readonly projectId: string;
  readonly threadKey: string;
  /** Oldest-first, merged by messageId (server row wins). */
  readonly entries: readonly AwcMessengerTimelineEntry[];
  readonly canSend: boolean;
  readonly updatedAt: string;
  readonly schemaVersion: 1;
};

/**
 * Kept recipient (COMPOSER-LOCK `KEPT(r)`): exactly one assistant; `null` =
 * nothing kept (no send-to-all since 093103ac).
 * Only a checked "Keep sending" is ever stored; a one-shot never is.
 */
export type MessengerKeptRecipient = {
  readonly kind: "assistant";
  readonly membershipId: string;
};

/** Per project chat per member. Cache only — server value wins on load (later). */
export type MessengerKeptRecipientRecord = {
  readonly keptKey: string;
  readonly projectId: string;
  readonly memberKey: string;
  readonly recipient: MessengerKeptRecipient | null;
  readonly updatedAt: string;
  readonly schemaVersion: 1;
};

/**
 * Read/write + privacy clear (SPEC §3.1 / Arch Soft S5).
 * clearProject on leave/delete; clearAll on sign-out.
 */
export type MessengerChatStoreAdapter = {
  readonly readChat: (
    chatKey: string,
  ) => Promise<MessengerChatStoreRecord | null>;
  readonly writeChat: (record: MessengerChatStoreRecord) => Promise<boolean>;
  readonly readKept: (
    keptKey: string,
  ) => Promise<MessengerKeptRecipientRecord | null>;
  readonly writeKept: (
    record: MessengerKeptRecipientRecord,
  ) => Promise<boolean>;
  readonly clearProject: (projectId: string) => Promise<boolean>;
  readonly clearAll: () => Promise<boolean>;
};
