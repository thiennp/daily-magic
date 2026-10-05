import { PROJECT_MESSAGE_KIND_TASK_BLOCKED } from "@/lib/projects/acl/messaging/projectMessage.constants";
import { mapProjectMessengerDeliveryState } from "@/lib/projects/acl/messaging/messenger/mapProjectMessengerDeliveryState";
import type {
  ProjectMessengerBot,
  ProjectMessengerDelivery,
  ProjectMessengerLinkedReply,
  ProjectMessengerStateChip,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

/**
 * One owner/member message → one chip per bot delivery (Whole project: N
 * chips; bot thread: one). Deliveries to non-bot seats are skipped.
 */
export const buildProjectMessengerStateChips = (input: {
  readonly deliveries: readonly ProjectMessengerDelivery[];
  readonly botsById: ReadonlyMap<string, ProjectMessengerBot>;
  readonly replies: ReadonlyMap<string, ProjectMessengerLinkedReply>;
  readonly needsReply: boolean;
}): readonly ProjectMessengerStateChip[] =>
  input.deliveries.flatMap((delivery) => {
    const bot = input.botsById.get(delivery.membershipId);
    if (bot === undefined) {
      return [];
    }
    const reply = input.replies.get(delivery.membershipId) ?? null;
    const state = mapProjectMessengerDeliveryState({
      b2bState: delivery.b2bState,
      latestReplyKind: reply === null ? null : reply.kind,
      needsReply: input.needsReply,
    });
    return [
      {
        membershipId: bot.membershipId,
        displayName: bot.displayName,
        state,
        reason:
          state === "blocked" &&
          reply?.kind === PROJECT_MESSAGE_KIND_TASK_BLOCKED
            ? reply.text
            : null,
      },
    ];
  });
