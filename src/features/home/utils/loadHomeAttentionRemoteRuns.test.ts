import { beforeEach, describe, expect, it, vi } from "vitest";

const upserted: string[] = [];

vi.mock("@/features/reports/agentRunLocalCache", () => ({
  upsertAgentRunLocalCache: (run: { readonly id: string }) => {
    upserted.push(run.id);
  },
}));

import { loadHomeAttentionRemoteRuns } from "@/features/home/utils/loadHomeAttentionRemoteRuns";

const jsonResponse = (body: unknown, ok = true): Response =>
  ({ ok, json: async () => body }) as Response;

describe("loadHomeAttentionRemoteRuns", () => {
  beforeEach(() => {
    upserted.length = 0;
  });

  it("merges the owner's failed and awaiting runs from the server into the cache", async () => {
    const urls: string[] = [];
    const fetchImpl = vi.fn(async (url: string) => {
      urls.push(url);
      return url.includes("status=failed")
        ? jsonResponse({ ok: true, runs: [{ id: "swept-elsewhere" }] })
        : jsonResponse({ ok: true, runs: [{ id: "awaiting-1" }] });
    }) as unknown as typeof fetch;

    const count = await loadHomeAttentionRemoteRuns(fetchImpl);

    expect(count).toBe(2);
    expect(upserted.toSorted()).toEqual(["awaiting-1", "swept-elsewhere"]);
    expect(urls).toEqual([
      "/api/agent-runs?status=failed&scope=mine",
      "/api/agent-runs?status=pending_approval&scope=mine",
    ]);
  });

  it("keeps the local list when the server is unreachable", async () => {
    const fetchImpl = vi.fn(async (url: string) => {
      if (url.includes("failed")) {
        throw new Error("offline");
      }
      return jsonResponse({ error: "nope" }, false);
    }) as unknown as typeof fetch;

    await expect(loadHomeAttentionRemoteRuns(fetchImpl)).resolves.toBe(0);
    expect(upserted).toEqual([]);
  });
});
