import { buildProjectMessengerStateChips } from "@/lib/projects/acl/messaging/messenger/buildProjectMessengerStateChips";
import { indexProjectMessengerReplies } from "@/lib/projects/acl/messaging/messenger/indexProjectMessengerReplies";
import { projectMessengerArchiveMetaOf } from "@/lib/projects/acl/messaging/messenger/projectMessengerArchiveMetaOf";
import { PROJECT_MESSENGER_KIND_NEEDS_REPLY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import type {
  ProjectMessengerBot,
  ProjectMessengerDelivery,
  ProjectMessengerKeyedRow,
  ProjectMessengerLinkedReply,
  ProjectMessengerThreadKey,
  ProjectMessengerTimelineEntry,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

const NO_REPLIES: ReadonlyMap<string, ProjectMessengerLinkedReply> = new Map();

/**
 * One thread's timeline in the same order as `keyed` (callers pass
 * newest-first for Meta-style open/load-older). Owner/member bubbles with
 * per-bot state chips underneath, and bot reply bubbles. State-only bot rows
 * feed the chips but are not bubbles. Owner-view bot↔bot rows carry `peer`
 * (DF-023) and render as compact lines. System rows only appear as keyed
 * notice rows (thread GET). Archived rows carry `archived` meta.
 */
export const buildProjectMessengerTimeline = (input: {
  readonly threadKey: ProjectMessengerThreadKey;
  readonly keyed: readonly ProjectMessengerKeyedRow[];
  readonly deliveriesByMessage: ReadonlyMap<
    string,
    readonly ProjectMessengerDelivery[]
  >;
  readonly botsById: ReadonlyMap<string, ProjectMessengerBot>;
}): readonly ProjectMessengerTimelineEntry[] => {
  const replies = indexProjectMessengerReplies(input.keyed);
  return input.keyed
    .filter((keyed) => keyed.threadKey === input.threadKey && keyed.visible)
    .flatMap(({ row, text, inReplyTo, peer, notice }) => {
      if (row.senderKind === "system" && notice !== true) {
        return [];
      }
      const fromHuman =
        notice !== true &&
        (row.senderKind === "owner" || row.senderKind === "member");
      const peerField = peer !== undefined ? { peer } : {};
      const archived = projectMessengerArchiveMetaOf(row);
      const needsReply =
        fromHuman && row.kind === PROJECT_MESSENGER_KIND_NEEDS_REPLY;
      return [
        {
          messageId: row.messageId,
          createdAt: row.createdAt,
          author: {
            kind: row.senderKind,
            membershipId: row.senderMembershipId,
            displayName: row.senderDisplayName,
          },
          kind: row.kind,
          text,
          needsReply,
          inReplyTo,
          states: fromHuman
            ? buildProjectMessengerStateChips({
                deliveries: input.deliveriesByMessage.get(row.messageId) ?? [],
                botsById: input.botsById,
                replies: replies.get(row.messageId) ?? NO_REPLIES,
                needsReply,
              })
            : [],
          ...peerField,
          ...(archived !== null ? { archived } : {}),
        },
      ];
    });
};
