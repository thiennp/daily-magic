import { describe, expect, it } from "vitest";

import { keyProjectMessengerRows } from "@/lib/projects/acl/messaging/messenger/keyProjectMessengerRows";
import {
  MESSENGER_BOT_IDS,
  MESSENGER_RESEARCH,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.fixtures";
import {
  B2B_ROWS,
  B2B_WHOLE_ID,
} from "@/lib/projects/acl/messaging/messenger/projectMessengerBotToBot.fixtures";

describe("keyProjectMessengerRows bot↔bot (DF-023)", () => {
  it("default (member view) still drops bot↔bot rows", () => {
    const keyed = keyProjectMessengerRows({
      rows: B2B_ROWS,
      botIds: MESSENGER_BOT_IDS,
    });
    expect(keyed.map((row) => row.row.messageId)).toEqual([B2B_WHOLE_ID]);
  });

  it("owner view places every bot↔bot dispatch in Whole project, visible, with peer", () => {
    const keyed = keyProjectMessengerRows({
      rows: B2B_ROWS,
      botIds: MESSENGER_BOT_IDS,
      includeBotToBot: true,
    });
    const byId = new Map(keyed.map((row) => [row.row.messageId, row]));
    expect(byId.get("b2b-status")).toMatchObject({
      threadKey: "whole",
      visible: true,
      peer: {
        toMembershipId: MESSENGER_RESEARCH,
        toDisplayName: "Research bot",
        toTeamLabel: null,
      },
    });
    // State-only kinds are not dropped between bots.
    expect(byId.get("b2b-received")).toMatchObject({
      threadKey: "whole",
      visible: true,
    });
    expect(byId.get("b2b-team")?.peer).toEqual({
      toMembershipId: null,
      toDisplayName: null,
      toTeamLabel: "bots",
    });
  });

  it("lifecycle fan-outs stay hidden even for the owner", () => {
    const keyed = keyProjectMessengerRows({
      rows: B2B_ROWS,
      botIds: MESSENGER_BOT_IDS,
      includeBotToBot: true,
    });
    const ids = keyed.map((row) => row.row.messageId);
    expect(ids).not.toContain("b2b-join");
    expect(ids).not.toContain("b2b-updated");
  });
});
