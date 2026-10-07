import type { ProjectMessengerRow } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import {
  botReplyRow,
  MESSENGER_OWNER,
  MESSENGER_PLANNER,
  MESSENGER_RESEARCH,
  ownerRow,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.fixtures";

/** Notice rows sample: owner task → Planner, silence notice, lifecycle fan-out. */
export const NOTICE_TASK_ID = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";

const systemRow = (
  messageId: string,
  overrides: Partial<ProjectMessengerRow>,
): ProjectMessengerRow => ({
  ...ownerRow(messageId),
  senderKind: "system",
  senderDisplayName: "System",
  ...overrides,
});

export const NOTICE_ROWS: readonly ProjectMessengerRow[] = [
  ownerRow(NOTICE_TASK_ID),
  systemRow("n-silent", {
    kind: "peer.silent",
    summary: `No activity from Planner bot for 5 min on ${NOTICE_TASK_ID}. Tell the user and ask Planner bot once.`,
    createdAt: "2026-10-05T08:10:00.000Z",
    recipientKind: "bot",
    toMembershipId: MESSENGER_RESEARCH,
    toUserId: "user-research",
  }),
  systemRow("n-sticky", {
    kind: "composer.recipient_sticky_cleared",
    summary: "Recipient sticky cleared: Research bot left the project.",
    createdAt: "2026-10-05T08:11:00.000Z",
    recipientKind: "owner",
    toMembershipId: null,
    toUserId: MESSENGER_OWNER,
  }),
  // peer.joined fans out one row per peer + one owner copy.
  botReplyRow("n-join-bot", MESSENGER_PLANNER, "Peer joined: Planner bot", {
    kind: "peer.joined",
    createdAt: "2026-10-05T08:12:00.000Z",
    recipientKind: "bot",
    toMembershipId: MESSENGER_RESEARCH,
    toUserId: "user-research",
  }),
  botReplyRow("n-join-owner", MESSENGER_PLANNER, "Peer joined: Planner bot", {
    kind: "peer.joined",
    createdAt: "2026-10-05T08:12:00.000Z",
  }),
];
