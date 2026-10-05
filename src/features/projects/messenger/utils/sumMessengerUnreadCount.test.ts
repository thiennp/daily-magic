import { describe, expect, it } from "vitest";

import { sumMessengerUnreadCount } from "@/features/projects/messenger/utils/sumMessengerUnreadCount";
import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";

const base = (): AwcMessengerThreadList => ({
  wholeProject: { lastMessageAt: null, lastPreview: null, unreadCount: 0 },
  bots: [],
  canSend: true,
});

describe("sumMessengerUnreadCount", () => {
  it("returns 0 for null/empty", () => {
    expect(sumMessengerUnreadCount(null)).toBe(0);
    expect(sumMessengerUnreadCount(undefined)).toBe(0);
    expect(sumMessengerUnreadCount(base())).toBe(0);
  });

  it("sums whole + bot unread for Activity badge", () => {
    const threads = base();
    expect(
      sumMessengerUnreadCount({
        ...threads,
        wholeProject: { ...threads.wholeProject, unreadCount: 1 },
        bots: [
          {
            membershipId: "m1",
            displayName: "WB Wake",
            status: "idle",
            lastMessageAt: null,
            lastPreview: null,
            unreadCount: 2,
          },
          {
            membershipId: "m2",
            displayName: "Mangy",
            status: "idle",
            lastMessageAt: null,
            lastPreview: null,
            unreadCount: 0,
          },
        ],
      }),
    ).toBe(3);
  });
});
