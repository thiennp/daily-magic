import type { ProjectMessengerRow } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import {
  botReplyRow,
  MESSENGER_BOTS,
  MESSENGER_PLANNER,
  MESSENGER_RESEARCH,
  ownerRow,
  WHOLE_ADDRESS,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.fixtures";

/** DF-023 sample: Whole project send + bot↔bot dispatches + lifecycle fan-outs. */
export const B2B_WHOLE_ID = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";

const toResearch = {
  recipientKind: "bot" as const,
  toMembershipId: MESSENGER_RESEARCH,
  toUserId: "user-research",
  toDisplayName: "Research bot",
};

export const B2B_ROWS: readonly ProjectMessengerRow[] = [
  ownerRow(B2B_WHOLE_ID, WHOLE_ADDRESS),
  botReplyRow("b2b-status", MESSENGER_PLANNER, "handoff: compare prices", {
    ...toResearch,
    createdAt: "2026-10-05T08:06:00.000Z",
  }),
  botReplyRow("b2b-received", MESSENGER_RESEARCH, "got it", {
    kind: "task.received",
    recipientKind: "bot",
    toMembershipId: MESSENGER_PLANNER,
    toUserId: "user-planner",
    toDisplayName: "Planner bot",
    createdAt: "2026-10-05T08:07:00.000Z",
  }),
  botReplyRow("b2b-team", MESSENGER_PLANNER, "all bots: pause", {
    recipientKind: "none",
    toMembershipId: null,
    toUserId: null,
    toTeamLabel: "bots",
    createdAt: "2026-10-05T08:08:00.000Z",
  }),
  botReplyRow("b2b-join", MESSENGER_PLANNER, "Peer joined", {
    ...toResearch,
    kind: "peer.joined",
  }),
  botReplyRow("b2b-updated", MESSENGER_PLANNER, "Project updated", {
    ...toResearch,
    kind: "project.updated",
  }),
];

export const B2B_BOTS_BY_ID = new Map(
  MESSENGER_BOTS.map((bot) => [bot.membershipId, bot]),
);
