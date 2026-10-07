/**
 * Thin IDB interface stub for S1 compile / adapter typing.
 * Full AWC IndexedDB generalization + leave-project clear = Human UI ownership.
 * Preferred DB name (Human decides): `awc-project-sync:<userId>`.
 */

import type { ProjectSyncVersion } from "@/features/projects/sync/projectSync.types";

export type ProjectSyncIdbStoreId = string;

export type ProjectSyncIdbRecord = {
  readonly key: string;
  readonly updatedAt: string;
  readonly version: number;
  readonly payload: Readonly<Record<string, unknown>>;
};

/**
 * Client-side cache port. S1 does not implement IndexedDB open/read/write;
 * Human UI wires Soft tip messengerChatStoreIdb pattern here in S2+.
 */
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

export const projectSyncIdbDbName = (userId: string): string =>
  `awc-project-sync:${userId}`;

export const versionFromIdbRecord = (
  record: ProjectSyncIdbRecord,
): ProjectSyncVersion => ({
  version: record.version,
  updatedAt: record.updatedAt,
});
