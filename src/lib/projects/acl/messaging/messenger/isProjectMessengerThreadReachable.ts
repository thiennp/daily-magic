import { canViewerMessageBot } from "@/lib/projects/acl/messaging/canViewerMessageBot";
import { loadClosedBotSeats } from "@/lib/projects/acl/messaging/messenger/loadClosedBotSeats";
import { loadProjectMessengerBots } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerBots";
import { PROJECT_MESSENGER_WHOLE_THREAD_KEY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";

/**
 * May this person open the thread? A bot thread must exist, and a closed assistant is
 * reachable only by the person who invited it (no owner exemption). Whole project is
 * reachable unless every bot in it is closed to them.
 */
export const isProjectMessengerThreadReachable = async (input: {
  readonly projectId: string;
  readonly threadKey: string;
  readonly viewerUserId: string;
}): Promise<boolean> => {
  const [bots, closed] = await Promise.all([
    loadProjectMessengerBots(input.projectId),
    loadClosedBotSeats(input.projectId),
  ]);
  const canOpen = (membershipId: string): boolean =>
    canViewerMessageBot(
      {
        closed: closed.has(membershipId),
        invitedByUserId: closed.get(membershipId) ?? null,
      },
      input.viewerUserId,
    );
  if (input.threadKey === PROJECT_MESSENGER_WHOLE_THREAD_KEY) {
    return bots.length === 0 || bots.some((bot) => canOpen(bot.membershipId));
  }
  return bots.some(
    (bot) => bot.membershipId === input.threadKey && canOpen(bot.membershipId),
  );
};
