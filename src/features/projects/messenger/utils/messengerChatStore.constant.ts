/** Browser chat store (IndexedDB). Bump version + add stores; never drop data. */
export const MESSENGER_CHAT_DB_NAME = "awc-chat";
export const MESSENGER_CHAT_DB_VERSION = 1;
export const MESSENGER_CHAT_STORE = "messengerChats";
export const MESSENGER_KEPT_RECIPIENT_STORE = "keptRecipients";
export const MESSENGER_CHAT_PROJECT_INDEX = "projectId";

/** Trim lock (Lead Q2): a message may leave the browser only when it is
 * BOTH older than this AND outside the newest MAX_MESSAGES, AND confirmed
 * stored on a computer. Projects with no owner computer never trim. */
export const MESSENGER_CHAT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
export const MESSENGER_CHAT_MAX_MESSAGES = 1000;
