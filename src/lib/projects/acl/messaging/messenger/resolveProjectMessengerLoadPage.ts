import { loadMessengerTimelinePage } from "@/features/projects/sync/adapters/messengerTimelineAdapter";
import {
  PROJECT_SYNC_COMPUTER_OFFLINE_ERROR,
  type ProjectSyncOfflineError,
  type ProjectSyncPageMeta,
  type ProjectSyncPageSource,
} from "@/features/projects/sync/projectSync.types";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

/** Live Messenger sources (+ additive "idb" from module pager). */
export type ProjectMessengerPageSource = ProjectSyncPageSource;

export type ProjectMessengerPageMeta = ProjectSyncPageMeta;

export type ProjectMessengerOfflineError = ProjectSyncOfflineError;

/** Exact offline constant — same code + EN as module / Dispatch LOCKED. */
export const PROJECT_MESSENGER_COMPUTER_OFFLINE_ERROR: ProjectMessengerOfflineError =
  PROJECT_SYNC_COMPUTER_OFFLINE_ERROR;

/**
 * Pick the load-older / open page from local + Neon slices (both newest-first).
 * Thin re-export over project sync `loadPage` (idbEntries empty for live path).
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
} =>
  loadMessengerTimelinePage({
    idbEntries: [],
    localEntries: input.localEntries,
    localHasMore: input.localHasMore,
    neonEntries: input.neonEntries,
    neonHasMore: input.neonHasMore,
    localLive: input.localLive,
    beforeRequested: input.beforeRequested,
    limit: input.limit,
  });
