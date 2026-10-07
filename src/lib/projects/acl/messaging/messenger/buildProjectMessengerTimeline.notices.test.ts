import { describe, expect, it } from "vitest";

import { buildProjectMessengerTimeline } from "@/lib/projects/acl/messaging/messenger/buildProjectMessengerTimeline";
import { keyProjectMessengerRows } from "@/lib/projects/acl/messaging/messenger/keyProjectMessengerRows";
import {
  MESSENGER_BOT_IDS,
  MESSENGER_BOTS,
  MESSENGER_PLANNER,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.fixtures";
import {
  NOTICE_ROWS,
  NOTICE_TASK_ID,
} from "@/lib/projects/acl/messaging/messenger/projectMessengerNotice.fixtures";

const botsById = new Map(MESSENGER_BOTS.map((bot) => [bot.membershipId, bot]));
const deliveriesByMessage = new Map([
  [
    NOTICE_TASK_ID,
    [
      {
        messageId: NOTICE_TASK_ID,
        membershipId: MESSENGER_PLANNER,
        b2bState: null,
      },
    ],
  ],
]);

const build = (threadKey: string, rows = NOTICE_ROWS) =>
  buildProjectMessengerTimeline({
    threadKey,
    keyed: keyProjectMessengerRows({
      rows,
      botIds: MESSENGER_BOT_IDS,
      notices: "owner",
    }),
    deliveriesByMessage,
    botsById,
  });

describe("buildProjectMessengerTimeline notice + archive rows", () => {
  it("a system notice is an entry with author kind system and no chips", () => {
    const notice = build(MESSENGER_PLANNER).find(
      (entry) => entry.messageId === "n-silent",
    );
    expect(notice).toMatchObject({
      author: { kind: "system", membershipId: null, displayName: "System" },
      kind: "peer.silent",
      needsReply: false,
      inReplyTo: NOTICE_TASK_ID,
      states: [],
    });
  });

  it("a notice never moves the parent's delivery chip", () => {
    const withNotice = build(MESSENGER_PLANNER).find(
      (entry) => entry.messageId === NOTICE_TASK_ID,
    );
    const without = build(MESSENGER_PLANNER, NOTICE_ROWS.slice(0, 1)).find(
      (entry) => entry.messageId === NOTICE_TASK_ID,
    );
    expect(withNotice?.states).toEqual(without?.states);
  });

  it("archived rows carry archive meta; others leave it out", () => {
    const [task, ...rest] = NOTICE_ROWS;
    const archivedRows = [
      {
        ...task,
        archivedAt: "2026-10-06T09:00:00.000Z",
        archivedBy: "user-jordan",
        archivedByDisplayName: "Owner",
      },
      ...rest,
    ];
    const entries = build(MESSENGER_PLANNER, archivedRows);
    expect(
      entries.find((e) => e.messageId === NOTICE_TASK_ID)?.archived,
    ).toEqual({
      at: "2026-10-06T09:00:00.000Z",
      byUserId: "user-jordan",
      byDisplayName: "Owner",
    });
    expect(entries.find((e) => e.messageId === "n-silent")).not.toHaveProperty(
      "archived",
    );
  });
});
