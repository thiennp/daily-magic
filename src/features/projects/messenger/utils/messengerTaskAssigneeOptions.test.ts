import { describe, expect, it } from "vitest";

import { messengerTaskAssigneeOptions } from "@/features/projects/messenger/utils/messengerTaskAssigneeOptions";

describe("messengerTaskAssigneeOptions", () => {
  it("lists bots and optional computer seats", () => {
    expect(
      messengerTaskAssigneeOptions({
        bots: [
          {
            membershipId: "m1",
            displayName: "WB Wake",
            status: "idle",
            lastMessageAt: null,
            lastPreview: null,
            unreadCount: 0,
          },
        ],
        computers: [
          { membershipId: "mc1", displayName: "This computer" },
          { membershipId: "mc2", displayName: "  " },
        ],
      }),
    ).toEqual([
      { membershipId: "m1", displayName: "WB Wake", kind: "bot" },
      { membershipId: "mc1", displayName: "This computer", kind: "computer" },
    ]);
  });
});
