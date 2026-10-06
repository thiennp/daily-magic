import type {
  MessengerChatStoreAdapter,
  MessengerChatStoreRecord,
  MessengerKeptRecipientRecord,
} from "@/features/projects/messenger/types/messengerChatStore.type";
import {
  MESSENGER_CHAT_DB_NAME,
  MESSENGER_CHAT_DB_VERSION,
  MESSENGER_CHAT_PROJECT_INDEX,
  MESSENGER_CHAT_STORE,
  MESSENGER_KEPT_RECIPIENT_STORE,
} from "@/features/projects/messenger/utils/messengerChatStore.constant";

const dbHolder: { promise: Promise<IDBDatabase | null> | null } = {
  promise: null,
};

const upgrade = (db: IDBDatabase): void => {
  if (!db.objectStoreNames.contains(MESSENGER_CHAT_STORE)) {
    db.createObjectStore(MESSENGER_CHAT_STORE, {
      keyPath: "chatKey",
    }).createIndex(MESSENGER_CHAT_PROJECT_INDEX, "projectId");
  }
  if (!db.objectStoreNames.contains(MESSENGER_KEPT_RECIPIENT_STORE)) {
    db.createObjectStore(MESSENGER_KEPT_RECIPIENT_STORE, {
      keyPath: "keptKey",
    }).createIndex(MESSENGER_CHAT_PROJECT_INDEX, "projectId");
  }
};

/** null when IndexedDB is missing / blocked (SSR, private mode): store is a no-op. */
const openDb = (): Promise<IDBDatabase | null> => {
  if (dbHolder.promise !== null) return dbHolder.promise;
  dbHolder.promise = new Promise((resolve) => {
    if (typeof indexedDB === "undefined") return resolve(null);
    try {
      const request = indexedDB.open(
        MESSENGER_CHAT_DB_NAME,
        MESSENGER_CHAT_DB_VERSION,
      );
      request.onupgradeneeded = () => upgrade(request.result);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
      request.onblocked = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
  return dbHolder.promise;
};

const readRow = async <T>(store: string, key: string): Promise<T | null> => {
  const db = await openDb();
  if (db === null) return null;
  return new Promise((resolve) => {
    try {
      const request = db
        .transaction(store, "readonly")
        .objectStore(store)
        .get(key);
      request.onsuccess = () =>
        resolve((request.result as T | undefined) ?? null);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
};

/** put only — upsert. No delete / clear path exists in this store. */
const putRow = async (store: string, row: object): Promise<boolean> => {
  const db = await openDb();
  if (db === null) return false;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(store, "readwrite");
      tx.objectStore(store).put(row);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
      tx.onabort = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
};

export const messengerChatStoreIdb: MessengerChatStoreAdapter = {
  readChat: (chatKey) =>
    readRow<MessengerChatStoreRecord>(MESSENGER_CHAT_STORE, chatKey),
  writeChat: (record) => putRow(MESSENGER_CHAT_STORE, record),
  readKept: (keptKey) =>
    readRow<MessengerKeptRecipientRecord>(
      MESSENGER_KEPT_RECIPIENT_STORE,
      keptKey,
    ),
  writeKept: (record) => putRow(MESSENGER_KEPT_RECIPIENT_STORE, record),
};
