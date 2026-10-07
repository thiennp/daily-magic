import { detectProjectMessengerLocalLive } from "@/lib/projects/acl/messaging/messenger/detectProjectMessengerLocalLive";
import { ensureProjectMessengerSchema } from "@/lib/projects/acl/messaging/messenger/ensureProjectMessengerSchema";
import { loadProjectMessengerBots } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerBots";
import { loadProjectMessengerNeonThreadPage } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerNeonThreadPage";
import { loadProjectMessengerOlderFromLocal } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerOlderFromLocal";
import { markProjectMessengerThreadRead } from "@/lib/projects/acl/messaging/messenger/markProjectMessengerThreadRead";
import {
  PROJECT_MESSENGER_PAGE_DEFAULT_LIMIT,
  PROJECT_MESSENGER_WHOLE_THREAD_KEY,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import {
  encodeProjectMessengerCursor,
  type ProjectMessengerCursor,
} from "@/lib/projects/acl/messaging/messenger/projectMessengerCursor";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import {
  resolveProjectMessengerLoadPage,
  type ProjectMessengerOfflineError,
  type ProjectMessengerPageMeta,
} from "@/lib/projects/acl/messaging/messenger/resolveProjectMessengerLoadPage";
import { resolveProjectMessengerViewer } from "@/lib/projects/acl/messaging/messenger/resolveProjectMessengerViewer";

export type OpenProjectMessengerThreadResult =
  | {
      readonly ok: true;
      readonly threadKey: string;
      readonly entries: readonly ProjectMessengerTimelineEntry[];
      readonly page: ProjectMessengerPageMeta;
      readonly error?: ProjectMessengerOfflineError;
      readonly canSend: boolean;
    }
  | {
      readonly ok: false;
      readonly code: "not_found" | "forbidden" | "thread_not_found";
    };

/**
 * Orchestrator: viewer gate → localLive → History local read / Neon page →
 * newest-first entries + page meta. Opening the newest page (no before)
 * marks read up to the newest visible message. Load-older past Neon while
 * the project computer is offline returns error project_computer_offline.
 */
export const openProjectMessengerThread = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly threadKey: string;
  readonly before?: ProjectMessengerCursor | null;
  readonly limit?: number;
}): Promise<OpenProjectMessengerThreadResult> => {
  const viewer = await resolveProjectMessengerViewer(input);
  if (!viewer.ok) {
    return viewer;
  }
  await ensureProjectMessengerSchema();

  if (input.threadKey !== PROJECT_MESSENGER_WHOLE_THREAD_KEY) {
    const bots = await loadProjectMessengerBots(viewer.projectId);
    if (!bots.some((bot) => bot.membershipId === input.threadKey)) {
      return { ok: false, code: "thread_not_found" };
    }
  }

  const before = input.before ?? null;
  const limit = input.limit ?? PROJECT_MESSENGER_PAGE_DEFAULT_LIMIT;
  const localLive = await detectProjectMessengerLocalLive({
    projectId: viewer.projectId,
    ownerUserId: viewer.ownerUserId,
  });

  const beforeRaw =
    before === null ? undefined : encodeProjectMessengerCursor(before);

  const localPage = localLive
    ? await loadProjectMessengerOlderFromLocal({
        projectId: viewer.projectId,
        threadKey: input.threadKey,
        beforeCursor: beforeRaw,
        limit,
        ownerUserId: viewer.ownerUserId,
      })
    : { entries: [], nextBeforeCursor: null, hasMore: false };

  const neonPage = await loadProjectMessengerNeonThreadPage({
    projectId: viewer.projectId,
    ownerUserId: viewer.ownerUserId,
    threadKey: input.threadKey,
    before,
    limit,
  });

  const resolved = resolveProjectMessengerLoadPage({
    localEntries: localPage.entries,
    localHasMore: localPage.hasMore,
    neonEntries: neonPage.entries,
    neonHasMore: neonPage.hasMore,
    localLive,
    beforeRequested: before !== null,
    limit,
  });

  const newest = resolved.entries[0];
  if (before === null && newest !== undefined) {
    await markProjectMessengerThreadRead({
      userId: viewer.viewerUserId,
      projectId: viewer.projectId,
      threadKey: input.threadKey,
      lastReadMessageId: newest.messageId,
      lastReadAt: newest.createdAt,
    });
  }

  return {
    ok: true,
    threadKey: input.threadKey,
    entries: resolved.entries,
    page: resolved.page,
    ...(resolved.error !== undefined ? { error: resolved.error } : {}),
    canSend: viewer.canSend,
  };
};
