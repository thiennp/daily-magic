import { buildProjectMessengerTimeline } from "@/lib/projects/acl/messaging/messenger/buildProjectMessengerTimeline";
import { ensureProjectMessengerSchema } from "@/lib/projects/acl/messaging/messenger/ensureProjectMessengerSchema";
import { loadProjectMessengerSnapshot } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerSnapshot";
import { markProjectMessengerThreadRead } from "@/lib/projects/acl/messaging/messenger/markProjectMessengerThreadRead";
import { PROJECT_MESSENGER_WHOLE_THREAD_KEY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import { resolveProjectMessengerViewer } from "@/lib/projects/acl/messaging/messenger/resolveProjectMessengerViewer";

export type OpenProjectMessengerThreadResult =
  | {
      readonly ok: true;
      readonly threadKey: string;
      readonly entries: readonly ProjectMessengerTimelineEntry[];
      readonly canSend: boolean;
    }
  | {
      readonly ok: false;
      readonly code: "not_found" | "forbidden" | "thread_not_found";
    };

/**
 * Orchestrator: viewer gate → snapshot → timeline → mark read. Opening a
 * thread marks it read up to its newest visible message (not "now", so a
 * message landing mid-request stays unread). No ack, no read_at stamp.
 */
export const openProjectMessengerThread = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly threadKey: string;
}): Promise<OpenProjectMessengerThreadResult> => {
  const viewer = await resolveProjectMessengerViewer(input);
  if (!viewer.ok) {
    return viewer;
  }
  await ensureProjectMessengerSchema();
  const snapshot = await loadProjectMessengerSnapshot(viewer);
  if (
    input.threadKey !== PROJECT_MESSENGER_WHOLE_THREAD_KEY &&
    !snapshot.botsById.has(input.threadKey)
  ) {
    return { ok: false, code: "thread_not_found" };
  }
  const entries = buildProjectMessengerTimeline({
    ...snapshot,
    threadKey: input.threadKey,
  });
  const newest = entries.at(-1);
  if (newest !== undefined) {
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
    entries,
    canSend: viewer.canSend,
  };
};
