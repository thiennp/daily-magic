import type {
  MessengerChatStoreAdapter,
  MessengerChatStoreRecord,
  MessengerKeptRecipientRecord,
} from "@/features/projects/messenger/types/messengerChatStore.type";
import {
  PROJECT_SYNC_TABLE_KEPT_RECIPIENTS,
  PROJECT_SYNC_TABLE_MESSENGER_CHATS,
} from "@/features/projects/sync/projectSyncIdb.constant";
import {
  clearProjectSyncAll,
  clearProjectSyncForProject,
  readProjectSyncRow,
  writeProjectSyncRow,
} from "@/features/projects/sync/projectSyncIdb";

/**
 * Messenger chat IDB — thin facade over generalized projectSyncIdb.
 * Store names and record shapes unchanged; clear path added (privacy).
 */
export const messengerChatStoreIdb: MessengerChatStoreAdapter = {
  readChat: (chatKey) =>
    readProjectSyncRow<MessengerChatStoreRecord>(
      PROJECT_SYNC_TABLE_MESSENGER_CHATS,
      chatKey,
    ),
  writeChat: (record) =>
    writeProjectSyncRow(PROJECT_SYNC_TABLE_MESSENGER_CHATS, record),
  readKept: (keptKey) =>
    readProjectSyncRow<MessengerKeptRecipientRecord>(
      PROJECT_SYNC_TABLE_KEPT_RECIPIENTS,
      keptKey,
    ),
  writeKept: (record) =>
    writeProjectSyncRow(PROJECT_SYNC_TABLE_KEPT_RECIPIENTS, record),
  clearProject: (projectId) => clearProjectSyncForProject(projectId),
  clearAll: () => clearProjectSyncAll(),
};
