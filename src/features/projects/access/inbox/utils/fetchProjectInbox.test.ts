import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchProjectInbox } from "@/features/projects/access/inbox/utils/fetchProjectInbox";

describe("fetchProjectInbox", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("soft-degrades on 404 until eng messaging is live", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("missing", { status: 404 })),
    );
    const result = await fetchProjectInbox({ projectId: "p1" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.unavailable).toBe(true);
      expect(result.forbidden).toBe(false);
      expect(result.errorMessage.toLowerCase()).toMatch(/not available/);
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

  it("parses allowlisted message fields", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({
              ok: true,
              projectId: "p1",
              messages: [
                {
                  messageId: "m1",
                  kind: "peer.joined",
                  summary: "Peer joined: BotA",
                  refs: { prUrl: "https://example.com/pr/1", secret: "x" },
                  fromProjectDisplayName: "BotA",
                  createdAt: "2026-10-02T12:00:00.000Z",
                  ackedAt: null,
                },
              ],
            }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          ),
      ),
    );
    const result = await fetchProjectInbox({ projectId: "p1" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.messages).toHaveLength(1);
      expect(result.messages[0]?.kind).toBe("peer.joined");
      expect(result.messages[0]?.refs).toEqual({
        prUrl: "https://example.com/pr/1",
      });
      expect(result.messages[0]?.refs).not.toHaveProperty("secret");
    }
  });
});
