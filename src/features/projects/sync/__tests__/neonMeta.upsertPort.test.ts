/**
 * createPushNeonMetaPort wires History PushNeonMetaPort → allowlisted upsert.
 */
import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("@/lib/db", () => ({
  getSql: () => {
    const sql = async () => [];
    return sql;
  },
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

import { createPushNeonMetaPort } from "@/features/projects/sync/adapters/upsertProjectTaskNeonMeta";
import { pickProjectTaskNeonMetaAllowlist } from "@/features/projects/sync/adapters/projectTasksNeonMeta";

describe("createPushNeonMetaPort (History stub wire)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects body fields and does not write Neon", async () => {
    const port = createPushNeonMetaPort("proj-1");
    const result = await port.pushNeonMeta([
      {
        ...pickProjectTaskNeonMetaAllowlist({
          id: "1",
          projectId: "proj-1",
          title: "t",
          status: "queued",
          createdAt: "2026-10-07T00:00:00.000000Z",
          updatedAt: "2026-10-07T00:00:00.000000Z",
          version: 1,
          assistantMembershipId: null,
          startedAt: null,
          endedAt: null,
          sessionId: null,
          agentRunId: "1",
          branch: null,
          worktree: null,
          localClaimedAt: null,
        }),
        body: "NOPE",
      } as never,
    ]);
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error("unreachable");
    expect(result.reason).toMatch(/body fields not allowed/);
  });

  it("accepts allowlisted meta batch", async () => {
    const port = createPushNeonMetaPort("proj-1");
    const meta = pickProjectTaskNeonMetaAllowlist({
      id: "1",
      projectId: "proj-1",
      title: "t",
      status: "done",
      createdAt: "2026-10-07T00:00:00.000000Z",
      updatedAt: "2026-10-07T00:00:00.000000Z",
      version: 2,
      assistantMembershipId: null,
      startedAt: null,
      endedAt: "2026-10-07T00:00:00.000000Z",
      sessionId: "1",
      agentRunId: "1",
      branch: null,
      worktree: null,
      localClaimedAt: "2026-10-07T00:00:00.000000Z",
    });
    const result = await port.pushNeonMeta([meta]);
    expect(result).toEqual({ ok: true });
  });
});
