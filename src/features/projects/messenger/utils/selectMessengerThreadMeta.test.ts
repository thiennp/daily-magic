import { describe, expect, it } from "vitest";

import { selectMessengerThreadMeta } from "@/features/projects/messenger/utils/selectMessengerThreadMeta";

describe("selectMessengerThreadMeta", () => {
  it("labels whole vs bot threads", () => {
    const threads = {
      wholeProject: { lastMessageAt: null, lastPreview: null, unreadCount: 0 },
      bots: [
        {
          membershipId: "m1",
          displayName: "WB Wake",
          status: "idle" as const,
          lastMessageAt: null,
          lastPreview: null,
          unreadCount: 1,
        },
      ],
      canSend: true,
    };
    expect(selectMessengerThreadMeta({ selectedKey: "whole", threads }).title).toBe(
      "Whole project",
    );
    expect(selectMessengerThreadMeta({ selectedKey: "m1", threads }).title).toBe(
      "WB Wake",
    );
  });
});
