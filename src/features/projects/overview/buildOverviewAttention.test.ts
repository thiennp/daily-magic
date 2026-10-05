import { describe, expect, it } from "vitest";

import buildOverviewAttention from "@/features/projects/overview/buildOverviewAttention";
import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";

const threads = (
  partial: Partial<AwcMessengerThreadList> & {
    readonly bots?: AwcMessengerThreadList["bots"];
  },
): AwcMessengerThreadList => ({
  wholeProject: { lastMessageAt: null, lastPreview: null, unreadCount: 0 },
  bots: [],
  canSend: true,
  ...partial,
});

describe("buildOverviewAttention", () => {
  it("returns null when there is no unread", () => {
    expect(buildOverviewAttention(null)).toBeNull();
    expect(buildOverviewAttention(threads({}))).toBeNull();
  });

  it("prefers a bot with unread over whole-project", () => {
    const result = buildOverviewAttention(
      threads({
        wholeProject: {
          lastMessageAt: null,
          lastPreview: null,
          unreadCount: 2,
        },
        bots: [
          {
            membershipId: "m1",
            displayName: "WB Wake",
            status: "idle",
            lastMessageAt: null,
            lastPreview: null,
            unreadCount: 1,
          },
        ],
      }),
    );
    expect(result).toEqual({ botName: "WB Wake", membershipId: "m1" });
  });

  it("falls back to whole project when only that is unread", () => {
    expect(
      buildOverviewAttention(
        threads({
          wholeProject: {
            lastMessageAt: null,
            lastPreview: "hi",
            unreadCount: 1,
          },
        }),
      ),
    ).toEqual({ botName: "Whole project", membershipId: null });
  });
});
