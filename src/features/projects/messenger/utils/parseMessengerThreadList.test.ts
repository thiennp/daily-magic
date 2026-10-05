import { describe, expect, it } from "vitest";

import { parseMessengerThreadList } from "@/features/projects/messenger/utils/parseMessengerThreadList";

describe("parseMessengerThreadList", () => {
  it("parses whole project and bots without person threads", () => {
    const parsed = parseMessengerThreadList({
      ok: true,
      wholeProject: {
        lastMessageAt: "2026-10-05T10:00:00.000Z",
        lastPreview: "Hello",
        unreadCount: 1,
      },
      bots: [
        {
          membershipId: "m1",
          displayName: "Planner bot",
          status: "working",
          lastMessageAt: null,
          lastPreview: null,
          unreadCount: 2,
        },
      ],
      canSend: true,
      people: [{ membershipId: "p1", displayName: "Alex" }],
    });
    expect(parsed).not.toBeNull();
    expect(parsed?.bots).toHaveLength(1);
    expect(parsed?.bots[0]?.displayName).toBe("Planner bot");
    expect(parsed?.canSend).toBe(true);
    expect(JSON.stringify(parsed)).not.toContain("Alex");
  });

  it("rejects non-ok payloads", () => {
    expect(parseMessengerThreadList({ ok: false })).toBeNull();
  });
});
