/**
 * createPushNeonMetaPort wires History PushNeonMetaPort → allowlisted upsert.
 * T15 I/O: terminal rows never resurrect (updatedAgentRunIds empty).
 */
import { describe, expect, it, vi, beforeEach } from "vitest";

const sqlMock = vi.hoisted(() => vi.fn(async () => [] as unknown[]));
const registerCache = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/dispatch/agentRunSessionRegistry", () => ({
  registerAgentRunSession: registerCache,
}));

import {
  createPushNeonMetaPort,
  upsertProjectTaskNeonMeta,
} from "@/features/projects/sync/adapters/upsertProjectTaskNeonMeta";
import { pickProjectTaskNeonMetaAllowlist } from "@/features/projects/sync/adapters/projectTasksNeonMeta";

const baseMeta = (partial: Record<string, unknown> = {}) =>
  pickProjectTaskNeonMetaAllowlist({
    id: "1",
    projectId: "proj-1",
    title: "t",
    status: "done",
    createdAt: "2026-10-07T00:00:00.000000Z",
    updatedAt: "2026-10-07T01:00:00.000000Z",
    version: 2,
    assistantMembershipId: null,
    startedAt: null,
    endedAt: "2026-10-07T01:00:00.000000Z",
    sessionId: "1",
    agentRunId: "1",
    branch: null,
    worktree: null,
    localClaimedAt: "2026-10-07T00:00:00.000000Z",
    ...partial,
  });

const OWNER = { userId: "owner-1", isOwner: true } as const;

describe("upsertProjectTaskNeonMeta writes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sqlMock.mockResolvedValue([]);
  });

  it("queued status is no-op (never pending_approval write)", async () => {
    const result = await upsertProjectTaskNeonMeta({
      projectId: "proj-1",
      actor: OWNER,
      batch: [baseMeta({ status: "queued" })],
    });
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("unreachable");
    expect(result.updatedAgentRunIds).toEqual([]);
    expect(sqlMock).not.toHaveBeenCalled();
  });

  it("all-or-nothing: projectId mismatch rejects before any write", async () => {
    const result = await upsertProjectTaskNeonMeta({
      projectId: "proj-1",
      actor: OWNER,
      batch: [
        baseMeta({ id: "a", agentRunId: "a" }),
        baseMeta({ id: "b", agentRunId: "b", projectId: "other" }),
      ],
    });
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error("unreachable");
    expect(result.reason).toMatch(/projectId mismatch/);
    expect(sqlMock).not.toHaveBeenCalled();
  });
});
