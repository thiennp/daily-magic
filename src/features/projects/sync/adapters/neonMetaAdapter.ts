/**
 * Generic Neon meta adapter — Dispatch `pageNeon` port (SPEC §1.2 / §7).
 * Wraps live Messenger Neon loaders (579b18ff); does not duplicate them.
 * Behind AWC_PROJECT_SYNC_MODULE for Tasks wiring; Messenger Load older stays
 * on today's direct imports when the flag is off.
 */

import { loadProjectMessengerNeonAgentRunsPage } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerNeonAgentRunsPage";
import { loadProjectMessengerNeonThreadPage } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerNeonThreadPage";
import { mapAgentRunToMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/mapAgentRunToMessengerTimelineEntry";
import { mergeProjectMessengerNeonTimelinePage } from "@/lib/projects/acl/messaging/messenger/mergeProjectMessengerNeonTimelinePage";
import type { ProjectMessengerCursor } from "@/lib/projects/acl/messaging/messenger/projectMessengerCursor";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import { isProjectSyncModuleEnabled } from "@/features/projects/sync/projectSyncFlag";

export type NeonMetaPageResult<T> = {
  readonly entries: readonly T[];
  readonly hasMore: boolean;
};

export type PageNeonMessengerTimelineInput = {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly threadKey: string;
  readonly before: ProjectMessengerCursor | null;
  readonly limit: number;
};

/**
 * pageNeon for Messenger timeline — thin wrap of live Neon thread page
 * (messages + whole-thread agent_runs merge).
 */
export const pageNeonMessengerTimeline = async (
  input: PageNeonMessengerTimelineInput,
): Promise<NeonMetaPageResult<ProjectMessengerTimelineEntry>> =>
  loadProjectMessengerNeonThreadPage(input);

/**
 * pageNeon for Neon agent_runs session rows only (whole-thread meta path).
 */
export const pageNeonAgentRunSessions = async (input: {
  readonly projectId: string;
  readonly before: ProjectMessengerCursor | null;
  readonly limit: number;
}): Promise<NeonMetaPageResult<ProjectMessengerTimelineEntry>> =>
  loadProjectMessengerNeonAgentRunsPage(input);

/** Re-export live merge/map so callers import one Dispatch port. */
export const mergeNeonMessengerTimelinePage =
  mergeProjectMessengerNeonTimelinePage;
export const mapNeonAgentRunToTimelineEntry =
  mapAgentRunToMessengerTimelineEntry;

/**
 * Flag-gated Neon page selector. Off → same live function (today's wiring).
 * On → same live function via this port (identical behavior; Tasks also uses
 * the module path).
 */
export const resolvePageNeonMessengerTimeline = (
  env: NodeJS.ProcessEnv = process.env,
): typeof pageNeonMessengerTimeline => {
  // Flag gates Tasks consumers; Messenger behavior is unchanged either way.
  void isProjectSyncModuleEnabled(env);
  return pageNeonMessengerTimeline;
};

export const neonMetaAdapter = {
  pageNeonMessengerTimeline,
  pageNeonAgentRunSessions,
  mergeNeonMessengerTimelinePage,
  mapNeonAgentRunToTimelineEntry,
} as const;
