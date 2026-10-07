/**
 * Thin Messenger timeline adapter — wraps live messenger page fns onto module pager.
 * Does not change openProjectMessengerThread / Load older behavior.
 */

import { encodeProjectSyncCursor } from "@/features/projects/sync/projectSyncCursor";
import {
  loadPage,
  type ProjectSyncLoadPageResult,
} from "@/features/projects/sync/projectSyncPager";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

export const MESSENGER_TIMELINE_TABLE_ID = "messenger_timeline";
export const MESSENGER_TIMELINE_SCHEMA_VERSION = 1;

export const keyOfMessengerTimelineEntry = (
  entry: ProjectMessengerTimelineEntry,
): string => entry.messageId;

export const createdAtOfMessengerTimelineEntry = (
  entry: ProjectMessengerTimelineEntry,
): string => entry.createdAt;

/**
 * Resolve a Messenger load-older / open page via the generic pager.
 * Pass idbEntries: [] for identical live server behavior (IDB is client-side today).
 * Cursor encode = v1 History/Messenger schema (projectSyncCursor).
 */
export const loadMessengerTimelinePage = (input: {
  readonly idbEntries?: readonly ProjectMessengerTimelineEntry[];
  readonly localEntries: readonly ProjectMessengerTimelineEntry[];
  readonly localHasMore: boolean;
  readonly neonEntries: readonly ProjectMessengerTimelineEntry[];
  readonly neonHasMore: boolean;
  readonly localLive: boolean;
  readonly beforeRequested: boolean;
  readonly limit: number;
}): ProjectSyncLoadPageResult<ProjectMessengerTimelineEntry> =>
  loadPage({
    idbEntries: input.idbEntries ?? [],
    localEntries: input.localEntries,
    localHasMore: input.localHasMore,
    neonEntries: input.neonEntries,
    neonHasMore: input.neonHasMore,
    localLive: input.localLive,
    beforeRequested: input.beforeRequested,
    limit: input.limit,
    keyOf: keyOfMessengerTimelineEntry,
    createdAtOf: createdAtOfMessengerTimelineEntry,
    encodeCursor: encodeProjectSyncCursor,
  });

export const messengerTimelineAdapter = {
  tableId: MESSENGER_TIMELINE_TABLE_ID,
  schemaVersion: MESSENGER_TIMELINE_SCHEMA_VERSION,
  keyOf: keyOfMessengerTimelineEntry,
  createdAtOf: createdAtOfMessengerTimelineEntry,
  loadPage: loadMessengerTimelinePage,
} as const;
