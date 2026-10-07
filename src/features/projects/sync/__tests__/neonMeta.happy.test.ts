/**
 * SPEC §11.1 happy paths — Dispatch Neon meta adapter slice (H1–H6 relevant).
 */
import { describe, expect, it, vi } from "vitest";

import {
  formatProjectTaskPlanHint,
  resolveProjectTaskPlanMax,
} from "@/features/projects/sync/adapters/loadProjectTaskPlanCounts";
import {
  mapAgentRunRowToTaskNeonMeta,
  pickProjectTaskNeonMetaAllowlist,
  PROJECT_TASK_NEON_FIELDS,
  scrubNeonMetaTitle,
} from "@/features/projects/sync/adapters/projectTasksNeonMeta";
import { gateProjectTaskNeonMetaBatch } from "@/features/projects/sync/adapters/upsertProjectTaskNeonMeta";
import {
  isProjectSyncModuleEnabled,
  AWC_PROJECT_SYNC_MODULE_ENV,
} from "@/features/projects/sync/projectSyncFlag";
import {
  loadPage,
  mergeProjectSyncEntries,
} from "@/features/projects/sync/projectSyncPager";
import {
  PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS,
  PROJECT_SYNC_COMPUTER_OFFLINE_ERROR,
} from "@/features/projects/sync/projectSync.types";

const meta = (partial: {
  id: string;
  createdAt: string;
  updatedAt?: string;
  version?: number;
  title?: string;
  status?: string;
}) =>
  pickProjectTaskNeonMetaAllowlist({
    id: partial.id,
    projectId: "proj-1",
    assistantMembershipId: null,
    title: partial.title ?? "Task",
    status: partial.status ?? "queued",
    createdAt: partial.createdAt,
    updatedAt: partial.updatedAt ?? partial.createdAt,
    startedAt: null,
    endedAt: null,
    version: partial.version ?? 1,
    sessionId: partial.id,
    agentRunId: partial.id,
    branch: null,
    worktree: null,
    localClaimedAt: null,
  });

describe("§11.1 happy path — Neon meta adapter", () => {
  it("H1: fresh list IDB empty → Neon meta allowlist-only upsert gate", () => {
    const local = meta({
      id: "run-1",
      createdAt: "2026-10-07T10:00:00.000000Z",
      title: "Add CSV export",
      status: "running",
    });
    const gated = gateProjectTaskNeonMetaBatch([local]);
    expect(gated).toHaveLength(1);
    expect(Object.keys(gated[0]!).sort()).toEqual(
      [...PROJECT_TASK_NEON_FIELDS].sort(),
    );
    expect(gated[0]).not.toHaveProperty("prompt");
    expect(gated[0]).not.toHaveProperty("body");
  });

  it("H2: warm IDB + local merge — no duplicate keys; cursor uses oldest", () => {
    const id = "run-dup";
    const idb = [meta({ id, createdAt: "2026-10-07T09:00:00.000000Z", title: "idb" })];
    const local = [
      meta({
        id,
        createdAt: "2026-10-07T09:00:00.000000Z",
        title: "local-wins",
        version: 2,
      }),
    ];
    const merged = mergeProjectSyncEntries({
      idbEntries: idb,
      localEntries: local,
      neonEntries: [],
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
    });
    expect(merged).toHaveLength(1);
    expect(merged[0]?.title).toBe("local-wins");
    const page = loadPage({
      idbEntries: idb,
      localEntries: local,
      localHasMore: false,
      neonEntries: [],
      neonHasMore: false,
      localLive: true,
      beforeRequested: true,
      limit: 50,
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
      encodeCursor: (c) => Buffer.from(JSON.stringify(c)).toString("base64url"),
    });
    expect(page.entries).toHaveLength(1);
    expect(page.page.source).toBe("mixed");
    expect(page.page.beforeCursor).not.toBeNull();
  });

  it("H3: local live + Neon meta → prefer local over Neon", () => {
    const id = "run-prefer";
    const page = loadPage({
      idbEntries: [],
      localEntries: [
        meta({ id, createdAt: "2026-10-07T11:00:00.000000Z", title: "local" }),
      ],
      localHasMore: false,
      neonEntries: [
        meta({ id, createdAt: "2026-10-07T11:00:00.000000Z", title: "neon" }),
      ],
      neonHasMore: false,
      localLive: true,
      beforeRequested: false,
      limit: 50,
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
      encodeCursor: (c) => `${c.t}|${c.id}`,
    });
    expect(page.entries[0]?.title).toBe("local");
    expect(page.page.source).toBe("mixed");
    expect(page.page.localLive).toBe(true);
  });

  it("H4: reconcile no-conflict — allowlisted meta batch only", () => {
    const batch = [
      meta({ id: "a", createdAt: "2026-10-07T08:00:00.000000Z", version: 3 }),
      meta({ id: "b", createdAt: "2026-10-07T07:00:00.000000Z", version: 1 }),
    ];
    const gated = gateProjectTaskNeonMetaBatch(batch);
    expect(gated.map((g) => g.id)).toEqual(["a", "b"]);
    for (const row of gated) {
      expect(row.title.length).toBeLessThanOrEqual(
        PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS,
      );
    }
  });

  it("H5: Load older exhausted + offline → exact project_computer_offline", () => {
    const empty = [] as ReturnType<typeof meta>[];
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
    expect(page.error).toEqual(PROJECT_SYNC_COMPUTER_OFFLINE_ERROR);
    expect(page.error?.message).toBe(
      "Connection to the project computer was lost.",
    );
    expect(page.page.source).toBe("exhausted");
  });

  it("H6: sign-out / leave — Neon untouched (plan counts + flag still meta-only)", () => {
    expect(formatProjectTaskPlanHint({ used: 0, max: 200 })).toBe(
      "0 of 200 tasks this plan",
    );
    expect(resolveProjectTaskPlanMax("pro")).toBe(200);
    expect(
      isProjectSyncModuleEnabled(
        { [AWC_PROJECT_SYNC_MODULE_ENV]: "1" } as unknown as NodeJS.ProcessEnv,
      ),
    ).toBe(true);
    expect(
      isProjectSyncModuleEnabled({} as unknown as NodeJS.ProcessEnv),
    ).toBe(false);
  });

  it("happy: map agent_runs row never carries body fields; title scrubbed ≤200", () => {
    const long = `API_KEY=sk-secret-value-abcdefghij ${"y".repeat(300)}`;
    const row = mapAgentRunRowToTaskNeonMeta({
      id: "run-scrub",
      projectId: "proj-1",
      status: "completed",
      createdAt: "2026-10-07T12:00:00.000000Z",
      updatedAt: "2026-10-07T12:01:00.000000Z",
      startedAt: null,
      endedAt: "2026-10-07T12:01:00.000000Z",
      writerAgent: "claude-cli",
      titleSrc: long.slice(0, PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS),
    });
    expect(row).not.toHaveProperty("prompt");
    expect(row).not.toHaveProperty("result_output");
    expect(row.title).not.toContain("sk-secret-value");
    expect(row.title.length).toBeLessThanOrEqual(
      PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS,
    );
    expect(scrubNeonMetaTitle(long).length).toBeLessThanOrEqual(
      PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS,
    );
  });
});
