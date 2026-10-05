import { describe, expect, it } from "vitest";

import { keyProjectMessengerRows } from "@/lib/projects/acl/messaging/messenger/keyProjectMessengerRows";
import {
  botReplyRow,
  MESSENGER_BOT_IDS,
  MESSENGER_PLANNER,
  MESSENGER_RESEARCH,
  ownerRow,
  WHOLE_ADDRESS,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.fixtures";

const WHOLE_ID = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const DIRECT_ID = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";

describe("keyProjectMessengerRows", () => {
  const keyed = keyProjectMessengerRows({
    botIds: MESSENGER_BOT_IDS,
    rows: [
      ownerRow(DIRECT_ID),
      ownerRow(WHOLE_ID, WHOLE_ADDRESS),
      botReplyRow("r1", MESSENGER_PLANNER, `${DIRECT_ID}: booked two`),
      botReplyRow(
        "r2",
        MESSENGER_RESEARCH,
        `status ${WHOLE_ID}: comparing prices`,
      ),
      botReplyRow("r3", MESSENGER_RESEARCH, `processing ${WHOLE_ID}`, {
        kind: "task.processing",
      }),
      botReplyRow("b2b", MESSENGER_PLANNER, "hi", {
        recipientKind: "bot",
        toMembershipId: MESSENGER_RESEARCH,
      }),
      botReplyRow("join", MESSENGER_PLANNER, "joined", { kind: "peer.joined" }),
      ownerRow("sys", { senderKind: "system" }),
    ],
  });
  const byId = new Map(keyed.map((row) => [row.row.messageId, row]));

  it("places owner sends in the bot thread or Whole project", () => {
    expect(byId.get(DIRECT_ID)?.threadKey).toBe(MESSENGER_PLANNER);
    expect(byId.get(WHOLE_ID)?.threadKey).toBe("whole");
  });

  it("bot replies go to the bot thread, or Whole project when replying to it", () => {
    expect(byId.get("r1")).toMatchObject({
      threadKey: MESSENGER_PLANNER,
      inReplyTo: DIRECT_ID,
      text: "booked two",
      visible: true,
    });
    expect(byId.get("r2")).toMatchObject({
      threadKey: "whole",
      text: "status comparing prices",
    });
  });

  it("state-only kinds are kept for chips but hidden", () => {
    expect(byId.get("r3")).toMatchObject({
      threadKey: "whole",
      visible: false,
    });
  });

  it("drops bot↔bot, lifecycle notices, and system notices", () => {
    expect(byId.has("b2b")).toBe(false);
    expect(byId.has("join")).toBe(false);
    expect(byId.has("sys")).toBe(false);
  });
});
