import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchProjectInbox } from "@/features/projects/access/inbox/utils/fetchProjectInbox";

describe("fetchProjectInbox", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("requests scope=project for the owner Messages panel", async () => {
    const fetchMock = vi.fn(
      async () =>
        new Response(JSON.stringify({ ok: true, projectId: "p1", messages: [] }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
    );
    vi.stubGlobal("fetch", fetchMock);
    await fetchProjectInbox({ projectId: "p1" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("scope=project"),
      expect.objectContaining({ cache: "no-store" }),
    );
  });

  it("soft-degrades on 404 until eng clear/log is live", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("missing", { status: 404 })),
    );
    const result = await fetchProjectInbox({ projectId: "p1" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.unavailable).toBe(true);
      expect(result.forbidden).toBe(false);
      expect(result.errorMessage.toLowerCase()).toMatch(/not available|eng/);
    }
  });

  it("marks forbidden on 403", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("no", { status: 403 })),
    );
    const result = await fetchProjectInbox({ projectId: "p1" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.forbidden).toBe(true);
    }
  });

  it("parses from/to nicknames and allowlisted refs", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({
              ok: true,
              projectId: "p1",
              scope: "project",
              messages: [
                {
                  messageId: "m1",
                  kind: "task.assign",
                  summary: "Do the thing",
                  refs: { prUrl: "https://example.com/pr/1", secret: "x" },
                  fromProjectDisplayName: "AliceBot",
                  toProjectDisplayName: "BobBot",
                  fromMembershipId: "mem-a",
                  toMembershipId: "mem-b",
                  toUserId: null,
                  toTeamLabel: null,
                  createdAt: "2026-10-02T12:00:00.000Z",
                  ackedAt: null,
                },
              ],
              nextCursor: null,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          ),
      ),
    );
    const result = await fetchProjectInbox({ projectId: "p1" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.scope).toBe("project");
      expect(result.messages).toHaveLength(1);
      expect(result.messages[0]?.fromProjectDisplayName).toBe("AliceBot");
      expect(result.messages[0]?.toProjectDisplayName).toBe("BobBot");
      expect(result.messages[0]?.refs).toEqual({
        prUrl: "https://example.com/pr/1",
      });
      expect(result.messages[0]?.refs).not.toHaveProperty("secret");
    }
  });
});
