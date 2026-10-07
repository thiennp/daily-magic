import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { checkProjectMessageSilence } from "@/lib/projects/acl/messaging/checkProjectMessageSilence";
import { buildProjectMessengerTimeline } from "@/lib/projects/acl/messaging/messenger/buildProjectMessengerTimeline";
import { groupProjectMessengerDeliveries } from "@/lib/projects/acl/messaging/messenger/groupProjectMessengerDeliveries";
import { keyProjectMessengerRows } from "@/lib/projects/acl/messaging/messenger/keyProjectMessengerRows";
import { loadProjectMessengerBots } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerBots";
import { loadProjectMessengerDeliveries } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerDeliveries";
import { loadProjectMessengerNeonAgentRunsPage } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerNeonAgentRunsPage";
import type { ProjectMessengerNoticeViewer } from "@/lib/projects/acl/messaging/messenger/isProjectMessengerNoticeRow";
import { mapProjectMessengerRow } from "@/lib/projects/acl/messaging/messenger/mapProjectMessengerRow";
import { mergeProjectMessengerNeonTimelinePage } from "@/lib/projects/acl/messaging/messenger/mergeProjectMessengerNeonTimelinePage";
import {
  PROJECT_MESSENGER_ROW_LIMIT,
  PROJECT_MESSENGER_WHOLE_THREAD_KEY,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import type { ProjectMessengerCursor } from "@/lib/projects/acl/messaging/messenger/projectMessengerCursor";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import { selectProjectMessengerNeonRows } from "@/lib/projects/acl/messaging/messenger/selectProjectMessengerNeonRows";
import { purgeExpiredProjectMessages } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";

export type LoadProjectMessengerNeonThreadPageResult = {
  readonly entries: readonly ProjectMessengerTimelineEntry[];
  readonly hasMore: boolean;
};

/**
 * Neon short-term window for one thread, newest-first.
 * Keyset: rows with (created_at, id) older than `before` (exclusive).
 * Over-fetches project-wide then filters to the thread (no chat_key column yet).
 * On `whole`, also merges agent_runs session entries (v1 whole-only).
 * `includeBotToBot` (owner only, DF-023): bot↔bot rows join `whole` as
 * compact `peer` entries. Default off (members / module callers unchanged).
 * `notices` (thread GET): notice rows for that viewer (see keyProjectMessengerRows).
 */
export const loadProjectMessengerNeonThreadPage = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly threadKey: string;
  readonly before: ProjectMessengerCursor | null;
  readonly limit: number;
  readonly includeBotToBot?: boolean;
  readonly notices?: ProjectMessengerNoticeViewer;
}): Promise<LoadProjectMessengerNeonThreadPageResult> => {
  await ensureProjectAclSchema();
  await purgeExpiredProjectMessages();
  await checkProjectMessageSilence({ now: new Date() });

  const fetchLimit =
    input.before === null
      ? PROJECT_MESSENGER_ROW_LIMIT
      : Math.min(
          PROJECT_MESSENGER_ROW_LIMIT,
          Math.max(input.limit * 8, input.limit + 1),
        );
  const rows = await selectProjectMessengerNeonRows({
    projectId: input.projectId,
    before: input.before,
    fetchLimit,
  });

  const mapped = rows.map((row) => {
    const entry = mapProjectMessengerRow(row, input.ownerUserId);
    const cursorAt =
      typeof row.cursor_at === "string" ? row.cursor_at : entry.createdAt;
    return { ...entry, createdAt: cursorAt };
  });

  const bots = await loadProjectMessengerBots(input.projectId);
  const botsById = new Map(bots.map((bot) => [bot.membershipId, bot]));
  const deliveries = await loadProjectMessengerDeliveries(input.projectId);
  const grouped = groupProjectMessengerDeliveries(deliveries);
  const keyed = keyProjectMessengerRows({
    rows: mapped,
    botIds: new Set(bots.map((bot) => bot.membershipId)),
    includeBotToBot: input.includeBotToBot === true,
    ...(input.notices !== undefined ? { notices: input.notices } : {}),
  });
  const timeline = buildProjectMessengerTimeline({
    threadKey: input.threadKey,
    keyed,
    deliveriesByMessage: grouped.byMessage,
    botsById,
  });

  const messageHasMore =
    timeline.length > input.limit || rows.length >= fetchLimit;
  const messageEntries = timeline.slice(0, input.limit);

  if (input.threadKey !== PROJECT_MESSENGER_WHOLE_THREAD_KEY) {
    return {
      entries: messageEntries,
      hasMore: messageHasMore,
    };
  }

  const sessionPage = await loadProjectMessengerNeonAgentRunsPage({
    projectId: input.projectId,
    before: input.before,
    limit: input.limit,
  });

  return mergeProjectMessengerNeonTimelinePage({
    messageEntries,
    messageHasMore,
    sessionEntries: sessionPage.entries,
    sessionHasMore: sessionPage.hasMore,
    limit: input.limit,
  });
};
