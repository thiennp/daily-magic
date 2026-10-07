import { describe, expect, it } from "vitest";

import type {
  ProjectTaskLocalRecord,
  ProjectTaskNeonMeta,
} from "./projectTaskSyncAdapter";
import {
  claimPendingProjectTaskMeta,
  reconcileProjectSyncOnConnect,
  stubPushNeonMetaPort,
} from "./reconcileProjectSyncOnConnect";

const local = (
  overrides: Partial<ProjectTaskLocalRecord> = {},
): ProjectTaskLocalRecord => ({
  id: "run-1",
  projectId: "proj-1",
  assistantMembershipId: null,
  title: "Local title",
  status: "running",
  createdAt: "2026-10-07T01:00:00.000Z",
  updatedAt: "2026-10-07T02:00:00.000Z",
  startedAt: "2026-10-07T01:00:00.000Z",
  endedAt: null,
  version: 2,
  sessionId: "run-1",
  agentRunId: "run-1",
  branch: "feat/local",
  worktree: null,
  prompt: "SECRET PROMPT",
  body: "SECRET BODY",
  report: null,
  logs: null,
  ...overrides,
});

const neon = (
  overrides: Partial<ProjectTaskNeonMeta> = {},
): ProjectTaskNeonMeta => ({
  id: "run-1",
  projectId: "proj-1",
  assistantMembershipId: null,
  title: "Neon title",
  status: "queued",
  createdAt: "2026-10-07T01:00:00.000Z",
  updatedAt: "2026-10-07T01:30:00.000Z",
  startedAt: null,
  endedAt: null,
  version: 1,
  sessionId: "run-1",
  agentRunId: "run-1",
  branch: null,
  worktree: null,
  localClaimedAt: "2026-10-07T01:00:00.000Z",
  ...overrides,
});

describe("reconcileProjectSyncOnConnect", () => {
  it("local wins on key+version and pushes meta only", async () => {
    const pushed: ProjectTaskNeonMeta[] = [];
    const result = await reconcileProjectSyncOnConnect({
      projectId: "proj-1",
      tableId: "project_tasks",
      localRecords: [local()],
      neonMetaRecords: [neon()],
      pushNeonMeta: async (batch) => {
        pushed.push(...batch);
        return { ok: true };
      },
    });
    expect(result.ok).toBe(true);
    expect(pushed).toHaveLength(1);
    expect(pushed[0]?.version).toBe(2);
    expect(pushed[0]?.title).toBe("Local title");
    expect(pushed[0]).not.toHaveProperty("prompt");
    expect(pushed[0]).not.toHaveProperty("body");
  });

  it("claims web-created pending meta (localClaimedAt null)", async () => {
    const pending = neon({
      id: "pending-1",
      version: 1,
      localClaimedAt: null,
      title: "Web pending",
    });
    const result = await reconcileProjectSyncOnConnect({
      projectId: "proj-1",
      tableId: "project_tasks",
      localRecords: [],
      neonMetaRecords: [pending],
      pushNeonMeta: stubPushNeonMetaPort().pushNeonMeta,
      nowIso: "2026-10-07T12:00:00.000Z",
    });
    expect(result.claimed).toHaveLength(1);
    expect(result.claimed[0]?.local.version).toBe(2);
    expect(result.claimed[0]?.neonMeta.localClaimedAt).toBe(
      "2026-10-07T12:00:00.000Z",
    );
    expect(result.pushed[0]?.id).toBe("pending-1");
  });

  it("claimPending bumps version and returns meta without body", () => {
    const claim = claimPendingProjectTaskMeta({
      neonMeta: neon({ localClaimedAt: null, version: 3 }),
      localSeed: local({ version: 1, prompt: "full", body: "full" }),
      nowIso: "2026-10-07T12:00:00.000Z",
    });
    expect(claim.local.version).toBe(4);
    expect(claim.neonMeta).not.toHaveProperty("prompt");
    expect(claim.neonMeta.localClaimedAt).toBe("2026-10-07T12:00:00.000Z");
  });

  it("is idempotent for the same local/neon inputs", async () => {
    const input = {
      projectId: "proj-1",
      tableId: "project_tasks",
      localRecords: [local()],
      neonMetaRecords: [neon()],
      pushNeonMeta: stubPushNeonMetaPort().pushNeonMeta,
    };
    const a = await reconcileProjectSyncOnConnect(input);
    const b = await reconcileProjectSyncOnConnect(input);
    expect(a.pushed).toEqual(b.pushed);
    expect(a.batches).toBe(b.batches);
  });
});
