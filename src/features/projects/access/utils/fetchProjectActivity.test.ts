import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchProjectActivity } from "@/features/projects/access/utils/fetchProjectActivity";
import { PROJECT_ACL_FIRST_CONNECT } from "@/lib/projects/acl/projectAclFirstConnect.constant";

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

  it("parses allowlisted events, firstConnect, and filters by action", async () => {
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
                {
                  id: "e3",
                  projectId: "p1",
                  action: "handoff",
                  actorUserId: "owner",
                  targetUserId: null,
                  at: "2026-10-01T12:00:00.000Z",
                  detail: {},
                },
              ],
              nextCursor: null,
              firstConnect: {
                role: PROJECT_ACL_FIRST_CONNECT.role,
                scopes: PROJECT_ACL_FIRST_CONNECT.scopes,
                note: PROJECT_ACL_FIRST_CONNECT.emptyStateNote,
              },
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
      expect(result.firstConnect).not.toBeNull();
      expect(result.firstConnect?.role).toBe("member");
      expect(result.firstConnect?.scopes).toEqual([
        "acl:self",
        "project:meta",
        "peer_sync",
        "msg:dispatch",
      ]);
      expect(result.firstConnect?.note).toContain(
        PROJECT_ACL_FIRST_CONNECT.emptyStateNote,
      );
    }
  });
});
