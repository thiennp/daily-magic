import { describe, expect, it } from "vitest";

import { resolveMessengerGate } from "@/features/projects/messenger/AwcProjectMessengerGate";
import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";

const base = { unavailable: false, forbidden: false, message: null };

describe("resolveMessengerGate refetch (jump audit r2)", () => {
  it("first load with no list yet shows the loading state", () => {
    expect(
      resolveMessengerGate({ ...base, isLoading: true, threads: null }).kind,
    ).toBe("loading");
  });

  it("a refetch with a list on screen stays ready (no feed/composer remount)", () => {
    const summary = { lastMessageAt: null, lastPreview: null, unreadCount: 0 };
    const threads: AwcMessengerThreadList = {
      wholeProject: summary,
      bots: [
        {
          ...summary,
          membershipId: "m1",
          displayName: "Inkwell",
          status: "idle",
        },
      ],
      canSend: true,
    };
    expect(
      resolveMessengerGate({ ...base, isLoading: true, threads }).kind,
    ).toBe("ready");
  });
});
