/**
 * SPEC §11.3 IndexedDB failure modes at Neon adapter boundary (I1–I6).
 * HARD: IDB failure Soft-degrades; never triggers Neon write / bad upsert.
 */
import { describe, expect, it, vi } from "vitest";

import {
  classifyIdbError,
  decideNeonUpsertGivenIdb,
  gateNeonUpsertAfterIdb,
  softIdbCall,
} from "@/features/projects/sync/adapters/neonMetaIdbGuard";
import { pickProjectTaskNeonMetaAllowlist } from "@/features/projects/sync/adapters/projectTasksNeonMeta";
import { loadPage } from "@/features/projects/sync/projectSyncPager";
import { PROJECT_SYNC_COMPUTER_OFFLINE_ERROR } from "@/features/projects/sync/projectSync.types";

const meta = (id: string) =>
  pickProjectTaskNeonMetaAllowlist({
    id,
    projectId: "proj-1",
    assistantMembershipId: null,
    title: "t",
    status: "queued",
    createdAt: "2026-10-07T10:00:00.000000Z",
    updatedAt: "2026-10-07T10:00:00.000000Z",
    startedAt: null,
    endedAt: null,
    version: 1,
    sessionId: id,
    agentRunId: id,
    branch: null,
    worktree: null,
    localClaimedAt: null,
  });

describe("§11.3 IDB Soft degrade — Neon adapter boundary", () => {
  it("I1: quota exceeded → Soft degrade; Neon write forbidden", async () => {
    const idb = await softIdbCall(async () => {
      const err = new Error("Quota exceeded");
      err.name = "QuotaExceededError";
      throw err;
    });
    expect(idb.ok).toBe(false);
    if (idb.ok) throw new Error("unreachable");
    expect(idb.failure).toBe("quota");

    const upsert = vi.fn(async () => ({
      ok: true as const,
      upserted: [meta("should-not-run")],
    }));
    const gated = await gateNeonUpsertAfterIdb({ idb, upsert });
    expect(upsert).not.toHaveBeenCalled();
    expect(gated).toMatchObject({
      ok: true,
      idbDegraded: true,
      failure: "quota",
      neonUnchanged: true,
      upserted: [],
    });
  });

  it("I2: open blocked / versionchange → Soft degrade without Neon write", async () => {
    expect(classifyIdbError({ name: "BlockedError", message: "blocked" })).toBe(
      "blocked",
    );
    expect(
      classifyIdbError(new Error("versionchange blocked by other tab")),
    ).toBe("blocked");
    const decision = decideNeonUpsertGivenIdb({
      ok: false,
      failure: "blocked",
    });
    expect(decision.allowUpsert).toBe(false);
    if (decision.allowUpsert) throw new Error("unreachable");
    expect(decision.neonWriteForbidden).toBe(true);
    expect(decision.idbEntries).toEqual([]);
  });

  it("I3: corrupted store → Soft skip IDB; never wipe Neon via upsert", async () => {
    const idb = {
      ok: false as const,
      failure: "corrupt" as const,
      message: "InvalidStateError corrupt",
    };
    const upsert = vi.fn(async () => ({
      ok: true as const,
      upserted: [meta("nope")],
    }));
    const gated = await gateNeonUpsertAfterIdb({ idb, upsert });
    expect(upsert).not.toHaveBeenCalled();
    expect(gated).toMatchObject({ neonUnchanged: true, failure: "corrupt" });
  });

  it("I4: IDB unavailable / private mode → Soft degrade; page Neon+local", () => {
    expect(classifyIdbError({ name: "SecurityError" })).toBe("unavailable");
    expect(
      classifyIdbError(new Error("IndexedDB is not available")),
    ).toBe("unavailable");
    const decision = decideNeonUpsertGivenIdb({
      ok: false,
      failure: "unavailable",
    });
    const emptyIdb = [] as ReturnType<typeof meta>[];
    const page = loadPage({
      idbEntries: emptyIdb,
      localEntries: emptyIdb,
      localHasMore: false,
      neonEntries: [meta("neon-1")],
      neonHasMore: false,
      localLive: false,
      beforeRequested: false,
      limit: 50,
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
      encodeCursor: (c) => `${c.t}|${c.id}`,
    });
    expect(page.entries).toHaveLength(1);
    expect(page.page.source).toBe("neon");
    expect(page.error).toBeUndefined();
  });

  it("I5: write fail mid-reconcile → abort; Neon unchanged (no upsert call)", async () => {
    expect(classifyIdbError(new Error("put aborted"))).toBe("write_fail");
    const upsert = vi.fn(async () => ({
      ok: true as const,
      upserted: [meta("partial")],
    }));
    const gated = await gateNeonUpsertAfterIdb({
      idb: { ok: false, failure: "write_fail" },
      upsert,
    });
    expect(upsert).not.toHaveBeenCalled();
    expect(gated).toMatchObject({
      ok: true,
      neonUnchanged: true,
      upserted: [],
      failure: "write_fail",
    });
  });

  it("I6: IDB read fail during Load older → skip IDB; fall through; offline only when lost", () => {
    const decision = decideNeonUpsertGivenIdb({
      ok: false,
      failure: "read_fail",
    });
    const emptyIdb = [] as ReturnType<typeof meta>[];
    const withNeon = loadPage({
      idbEntries: emptyIdb,
      localEntries: emptyIdb,
      localHasMore: false,
      neonEntries: [meta("n")],
      neonHasMore: false,
      localLive: false,
      beforeRequested: true,
      limit: 50,
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
      encodeCursor: (c) => `${c.t}|${c.id}`,
    });
    expect(withNeon.error).toBeUndefined();
    expect(withNeon.page.source).toBe("neon");

    const lost = loadPage({
      idbEntries: emptyIdb,
      localEntries: emptyIdb,
      localHasMore: false,
      neonEntries: emptyIdb,
      neonHasMore: false,
      localLive: false,
      beforeRequested: true,
      limit: 50,
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
      encodeCursor: (c) => `${c.t}|${c.id}`,
    });
    expect(lost.error).toEqual(PROJECT_SYNC_COMPUTER_OFFLINE_ERROR);
  });

  it("IDB ok path still allows upsert (control)", async () => {
    const row = meta("ok-1");
    const upsert = vi.fn(async () => ({
      ok: true as const,
      upserted: [row],
    }));
    const gated = await gateNeonUpsertAfterIdb({
      idb: { ok: true, entries: [row] },
      upsert,
    });
    expect(upsert).toHaveBeenCalledOnce();
    expect(gated).toMatchObject({
      ok: true,
      idbDegraded: false,
      upserted: [row],
    });
  });
});
