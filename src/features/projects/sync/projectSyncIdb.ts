/**
 * AWC IndexedDB client (Human UI — SPEC §3.1).
 * Replaces S1 stub: physical DB `awc-chat` v2 (+ projectTasks); messenger stores
 * preserved; Soft-degrade kinds align with projectSyncIdbSoftDegrade (S1).
 * Clear on sign-out (clearAll) / leave-delete (clearProject). Never tokens/keys/env.
 */

import {
  PROJECT_SYNC_IDB_DB_NAME,
  PROJECT_SYNC_IDB_DB_VERSION,
  PROJECT_SYNC_PROJECT_INDEX,
  PROJECT_SYNC_TABLE_KEPT_RECIPIENTS,
  PROJECT_SYNC_TABLE_MESSENGER_CHATS,
  PROJECT_SYNC_TABLE_PROJECT_TASKS,
  type ProjectSyncTableId,
} from "@/features/projects/sync/projectSyncIdb.constant";
import {
  ProjectSyncIdbSoftError,
  type ProjectSyncIdbFailureKind,
} from "@/features/projects/sync/projectSyncIdbSoftDegrade";
import type { ProjectSyncVersion } from "@/features/projects/sync/projectSync.types";

/** S1 port typing — kept for History callers; Human implements browser client below. */
export type ProjectSyncIdbStoreId = string;

export type ProjectSyncIdbRecord = {
  readonly key: string;
  readonly updatedAt: string;
  readonly version: number;
  readonly payload: Readonly<Record<string, unknown>>;
};

export type ProjectSyncIdbPort = {
  readonly dbNameForUser: (userId: string) => string;
  readonly get?: (
    storeId: ProjectSyncIdbStoreId,
    key: string,
  ) => Promise<ProjectSyncIdbRecord | null>;
  readonly put?: (
    storeId: ProjectSyncIdbStoreId,
    record: ProjectSyncIdbRecord,
  ) => Promise<void>;
  readonly clearStore?: (storeId: ProjectSyncIdbStoreId) => Promise<void>;
  readonly clearAll?: () => Promise<void>;
};

/** Preferred per-user name (S1 Soft pick); physical Soft tip DB remains awc-chat. */
export const projectSyncIdbDbName = (userId: string): string =>
  `awc-project-sync:${userId}`;

export const versionFromIdbRecord = (
  record: ProjectSyncIdbRecord,
): ProjectSyncVersion => ({
  version: record.version,
  updatedAt: record.updatedAt,
});

type StoreKeyPath = { readonly keyPath: string };

const STORE_KEYS: Record<ProjectSyncTableId, StoreKeyPath> = {
  [PROJECT_SYNC_TABLE_MESSENGER_CHATS]: { keyPath: "chatKey" },
  [PROJECT_SYNC_TABLE_KEPT_RECIPIENTS]: { keyPath: "keptKey" },
  [PROJECT_SYNC_TABLE_PROJECT_TASKS]: { keyPath: "taskKey" },
};

const dbHolder: { promise: Promise<IDBDatabase | null> | null } = {
  promise: null,
};

const ensureStore = (db: IDBDatabase, tableId: ProjectSyncTableId): void => {
  if (db.objectStoreNames.contains(tableId)) return;
  const { keyPath } = STORE_KEYS[tableId];
  db.createObjectStore(tableId, { keyPath }).createIndex(
    PROJECT_SYNC_PROJECT_INDEX,
    "projectId",
  );
};

const upgrade = (db: IDBDatabase): void => {
  ensureStore(db, PROJECT_SYNC_TABLE_MESSENGER_CHATS);
  ensureStore(db, PROJECT_SYNC_TABLE_KEPT_RECIPIENTS);
  ensureStore(db, PROJECT_SYNC_TABLE_PROJECT_TASKS);
};

const openDb = (): Promise<IDBDatabase | null> => {
  if (dbHolder.promise !== null) return dbHolder.promise;
  dbHolder.promise = new Promise((resolve) => {
    if (typeof indexedDB === "undefined") return resolve(null);
    try {
      const request = indexedDB.open(
        PROJECT_SYNC_IDB_DB_NAME,
        PROJECT_SYNC_IDB_DB_VERSION,
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

export const resetProjectSyncIdbHolder = (): void => {
  dbHolder.promise = null;
};

/** Map DOM / open failures → S1 SoftDegrade kinds. */
export const classifyProjectSyncIdbFailure = (
  cause: unknown,
): ProjectSyncIdbFailureKind => {
  if (cause === null || cause === undefined) return "unavailable";
  if (cause instanceof ProjectSyncIdbSoftError) return cause.kind;
  const name =
    typeof cause === "object" && cause !== null && "name" in cause
      ? String((cause as { name: unknown }).name)
      : "";
  const message =
    typeof cause === "object" && cause !== null && "message" in cause
      ? String((cause as { message: unknown }).message)
      : typeof cause === "string"
        ? cause
        : name;
  const blob = `${name} ${message}`;
  if (name === "QuotaExceededError" || /quota/i.test(blob)) return "quota_exceeded";
  if (/block/i.test(blob)) return "open_blocked";
  if (
    name === "InvalidStateError" ||
    name === "DataError" ||
    name === "ConstraintError" ||
    /corrupt/i.test(blob)
  ) {
    return "corrupted";
  }
  if (name === "AbortError" || /write|abort/i.test(blob)) return "write_fail";
  if (/read|get/i.test(blob)) return "read_fail";
  if (typeof indexedDB === "undefined" || name === "SecurityError") {
    return "unavailable";
  }
  return "unavailable";
};

export const readProjectSyncRow = async <T>(
  tableId: ProjectSyncTableId,
  key: string,
): Promise<T | null> => {
  try {
    if (typeof indexedDB === "undefined") return null;
    const db = await openDb();
    if (db === null) return null;
    return await new Promise<T | null>((resolve, reject) => {
      try {
        const request = db
          .transaction(tableId, "readonly")
          .objectStore(tableId)
          .get(key);
        request.onsuccess = () =>
          resolve((request.result as T | undefined) ?? null);
        request.onerror = () =>
          reject(request.error ?? new Error("IDB read failed"));
      } catch (err) {
        reject(err);
      }
    });
  } catch {
    return null;
  }
};

export const writeProjectSyncRow = async (
  tableId: ProjectSyncTableId,
  row: object,
): Promise<boolean> => {
  try {
    if (typeof indexedDB === "undefined") return false;
    const db = await openDb();
    if (db === null) return false;
    await new Promise<void>((resolve, reject) => {
      try {
        const tx = db.transaction(tableId, "readwrite");
        tx.objectStore(tableId).put(row);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error ?? new Error("IDB write failed"));
        tx.onabort = () => reject(tx.error ?? new Error("IDB write aborted"));
      } catch (err) {
        reject(err);
      }
    });
    return true;
  } catch {
    return false;
  }
};

/**
 * Soft-degrade read — throws ProjectSyncIdbSoftError with S1 kinds so
 * softReadIdbEntries / pager Soft degrade paths stay aligned.
 */
export const readProjectSyncRowOrThrowSoft = async <T>(
  tableId: ProjectSyncTableId,
  key: string,
): Promise<T | null> => {
  if (typeof indexedDB === "undefined") {
    throw new ProjectSyncIdbSoftError("unavailable");
  }
  const db = await openDb();
  if (db === null) {
    throw new ProjectSyncIdbSoftError("open_blocked", "IndexedDB open null");
  }
  try {
    return await new Promise<T | null>((resolve, reject) => {
      try {
        const request = db
          .transaction(tableId, "readonly")
          .objectStore(tableId)
          .get(key);
        request.onsuccess = () =>
          resolve((request.result as T | undefined) ?? null);
        request.onerror = () =>
          reject(
            new ProjectSyncIdbSoftError(
              "read_fail",
              request.error?.message ?? "read failed",
            ),
          );
      } catch (err) {
        reject(
          new ProjectSyncIdbSoftError(
            classifyProjectSyncIdbFailure(err),
            err instanceof Error ? err.message : undefined,
          ),
        );
      }
    });
  } catch (err) {
    if (err instanceof ProjectSyncIdbSoftError) throw err;
    throw new ProjectSyncIdbSoftError(classifyProjectSyncIdbFailure(err));
  }
};

export const writeProjectSyncRowOrThrowSoft = async (
  tableId: ProjectSyncTableId,
  row: object,
): Promise<void> => {
  if (typeof indexedDB === "undefined") {
    throw new ProjectSyncIdbSoftError("unavailable");
  }
  const db = await openDb();
  if (db === null) {
    throw new ProjectSyncIdbSoftError("open_blocked", "IndexedDB open null");
  }
  try {
    await new Promise<void>((resolve, reject) => {
      try {
        const tx = db.transaction(tableId, "readwrite");
        tx.objectStore(tableId).put(row);
        tx.oncomplete = () => resolve();
        tx.onerror = () =>
          reject(
            new ProjectSyncIdbSoftError(
              classifyProjectSyncIdbFailure(tx.error) === "quota_exceeded"
                ? "quota_exceeded"
                : "write_fail",
              tx.error?.message ?? "write failed",
            ),
          );
        tx.onabort = () =>
          reject(
            new ProjectSyncIdbSoftError(
              classifyProjectSyncIdbFailure(tx.error) === "quota_exceeded"
                ? "quota_exceeded"
                : "write_fail",
              tx.error?.message ?? "write aborted",
            ),
          );
      } catch (err) {
        reject(
          new ProjectSyncIdbSoftError(
            classifyProjectSyncIdbFailure(err),
            err instanceof Error ? err.message : undefined,
          ),
        );
      }
    });
  } catch (err) {
    if (err instanceof ProjectSyncIdbSoftError) throw err;
    throw new ProjectSyncIdbSoftError(classifyProjectSyncIdbFailure(err));
  }
};

const clearStoreByProject = (
  db: IDBDatabase,
  tableId: ProjectSyncTableId,
  projectId: string,
): Promise<boolean> =>
  new Promise((resolve) => {
    try {
      if (!db.objectStoreNames.contains(tableId)) return resolve(true);
      const tx = db.transaction(tableId, "readwrite");
      const store = tx.objectStore(tableId);
      const index = store.index(PROJECT_SYNC_PROJECT_INDEX);
      const request = index.openCursor(IDBKeyRange.only(projectId));
      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor === null) return;
        cursor.delete();
        cursor.continue();
      };
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
      tx.onabort = () => resolve(false);
    } catch {
      resolve(false);
    }
  });

export const clearProjectSyncForProject = async (
  projectId: string,
): Promise<boolean> => {
  const db = await openDb();
  if (db === null) return false;
  const results = await Promise.all(
    (
      [
        PROJECT_SYNC_TABLE_MESSENGER_CHATS,
        PROJECT_SYNC_TABLE_KEPT_RECIPIENTS,
        PROJECT_SYNC_TABLE_PROJECT_TASKS,
      ] as const
    ).map((tableId) => clearStoreByProject(db, tableId, projectId)),
  );
  return results.every(Boolean);
};

export const clearProjectSyncAll = async (): Promise<boolean> => {
  if (typeof indexedDB === "undefined") return false;
  const open = dbHolder.promise;
  if (open !== null) {
    const db = await open;
    if (db !== null) {
      try {
        db.close();
      } catch {
        /* ignore */
      }
    }
  }
  resetProjectSyncIdbHolder();
  return new Promise((resolve) => {
    try {
      const request = indexedDB.deleteDatabase(PROJECT_SYNC_IDB_DB_NAME);
      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(false);
      request.onblocked = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
};

export const listProjectSyncByProject = async <T extends { projectId: string }>(
  tableId: ProjectSyncTableId,
  projectId: string,
): Promise<readonly T[]> => {
  try {
    if (typeof indexedDB === "undefined") return [];
    const db = await openDb();
    if (db === null) return [];
    return await new Promise<T[]>((resolve, reject) => {
      try {
        if (!db.objectStoreNames.contains(tableId)) return resolve([]);
        const collected: T[] = [];
        const tx = db.transaction(tableId, "readonly");
        const index = tx.objectStore(tableId).index(PROJECT_SYNC_PROJECT_INDEX);
        const request = index.openCursor(IDBKeyRange.only(projectId));
        request.onsuccess = () => {
          const cursor = request.result;
          if (cursor === null) return;
          collected.push(cursor.value as T);
          cursor.continue();
        };
        tx.oncomplete = () => resolve(collected);
        tx.onerror = () => reject(tx.error ?? new Error("IDB list failed"));
        tx.onabort = () => reject(tx.error ?? new Error("IDB list aborted"));
      } catch (err) {
        reject(err);
      }
    });
  } catch {
    return [];
  }
};

/** Soft list — throws SoftError for softReadIdbEntries wrapping. */
export const listProjectSyncByProjectOrThrowSoft = async <
  T extends { projectId: string },
>(
  tableId: ProjectSyncTableId,
  projectId: string,
): Promise<readonly T[]> => {
  if (typeof indexedDB === "undefined") {
    throw new ProjectSyncIdbSoftError("unavailable");
  }
  const db = await openDb();
  if (db === null) {
    throw new ProjectSyncIdbSoftError("open_blocked");
  }
  try {
    return await new Promise<T[]>((resolve, reject) => {
      try {
        if (!db.objectStoreNames.contains(tableId)) return resolve([]);
        const collected: T[] = [];
        const tx = db.transaction(tableId, "readonly");
        const index = tx.objectStore(tableId).index(PROJECT_SYNC_PROJECT_INDEX);
        const request = index.openCursor(IDBKeyRange.only(projectId));
        request.onsuccess = () => {
          const cursor = request.result;
          if (cursor === null) return;
          collected.push(cursor.value as T);
          cursor.continue();
        };
        tx.oncomplete = () => resolve(collected);
        tx.onerror = () =>
          reject(new ProjectSyncIdbSoftError("read_fail"));
        tx.onabort = () =>
          reject(new ProjectSyncIdbSoftError("read_fail"));
      } catch (err) {
        reject(
          new ProjectSyncIdbSoftError(classifyProjectSyncIdbFailure(err)),
        );
      }
    });
  } catch (err) {
    if (err instanceof ProjectSyncIdbSoftError) throw err;
    throw new ProjectSyncIdbSoftError(classifyProjectSyncIdbFailure(err));
  }
};
