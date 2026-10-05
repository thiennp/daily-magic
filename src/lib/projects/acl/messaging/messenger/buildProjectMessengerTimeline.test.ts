import { describe, expect, it } from "vitest";

import { buildProjectMessengerTimeline } from "@/lib/projects/acl/messaging/messenger/buildProjectMessengerTimeline";
import { keyProjectMessengerRows } from "@/lib/projects/acl/messaging/messenger/keyProjectMessengerRows";
import {
  botReplyRow,
  MESSENGER_BOT_IDS,
  MESSENGER_BOTS,
  MESSENGER_PLANNER,
  MESSENGER_RESEARCH,
  ownerRow,
  WHOLE_ADDRESS,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.fixtures";

const WHOLE_ID = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";

describe("buildProjectMessengerTimeline (Whole project)", () => {
  const keyed = keyProjectMessengerRows({
    botIds: MESSENGER_BOT_IDS,
    rows: [
      ownerRow(WHOLE_ID, WHOLE_ADDRESS),
      botReplyRow("r1", MESSENGER_PLANNER, `processing ${WHOLE_ID}`, {
        kind: "task.received",
      }),
      botReplyRow("r2", MESSENGER_RESEARCH, `${WHOLE_ID}: no campsites left`, {
        kind: "task.blocked",
      }),
    ],
  });
  const entries = buildProjectMessengerTimeline({
    threadKey: "whole",
    keyed,
    botsById: new Map(MESSENGER_BOTS.map((bot) => [bot.membershipId, bot])),
    deliveriesByMessage: new Map([
      [
        WHOLE_ID,
        [
          {
            messageId: WHOLE_ID,
            membershipId: MESSENGER_PLANNER,
            b2bState: "processing",
          },
          {
            messageId: WHOLE_ID,
            membershipId: MESSENGER_RESEARCH,
            b2bState: "blocked",
          },
        ],
      ],
    ]),
  });

  it("one owner bubble with one state chip per bot", () => {
    expect(entries[0]).toMatchObject({
      messageId: WHOLE_ID,
      author: { kind: "owner", displayName: "Owner" },
      needsReply: true,
      states: [
        {
          membershipId: MESSENGER_PLANNER,
          displayName: "Planner bot",
          state: "got_it",
          reason: null,
        },
        {
          membershipId: MESSENGER_RESEARCH,
          displayName: "Research bot",
          state: "blocked",
          reason: "no campsites left",
        },
      ],
    });
  });

  it("bot reply is its own bubble; state-only receipts are not bubbles", () => {
    expect(entries.map((entry) => entry.messageId)).toEqual([WHOLE_ID, "r2"]);
    expect(entries[1]).toMatchObject({
      author: { kind: "bot", membershipId: MESSENGER_RESEARCH },
      inReplyTo: WHOLE_ID,
      states: [],
    });
  });
});
