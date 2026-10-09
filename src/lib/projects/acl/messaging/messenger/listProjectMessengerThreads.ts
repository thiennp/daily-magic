import { buildProjectMessengerThreadList } from "@/lib/projects/acl/messaging/messenger/buildProjectMessengerThreadList";
import { ensureProjectMessengerSchema } from "@/lib/projects/acl/messaging/messenger/ensureProjectMessengerSchema";
import { canViewerMessageBot } from "@/lib/projects/acl/messaging/canViewerMessageBot";
import { loadClosedBotSeats } from "@/lib/projects/acl/messaging/messenger/loadClosedBotSeats";
import { loadProjectMessengerReads } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerReads";
import { loadProjectMessengerSnapshot } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerSnapshot";
import type { ProjectMessengerThreadList } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import { resolveProjectMessengerViewer } from "@/lib/projects/acl/messaging/messenger/resolveProjectMessengerViewer";

export type ListProjectMessengerThreadsResult =
  | { readonly ok: true; readonly threads: ProjectMessengerThreadList }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

/** Orchestrator: viewer gate → snapshot → viewer's reads → thread list. Read-only. */
export const listProjectMessengerThreads = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<ListProjectMessengerThreadsResult> => {
  const viewer = await resolveProjectMessengerViewer(input);
  if (!viewer.ok) {
    return viewer;
  }
  await ensureProjectMessengerSchema();
  const snapshot = await loadProjectMessengerSnapshot(viewer);
  const lastReadAtByThread = await loadProjectMessengerReads({
    userId: viewer.viewerUserId,
    projectId: viewer.projectId,
  });
  const closed = await loadClosedBotSeats(viewer.projectId);
  const threads = buildProjectMessengerThreadList({
    ...snapshot,
    lastReadAtByThread,
    viewerUserId: viewer.viewerUserId,
    canSend: viewer.canSend,
  });
  return {
    ok: true,
    // A closed assistant is offered only to the person who invited it.
    threads: {
      ...threads,
      bots: threads.bots.filter((bot) =>
        canViewerMessageBot(
          {
            closed: closed.has(bot.membershipId),
            invitedByUserId: closed.get(bot.membershipId) ?? null,
          },
          viewer.viewerUserId,
        ),
      ),
    },
  };
};
