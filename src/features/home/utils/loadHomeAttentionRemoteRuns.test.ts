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

  it("merges the owner's failed, Stalled and awaiting runs from one server query (a13083ee)", async () => {
    const urls: string[] = [];
    const fetchImpl = vi.fn(async (url: string) => {
      urls.push(url);
      return jsonResponse({
        ok: true,
        runs: [{ id: "swept-elsewhere" }, { id: "awaiting-1" }],
      });
    }) as unknown as typeof fetch;

    const count = await loadHomeAttentionRemoteRuns(fetchImpl);

    expect(count).toBe(2);
    expect(upserted.toSorted()).toEqual(["awaiting-1", "swept-elsewhere"]);
    expect(urls).toEqual(["/api/agent-runs/attention"]);
  });

  it("keeps the local list when the server is unreachable", async () => {
    const offline = vi.fn(async () => {
      throw new Error("offline");
    }) as unknown as typeof fetch;
    const refused = vi.fn(async () =>
      jsonResponse({ error: "nope" }, false),
    ) as unknown as typeof fetch;

    await expect(loadHomeAttentionRemoteRuns(offline)).resolves.toBe(0);
    await expect(loadHomeAttentionRemoteRuns(refused)).resolves.toBe(0);
    expect(upserted).toEqual([]);
  });
});
