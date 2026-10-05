import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { ensureProjectMessengerSchema } from "@/lib/projects/acl/messaging/messenger/ensureProjectMessengerSchema";
import { loadProjectMessengerBots } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerBots";
import { markProjectMessengerThreadRead } from "@/lib/projects/acl/messaging/messenger/markProjectMessengerThreadRead";
import { PROJECT_MESSENGER_WHOLE_THREAD_KEY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import { resolveProjectMessengerViewer } from "@/lib/projects/acl/messaging/messenger/resolveProjectMessengerViewer";

export type MarkProjectMessengerThreadReadResult =
  | { readonly ok: true; readonly threadKey: string }
  | {
      readonly ok: false;
      readonly code: "not_found" | "forbidden" | "thread_not_found";
    };

/**
 * Orchestrator for explicit "mark read" (e.g. thread already open when new
 * messages arrive): viewer gate → thread exists → last read = now.
 * Viewers may mark read (unread is per user). Never acks.
 */
export const markProjectMessengerThreadReadForViewer = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly threadKey: string;
}): Promise<MarkProjectMessengerThreadReadResult> => {
  const viewer = await resolveProjectMessengerViewer(input);
  if (!viewer.ok) {
    return viewer;
  }
  await ensureProjectAclSchema();
  await ensureProjectMessengerSchema();
  const bots = await loadProjectMessengerBots(input.projectId);
  if (
    input.threadKey !== PROJECT_MESSENGER_WHOLE_THREAD_KEY &&
    !bots.some((bot) => bot.membershipId === input.threadKey)
  ) {
    return { ok: false, code: "thread_not_found" };
  }
  await markProjectMessengerThreadRead({
    userId: input.actorUserId,
    projectId: input.projectId,
    threadKey: input.threadKey,
    lastReadMessageId: null,
    lastReadAt: null,
  });
  return { ok: true, threadKey: input.threadKey };
};
