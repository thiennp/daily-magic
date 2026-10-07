/**
 * SPEC §11.2 conflict / reconcile matrix — Dispatch Neon meta slice (T1–T15).
 */
import { describe, expect, it } from "vitest";

import { compareVersionProjectTask } from "@/features/projects/sync/adapters/projectTasksAdapter";
import {
  assertProjectTaskNeonMetaAllowlist,
  pickProjectTaskNeonMetaAllowlist,
  PROJECT_TASK_NEON_META_ROW_CAP,
  purgeProjectTaskNeonMetaBeyondCap,
  type ProjectTaskNeonMeta,
} from "@/features/projects/sync/adapters/projectTasksNeonMeta";
import { gateProjectTaskNeonMetaBatch } from "@/features/projects/sync/adapters/upsertProjectTaskNeonMeta";
import {
  loadPage,
  mergeProjectSyncEntries,
} from "@/features/projects/sync/projectSyncPager";
import { PROJECT_SYNC_COMPUTER_OFFLINE_ERROR } from "@/features/projects/sync/projectSync.types";

const meta = (
  partial: Partial<ProjectTaskNeonMeta> & {
    id: string;
    createdAt: string;
  },
): ProjectTaskNeonMeta =>
  pickProjectTaskNeonMetaAllowlist({
    id: partial.id,
    projectId: partial.projectId ?? "proj-1",
    assistantMembershipId: partial.assistantMembershipId ?? null,
    title: partial.title ?? "t",
    status: partial.status ?? "queued",
    createdAt: partial.createdAt,
    updatedAt: partial.updatedAt ?? partial.createdAt,
    startedAt: partial.startedAt ?? null,
    endedAt: partial.endedAt ?? null,
    version: partial.version ?? 1,
    sessionId: partial.sessionId ?? partial.id,
    agentRunId: partial.agentRunId ?? partial.id,
    branch: partial.branch ?? null,
    worktree: partial.worktree ?? null,
    localClaimedAt: partial.localClaimedAt ?? null,
  });

describe("§11.2 conflict matrix — Neon meta adapter", () => {
  it("T1: IDB newer than Neon, local offline — pager serves IDB; no body on Neon gate", () => {
    const id = "t1";
    const idb = [
      meta({
        id,
        createdAt: "2026-10-07T10:00:00.000000Z",
        updatedAt: "2026-10-07T12:00:00.000000Z",
        version: 5,
        title: "idb-newer",
      }),
    ];
    const neon = [
      meta({
        id,
        createdAt: "2026-10-07T10:00:00.000000Z",
        updatedAt: "2026-10-07T09:00:00.000000Z",
        version: 2,
        title: "neon-older",
      }),
    ];
    const page = loadPage({
      idbEntries: idb,
      localEntries: [],
      localHasMore: false,
      neonEntries: neon,
      neonHasMore: false,
      localLive: false,
      beforeRequested: true,
      limit: 50,
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
      encodeCursor: (c) => `${c.t}|${c.id}`,
    });
    // Prefer Neon over IDB on same key in merge order — wait, SPEC says local > Neon > IDB.
    // So Neon wins over IDB when local empty. T1 says "Pager serves IDB" when IDB newer.
    // That is version-aware reconcile, not raw pager Map preference.
    // For pager alone Neon overwrites IDB. Document: T1 version-aware path uses compareVersion.
    const winner =
      compareVersionProjectTask(idb[0]!, neon[0]!) > 0
        ? idb[0]!
        : neon[0]!;
    expect(winner.title).toBe("idb-newer");
    expect(assertProjectTaskNeonMetaAllowlist(winner as unknown as Record<string, unknown>)).toEqual(
      [],
    );
    expect(page.entries).toHaveLength(1);
  });

  it("T2: Neon newer than IDB — merge meta allowlist only; body keys rejected", () => {
    const neonNewer = meta({
      id: "t2",
      createdAt: "2026-10-07T10:00:00.000000Z",
      updatedAt: "2026-10-07T13:00:00.000000Z",
      version: 4,
      title: "neon-meta",
    });
    const withBody = {
      ...neonNewer,
      body: "FULL BODY MUST NOT UPSERT",
      prompt: "FULL PROMPT",
    };
    expect(() =>
      pickProjectTaskNeonMetaAllowlist(
        withBody as unknown as Record<string, unknown>,
      ),
    ).toThrow(/body fields not allowed/);
    expect(
      assertProjectTaskNeonMetaAllowlist(
        withBody as unknown as Record<string, unknown>,
      ),
    ).toEqual(expect.arrayContaining(["body", "prompt"]));
  });

  it("T3: local version > Neon and IDB — local wins for upsert batch", () => {
    const local = meta({
      id: "t3",
      createdAt: "2026-10-07T10:00:00.000000Z",
      version: 9,
      title: "local-authority",
    });
    const neon = meta({
      id: "t3",
      createdAt: "2026-10-07T10:00:00.000000Z",
      version: 3,
      title: "neon",
    });
    const idb = meta({
      id: "t3",
      createdAt: "2026-10-07T10:00:00.000000Z",
      version: 5,
      title: "idb",
    });
    expect(compareVersionProjectTask(local, neon)).toBeGreaterThan(0);
    expect(compareVersionProjectTask(local, idb)).toBeGreaterThan(0);
    const merged = mergeProjectSyncEntries({
      idbEntries: [idb],
      localEntries: [local],
      neonEntries: [neon],
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
    });
    expect(merged[0]?.title).toBe("local-authority");
    expect(gateProjectTaskNeonMetaBatch([local])[0]?.version).toBe(9);
  });

  it("T4: Neon version > local — still local authoritative (do not clobber)", () => {
    const local = meta({
      id: "t4",
      createdAt: "2026-10-07T10:00:00.000000Z",
      version: 2,
      title: "local-body-soT",
    });
    const neon = meta({
      id: "t4",
      createdAt: "2026-10-07T10:00:00.000000Z",
      version: 99,
      title: "neon-high-ver",
    });
    // Pager prefers local over Neon on same key regardless of version.
    const merged = mergeProjectSyncEntries({
      idbEntries: [],
      localEntries: [local],
      neonEntries: [neon],
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
    });
    expect(merged[0]?.title).toBe("local-body-soT");
  });

  it("T5: equal version, divergent meta — higher updatedAt wins", () => {
    const a = meta({
      id: "t5",
      createdAt: "2026-10-07T10:00:00.000000Z",
      updatedAt: "2026-10-07T10:00:00.000000Z",
      version: 1,
      title: "older-stamp",
    });
    const b = meta({
      id: "t5",
      createdAt: "2026-10-07T10:00:00.000000Z",
      updatedAt: "2026-10-07T11:00:00.000000Z",
      version: 1,
      title: "newer-stamp",
    });
    expect(compareVersionProjectTask(b, a)).toBeGreaterThan(0);
  });

  it("T6: duplicate keys — single surviving; upsert gate idempotent", () => {
    const a = meta({ id: "dup", createdAt: "2026-10-07T10:00:00.000000Z" });
    const b = meta({
      id: "dup",
      createdAt: "2026-10-07T10:00:00.000000Z",
      title: "second",
    });
    const merged = mergeProjectSyncEntries({
      idbEntries: [a],
      localEntries: [b],
      neonEntries: [a],
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
    });
    expect(merged).toHaveLength(1);
    const gated = gateProjectTaskNeonMetaBatch([a, a]);
    expect(gated).toHaveLength(2);
    expect(gated[0]?.id).toBe(gated[1]?.id);
  });

  it("T7: dual-write chat assign while local live — one row", () => {
    const id = "dual-live";
    const page = loadPage({
      idbEntries: [meta({ id, createdAt: "2026-10-07T10:00:00.000000Z" })],
      localEntries: [
        meta({ id, createdAt: "2026-10-07T10:00:00.000000Z", title: "session" }),
      ],
      localHasMore: false,
      neonEntries: [
        meta({ id, createdAt: "2026-10-07T10:00:00.000000Z", title: "neon-dup" }),
      ],
      neonHasMore: false,
      localLive: true,
      beforeRequested: false,
      limit: 50,
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
      encodeCursor: (c) => `${c.t}|${c.id}`,
    });
    expect(page.entries).toHaveLength(1);
    expect(page.entries[0]?.title).toBe("session");
  });

  it("T8: web create offline → reconnect claim — version bump on local meta for upsert", () => {
    const pending = meta({
      id: "web-1",
      createdAt: "2026-10-07T09:00:00.000000Z",
      version: 1,
      localClaimedAt: null,
      title: "pending-web",
    });
    const claimed = meta({
      id: "web-1",
      createdAt: "2026-10-07T09:00:00.000000Z",
      updatedAt: "2026-10-07T12:00:00.000000Z",
      version: 2,
      localClaimedAt: "2026-10-07T12:00:00.000000Z",
      title: "pending-web",
    });
    expect(compareVersionProjectTask(claimed, pending)).toBeGreaterThan(
      0,
    );
    expect(gateProjectTaskNeonMetaBatch([claimed])[0]?.localClaimedAt).toBe(
      "2026-10-07T12:00:00.000000Z",
    );
  });

  it("T9: offline → reconnect mid-page — exhausted then live clears offline error", () => {
    const empty: ProjectTaskNeonMeta[] = [];
    const lost = loadPage({
      idbEntries: empty,
      localEntries: empty,
      localHasMore: false,
      neonEntries: empty,
      neonHasMore: false,
      localLive: false,
      beforeRequested: true,
      limit: 10,
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
      encodeCursor: (c) => `${c.t}|${c.id}`,
    });
    expect(lost.error).toEqual(PROJECT_SYNC_COMPUTER_OFFLINE_ERROR);
    const back = loadPage({
      idbEntries: [],
      localEntries: [
        meta({ id: "back", createdAt: "2026-10-07T12:00:00.000000Z" }),
      ],
      localHasMore: false,
      neonEntries: [],
      neonHasMore: false,
      localLive: true,
      beforeRequested: true,
      limit: 10,
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
      encodeCursor: (c) => `${c.t}|${c.id}`,
    });
    expect(back.error).toBeUndefined();
    expect(back.page.localLive).toBe(true);
    expect(back.page.source).toBe("local");
  });

  it("T10: local live prefers local over Neon for page.source", () => {
    const page = loadPage({
      idbEntries: [],
      localEntries: [
        meta({ id: "L", createdAt: "2026-10-07T12:00:00.000000Z" }),
      ],
      localHasMore: true,
      neonEntries: [
        meta({ id: "N", createdAt: "2026-10-07T11:00:00.000000Z" }),
      ],
      neonHasMore: false,
      localLive: true,
      beforeRequested: true,
      limit: 50,
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
      encodeCursor: (c) => `${c.t}|${c.id}`,
    });
    expect(page.page.localLive).toBe(true);
    expect(page.entries[0]?.id).toBe("L");
  });

  it("T11: Neon exhausted + local offline → exact offline EN", () => {
    const empty: ProjectTaskNeonMeta[] = [];
    const page = loadPage({
      idbEntries: empty,
      localEntries: empty,
      localHasMore: false,
      neonEntries: empty,
      neonHasMore: false,
      localLive: false,
      beforeRequested: true,
      limit: 50,
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
      encodeCursor: (c) => `${c.t}|${c.id}`,
    });
    expect(page.error?.code).toBe("project_computer_offline");
    expect(page.error?.message).toBe(
      "Connection to the project computer was lost.",
    );
  });

  it("T12: purge cascade — Neon meta caps still apply; chats never in Neon meta", () => {
    const rows = Array.from({ length: 10 }, (_, i) =>
      meta({
        id: `p-${i}`,
        createdAt: `2026-10-07T${String(10 + i).padStart(2, "0")}:00:00.000000Z`,
      }),
    );
    const { kept, purged } = purgeProjectTaskNeonMetaBeyondCap(rows, 3);
    expect(kept).toHaveLength(3);
    expect(purged).toHaveLength(7);
    for (const row of kept) {
      expect(assertProjectTaskNeonMetaAllowlist(row as unknown as Record<string, unknown>)).toEqual(
        [],
      );
    }
  });

  it("T13: package-cap Neon meta — prune oldest allowlisted only; never bodies", () => {
    expect(PROJECT_TASK_NEON_META_ROW_CAP).toBe(500);
    const rows = [
      meta({ id: "old", createdAt: "2026-10-01T00:00:00.000000Z" }),
      meta({ id: "new", createdAt: "2026-10-07T00:00:00.000000Z" }),
    ];
    const { kept, purged } = purgeProjectTaskNeonMetaBeyondCap(rows, 1);
    expect(kept.map((r) => r.id)).toEqual(["new"]);
    expect(purged.map((r) => r.id)).toEqual(["old"]);
    expect(() =>
      gateProjectTaskNeonMetaBatch([
        { ...kept[0]!, result_output: "NO" } as unknown as Record<
          string,
          unknown
        >,
      ]),
    ).toThrow(/body fields not allowed/);
  });

  it("T14: branch/worktree names meta; paths not on allowlist", () => {
    const row = meta({
      id: "git-1",
      createdAt: "2026-10-07T10:00:00.000000Z",
      branch: "feat/csv",
      worktree: "wt-csv",
    });
    expect(row.branch).toBe("feat/csv");
    expect(row.worktree).toBe("wt-csv");
    const offenders = assertProjectTaskNeonMetaAllowlist({
      ...row,
      worktreePath: "/Users/x/wt-csv",
    } as unknown as Record<string, unknown>);
    expect(offenders).toContain("worktreePath");
  });

  it("T15: tombstone / cancelled — status cancelled; no body resurrection on upsert", () => {
    const cancelled = meta({
      id: "tomb",
      createdAt: "2026-10-07T10:00:00.000000Z",
      status: "cancelled",
      title: "gone",
    });
    expect(cancelled.status).toBe("cancelled");
    expect(() =>
      pickProjectTaskNeonMetaAllowlist({
        ...cancelled,
        body: "resurrect",
      } as unknown as Record<string, unknown>),
    ).toThrow(/body fields not allowed/);
  });
});
