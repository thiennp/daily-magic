import { describe, expect, it } from "vitest";

import { buildProjectMessengerThreadList } from "@/lib/projects/acl/messaging/messenger/buildProjectMessengerThreadList";
import { keyProjectMessengerRows } from "@/lib/projects/acl/messaging/messenger/keyProjectMessengerRows";
import {
  botReplyRow,
  MESSENGER_BOT_IDS,
  MESSENGER_BOTS,
  MESSENGER_OWNER,
  MESSENGER_PLANNER,
  MESSENGER_RESEARCH,
  ownerRow,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.fixtures";

const DIRECT_ID = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";

describe("buildProjectMessengerThreadList", () => {
  const keyed = keyProjectMessengerRows({
    botIds: MESSENGER_BOT_IDS,
    rows: [
      ownerRow(DIRECT_ID),
      botReplyRow("r1", MESSENGER_PLANNER, `${DIRECT_ID}: found one`, {
        createdAt: "2026-10-05T08:01:00.000Z",
      }),
      botReplyRow("r2", MESSENGER_PLANNER, `${DIRECT_ID}: found two`, {
        createdAt: "2026-10-05T08:02:00.000Z",
      }),
    ],
  });
  const list = buildProjectMessengerThreadList({
    bots: MESSENGER_BOTS,
    keyed,
    deliveriesByMembership: new Map([
      [
        MESSENGER_PLANNER,
        [
          {
            messageId: DIRECT_ID,
            membershipId: MESSENGER_PLANNER,
            b2bState: "processing",
          },
        ],
      ],
    ]),
    latestWakeByMembership: new Map([[MESSENGER_RESEARCH, "fetch_failed"]]),
    lastReadAtByThread: new Map([
      [MESSENGER_PLANNER, "2026-10-05T08:01:00.000Z"],
    ]),
    viewerUserId: MESSENGER_OWNER,
    canSend: true,
  });

  it("Whole project first, then bots with status, preview, unread", () => {
    expect(list.wholeProject).toEqual({
      lastMessageAt: null,
      lastPreview: null,
      unreadCount: 0,
    });
    expect(list.bots).toEqual([
      {
        membershipId: MESSENGER_PLANNER,
        displayName: "Planner bot",
        status: "working",
        lastMessageAt: "2026-10-05T08:02:00.000Z",
        lastPreview: "found two",
        unreadCount: 1,
      },
      {
        membershipId: MESSENGER_RESEARCH,
        displayName: "Research bot",
        status: "silent",
        lastMessageAt: null,
        lastPreview: null,
        unreadCount: 0,
      },
    ]);
    expect(list.canSend).toBe(true);
  });
});
