import { describe, expect, it } from "vitest";

import { buildProjectMessengerTimeline } from "@/lib/projects/acl/messaging/messenger/buildProjectMessengerTimeline";
import { keyProjectMessengerRows } from "@/lib/projects/acl/messaging/messenger/keyProjectMessengerRows";
import {
  MESSENGER_BOT_IDS,
  MESSENGER_OWNER,
  MESSENGER_PLANNER,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.fixtures";
import {
  B2B_BOTS_BY_ID,
  B2B_ROWS,
} from "@/lib/projects/acl/messaging/messenger/projectMessengerBotToBot.fixtures";
import { summarizeProjectMessengerThread } from "@/lib/projects/acl/messaging/messenger/summarizeProjectMessengerThread";

describe("buildProjectMessengerTimeline / summary bot↔bot (DF-023)", () => {
  it("owner timeline renders peer entries without state chips; members get none", () => {
    const ownerTimeline = buildProjectMessengerTimeline({
      threadKey: "whole",
      keyed: keyProjectMessengerRows({
        rows: B2B_ROWS,
        botIds: MESSENGER_BOT_IDS,
        includeBotToBot: true,
      }),
      deliveriesByMessage: new Map(),
      botsById: B2B_BOTS_BY_ID,
    });
    const peer = ownerTimeline.find(
      (entry) => entry.messageId === "b2b-status",
    );
    expect(peer).toMatchObject({
      author: { kind: "bot", membershipId: MESSENGER_PLANNER },
      text: "handoff: compare prices",
      states: [],
      peer: { toDisplayName: "Research bot" },
    });
    expect(
      ownerTimeline.filter((entry) => entry.peer !== undefined),
    ).toHaveLength(3);

    const memberTimeline = buildProjectMessengerTimeline({
      threadKey: "whole",
      keyed: keyProjectMessengerRows({
        rows: B2B_ROWS,
        botIds: MESSENGER_BOT_IDS,
      }),
      deliveriesByMessage: new Map(),
      botsById: B2B_BOTS_BY_ID,
    });
    expect(memberTimeline.some((entry) => entry.peer !== undefined)).toBe(
      false,
    );
  });

  it("bot↔bot rows never drive Whole project preview or unread", () => {
    const keyed = keyProjectMessengerRows({
      rows: B2B_ROWS,
      botIds: MESSENGER_BOT_IDS,
      includeBotToBot: true,
    }).filter((row) => row.threadKey === "whole");
    const summary = summarizeProjectMessengerThread({
      rows: keyed,
      lastReadAt: null,
      viewerUserId: MESSENGER_OWNER,
    });
    expect(summary.unreadCount).toBe(0);
    expect(summary.lastPreview).toBe("Find three campsites near the lake");
  });
});
