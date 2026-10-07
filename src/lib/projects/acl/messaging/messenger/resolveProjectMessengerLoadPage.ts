import { encodeProjectMessengerCursor } from "@/lib/projects/acl/messaging/messenger/projectMessengerCursor";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

export type ProjectMessengerPageSource =
  | "local"
  | "neon"
  | "mixed"
  | "exhausted";

export type ProjectMessengerPageMeta = {
  readonly beforeCursor: string | null;
  readonly hasMore: boolean;
  readonly source: ProjectMessengerPageSource;
  readonly localLive: boolean;
};

export type ProjectMessengerOfflineError = {
  readonly code: "project_computer_offline";
  readonly message: "Connection to the project computer was lost.";
};

export const PROJECT_MESSENGER_COMPUTER_OFFLINE_ERROR: ProjectMessengerOfflineError =
  {
    code: "project_computer_offline",
    message: "Connection to the project computer was lost.",
  };

const byNewestFirst = (
  left: ProjectMessengerTimelineEntry,
  right: ProjectMessengerTimelineEntry,
): number => {
  if (left.createdAt !== right.createdAt) {
    return left.createdAt < right.createdAt ? 1 : -1;
  }
  return left.messageId < right.messageId ? 1 : -1;
};

const mergeNewestFirst = (
  local: readonly ProjectMessengerTimelineEntry[],
  neon: readonly ProjectMessengerTimelineEntry[],
): ProjectMessengerTimelineEntry[] => {
  const byId = new Map<string, ProjectMessengerTimelineEntry>();
  for (const entry of neon) {
    byId.set(entry.messageId, entry);
  }
  for (const entry of local) {
    byId.set(entry.messageId, entry);
  }
  return [...byId.values()].sort(byNewestFirst);
};

const pageCursorOf = (
  entries: readonly ProjectMessengerTimelineEntry[],
): string | null => {
  const oldest = entries.at(-1);
  if (oldest === undefined) return null;
  return encodeProjectMessengerCursor({
    t: oldest.createdAt,
    id: oldest.messageId,
  });
};

/**
 * Pick the load-older / open page from local + Neon slices (both newest-first).
 * Offline error only when `before` was requested, both empty, and !localLive.
 */
export const resolveProjectMessengerLoadPage = (input: {
  readonly localEntries: readonly ProjectMessengerTimelineEntry[];
  readonly localHasMore: boolean;
  readonly neonEntries: readonly ProjectMessengerTimelineEntry[];
  readonly neonHasMore: boolean;
  readonly localLive: boolean;
  readonly beforeRequested: boolean;
  readonly limit: number;
}): {
  readonly entries: readonly ProjectMessengerTimelineEntry[];
  readonly page: ProjectMessengerPageMeta;
  readonly error?: ProjectMessengerOfflineError;
} => {
  const merged = mergeNewestFirst(input.localEntries, input.neonEntries);
  const hasLocal = input.localEntries.length > 0;
  const hasNeon = input.neonEntries.length > 0;

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
        error: PROJECT_MESSENGER_COMPUTER_OFFLINE_ERROR,
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

  const source: ProjectMessengerPageSource =
    hasLocal && hasNeon ? "mixed" : hasLocal ? "local" : "neon";
  const sliced = merged.slice(0, input.limit);
  const hasMore =
    merged.length > input.limit || input.localHasMore || input.neonHasMore;

  return {
    entries: sliced,
    page: {
      beforeCursor: pageCursorOf(sliced),
      hasMore,
      source,
      localLive: input.localLive,
    },
  };
};
