/**
 * Generic loadPage — extract of resolveProjectMessengerLoadPage.
 * Merge order (newest-first): prefer local over Neon over IDB on same key;
 * sort (createdAt DESC, id DESC); offline only when beforeRequested && !localLive
 * && merged empty.
 */

import {
  PROJECT_SYNC_COMPUTER_OFFLINE_ERROR,
  type ProjectSyncCursor,
  type ProjectSyncOfflineError,
  type ProjectSyncPageMeta,
  type ProjectSyncPageSource,
} from "@/features/projects/sync/projectSync.types";

export type ProjectSyncLoadPageInput<T> = {
  readonly idbEntries: readonly T[];
  readonly localEntries: readonly T[];
  readonly localHasMore: boolean;
  readonly neonEntries: readonly T[];
  readonly neonHasMore: boolean;
  readonly localLive: boolean;
  readonly beforeRequested: boolean;
  readonly limit: number;
  readonly keyOf: (entry: T) => string;
  readonly createdAtOf: (entry: T) => string;
  readonly encodeCursor: (cursor: ProjectSyncCursor) => string;
};

export type ProjectSyncLoadPageResult<T> = {
  readonly entries: readonly T[];
  readonly page: ProjectSyncPageMeta;
  readonly error?: ProjectSyncOfflineError;
};

const byNewestFirst = <T>(
  left: T,
  right: T,
  keyOf: (entry: T) => string,
  createdAtOf: (entry: T) => string,
): number => {
  const leftAt = createdAtOf(left);
  const rightAt = createdAtOf(right);
  if (leftAt !== rightAt) {
    return leftAt < rightAt ? 1 : -1;
  }
  const leftId = keyOf(left);
  const rightId = keyOf(right);
  return leftId < rightId ? 1 : -1;
};

/**
 * Merge slices with preference local > neon > idb on the same key.
 * Insert order: idb, then neon, then local (last write wins in Map).
 */
export const mergeProjectSyncEntries = <T>(input: {
  readonly idbEntries: readonly T[];
  readonly localEntries: readonly T[];
  readonly neonEntries: readonly T[];
  readonly keyOf: (entry: T) => string;
  readonly createdAtOf: (entry: T) => string;
}): T[] => {
  const byId = new Map<string, T>();
  for (const entry of input.idbEntries) {
    byId.set(input.keyOf(entry), entry);
  }
  for (const entry of input.neonEntries) {
    byId.set(input.keyOf(entry), entry);
  }
  for (const entry of input.localEntries) {
    byId.set(input.keyOf(entry), entry);
  }
  return [...byId.values()].sort((left, right) =>
    byNewestFirst(left, right, input.keyOf, input.createdAtOf),
  );
};

const pageCursorOf = <T>(
  entries: readonly T[],
  keyOf: (entry: T) => string,
  createdAtOf: (entry: T) => string,
  encodeCursor: (cursor: ProjectSyncCursor) => string,
): string | null => {
  const oldest = entries.at(-1);
  if (oldest === undefined) return null;
  return encodeCursor({
    t: createdAtOf(oldest),
    id: keyOf(oldest),
  });
};

const resolveSource = (input: {
  readonly hasIdb: boolean;
  readonly hasLocal: boolean;
  readonly hasNeon: boolean;
}): ProjectSyncPageSource => {
  const { hasIdb, hasLocal, hasNeon } = input;
  const sourceCount =
    (hasLocal ? 1 : 0) + (hasNeon ? 1 : 0) + (hasIdb ? 1 : 0);
  if (sourceCount === 0) return "exhausted";
  if (sourceCount > 1) return "mixed";
  if (hasLocal) return "local";
  if (hasNeon) return "neon";
  return "idb";
};

/**
 * Pure pager core. Messenger passes idbEntries: [] for identical live behavior.
 */
export const loadPage = <T>(
  input: ProjectSyncLoadPageInput<T>,
): ProjectSyncLoadPageResult<T> => {
  const merged = mergeProjectSyncEntries({
    idbEntries: input.idbEntries,
    localEntries: input.localEntries,
    neonEntries: input.neonEntries,
    keyOf: input.keyOf,
    createdAtOf: input.createdAtOf,
  });
  const hasLocal = input.localEntries.length > 0;
  const hasNeon = input.neonEntries.length > 0;
  const hasIdb = input.idbEntries.length > 0;

  if (merged.length === 0) {
    if (input.beforeRequested && !input.localLive) {
      return {
        entries: [],
        page: {
          beforeCursor: null,
          hasMore: false,
          source: "exhausted",
          localLive: false,
        },
        error: PROJECT_SYNC_COMPUTER_OFFLINE_ERROR,
      };
    }
    return {
      entries: [],
      page: {
        beforeCursor: null,
        hasMore: false,
        source: "exhausted",
        localLive: input.localLive,
      },
    };
  }

  const source = resolveSource({ hasIdb, hasLocal, hasNeon });
  const sliced = merged.slice(0, input.limit);
  const hasMore =
    merged.length > input.limit || input.localHasMore || input.neonHasMore;

  return {
    entries: sliced,
    page: {
      beforeCursor: pageCursorOf(
        sliced,
        input.keyOf,
        input.createdAtOf,
        input.encodeCursor,
      ),
      hasMore,
      source,
      localLive: input.localLive,
    },
  };
};
