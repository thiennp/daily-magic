import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchProjectActivity } from "@/features/projects/access/utils/fetchProjectActivity";

describe("fetchProjectActivity", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("degrades gracefully on 404", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("missing", { status: 404 })),
    );
    const result = await fetchProjectActivity({ projectId: "p1" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.unavailable).toBe(true);
      expect(result.errorMessage.toLowerCase()).toMatch(/not available/);
    }
  });

  it("parses allowlisted events and filters by action", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({
              ok: true,
              projectId: "p1",
              events: [
                {
                  id: "e1",
                  projectId: "p1",
                  action: "approve",
                  actorUserId: "owner",
                  targetUserId: "bot-a",
                  at: "2026-10-01T10:00:00.000Z",
                  detail: { subjectUserId: "bot-a", reason: "secret" },
                },
                {
                  id: "e2",
                  projectId: "p1",
                  action: "revoke",
                  actorUserId: "owner",
                  targetUserId: "bot-a",
                  at: "2026-10-01T11:00:00.000Z",
                  detail: {},
                },
              ],
              nextCursor: null,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          ),
      ),
    );
    const result = await fetchProjectActivity({
      projectId: "p1",
      actionFilter: "approve",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.events).toHaveLength(1);
      expect(result.events[0]?.action).toBe("approve");
      // reason must not leak from unsafe detail
      expect(result.events[0]?.detail).not.toHaveProperty("reason");
      expect(result.events[0]?.detail.subjectUserId).toBe("bot-a");
    }
  });
});
