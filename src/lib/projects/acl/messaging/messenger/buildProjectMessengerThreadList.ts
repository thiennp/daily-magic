import { deriveProjectMessengerBotStatus } from "@/lib/projects/acl/messaging/messenger/deriveProjectMessengerBotStatus";
import { PROJECT_MESSENGER_WHOLE_THREAD_KEY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import type {
  ProjectMessengerBot,
  ProjectMessengerDelivery,
  ProjectMessengerKeyedRow,
  ProjectMessengerThreadList,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import { summarizeProjectMessengerThread } from "@/lib/projects/acl/messaging/messenger/summarizeProjectMessengerThread";

/**
 * Thread list: Whole project (pinned, first) + one thread per active bot in
 * the order given. No person threads in v1.
 */
export const buildProjectMessengerThreadList = (input: {
  readonly bots: readonly ProjectMessengerBot[];
  readonly keyed: readonly ProjectMessengerKeyedRow[];
  readonly deliveriesByMembership: ReadonlyMap<
    string,
    readonly ProjectMessengerDelivery[]
  >;
  readonly latestWakeByMembership: ReadonlyMap<string, string>;
  readonly lastReadAtByThread: ReadonlyMap<string, string>;
  readonly viewerUserId: string;
  readonly canSend: boolean;
}): ProjectMessengerThreadList => {
  const summarize = (threadKey: string) =>
    summarizeProjectMessengerThread({
      rows: input.keyed.filter((keyed) => keyed.threadKey === threadKey),
      lastReadAt: input.lastReadAtByThread.get(threadKey) ?? null,
      viewerUserId: input.viewerUserId,
    });
  return {
    wholeProject: summarize(PROJECT_MESSENGER_WHOLE_THREAD_KEY),
    bots: input.bots.map((bot) => ({
      membershipId: bot.membershipId,
      displayName: bot.displayName,
      status: deriveProjectMessengerBotStatus({
        states: (input.deliveriesByMembership.get(bot.membershipId) ?? []).map(
          (delivery) => delivery.b2bState,
        ),
        latestWakeResult:
          input.latestWakeByMembership.get(bot.membershipId) ?? null,
      }),
      ...summarize(bot.membershipId),
    })),
    canSend: input.canSend,
  };
};
