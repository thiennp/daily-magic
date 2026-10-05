import { describe, expect, it } from "vitest";

import { messengerBotAssigneeOptions } from "@/features/projects/messenger/utils/messengerBotAssigneeOptions";

describe("messengerBotAssigneeOptions", () => {
  it("keeps named bots only", () => {
    expect(
      messengerBotAssigneeOptions([
        {
          membershipId: "m1",
          displayName: "WB Wake",
          status: "idle",
          lastMessageAt: null,
          lastPreview: null,
          unreadCount: 0,
        },
        {
          membershipId: "m2",
          displayName: "  ",
          status: "idle",
          lastMessageAt: null,
          lastPreview: null,
          unreadCount: 0,
        },
        {
          membershipId: "m3",
          displayName: null,
          status: "idle",
          lastMessageAt: null,
          lastPreview: null,
          unreadCount: 0,
        },
      ]),
    ).toEqual([{ membershipId: "m1", displayName: "WB Wake" }]);
  });
});
