import { describe, expect, it } from "vitest";

import { buildProjectMessengerTimeline } from "@/lib/projects/acl/messaging/messenger/buildProjectMessengerTimeline";
import { keyProjectMessengerRows } from "@/lib/projects/acl/messaging/messenger/keyProjectMessengerRows";
import { mirrorProjectMessengerDirectRows } from "@/lib/projects/acl/messaging/messenger/mirrorProjectMessengerDirectRows";
import {
  MESSENGER_BOT_IDS,
  MESSENGER_BOTS,
  MESSENGER_PLANNER,
  ownerRow,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.fixtures";

const botsById = new Map(MESSENGER_BOTS.map((b) => [b.membershipId, b]));
const wholeRow = ownerRow("m-whole", {
  toMembershipId: null,
  toUserId: null,
  recipientKind: "none",
  summary: "Everyone: plan the trip",
});
const directRow = ownerRow("m-direct", { toDisplayName: null });

const timeline = (threadKey: string, mirror: boolean) => {
  const keyed = keyProjectMessengerRows({
    rows: [directRow, wholeRow],
    botIds: MESSENGER_BOT_IDS,
  });
  return buildProjectMessengerTimeline({
    threadKey,
    keyed: mirror ? mirrorProjectMessengerDirectRows(keyed) : keyed,
    deliveriesByMessage: new Map([
      [
        "m-direct",
        [
          {
            messageId: "m-direct",
            membershipId: MESSENGER_PLANNER,
            b2bState: null,
          },
        ],
      ],
    ]),
    botsById,
  });
};

describe("kept-recipient sends in the Whole project feed (S5 item 1)", () => {
  it("a direct send also shows in whole, labelled To {name}", () => {
    const whole = timeline("whole", true);
    expect(whole.map((e) => e.messageId)).toEqual(["m-direct", "m-whole"]);
    expect(whole[0]).toMatchObject({
      toMembershipIds: [MESSENGER_PLANNER],
      toLabels: ["Planner bot"],
      states: [expect.objectContaining({ membershipId: MESSENGER_PLANNER })],
    });
    expect(whole[1]).not.toHaveProperty("toMembershipIds");
  });

  it("the assistant thread keeps it unlabelled; no mirror = old behaviour", () => {
    const planner = timeline(MESSENGER_PLANNER, true);
    expect(planner.map((e) => e.messageId)).toEqual(["m-direct"]);
    expect(planner[0]).not.toHaveProperty("toLabels");
    expect(timeline("whole", false).map((e) => e.messageId)).toEqual([
      "m-whole",
    ]);
  });

  it("bot replies and whole sends are not mirrored", () => {
    const keyed = keyProjectMessengerRows({
      rows: [wholeRow],
      botIds: MESSENGER_BOT_IDS,
    });
    expect(mirrorProjectMessengerDirectRows(keyed)).toEqual(keyed);
  });
});
