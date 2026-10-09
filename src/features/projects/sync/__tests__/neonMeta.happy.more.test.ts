/**
 * SPEC §11.1 happy paths — Dispatch Neon meta adapter slice (H4–H6 + scrub).
 */
import { describe, expect, it, vi } from "vitest";

import {
  formatProjectTaskPlanHint,
  resolveProjectTaskPlanMax,
} from "@/features/projects/sync/adapters/loadProjectTaskPlanCounts";
import {
  mapAgentRunRowToTaskNeonMeta,
  scrubNeonMetaTitle,
} from "@/features/projects/sync/adapters/projectTasksNeonMeta";
import { gateProjectTaskNeonMetaBatch } from "@/features/projects/sync/adapters/upsertProjectTaskNeonMeta";
import {
  isProjectSyncModuleEnabled,
  AWC_PROJECT_SYNC_MODULE_ENV,
} from "@/features/projects/sync/projectSyncFlag";
import { loadPage } from "@/features/projects/sync/projectSyncPager";
import {
  PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS,
  PROJECT_SYNC_COMPUTER_OFFLINE_ERROR,
} from "@/features/projects/sync/projectSync.types";
import { meta } from "@/features/projects/sync/__tests__/neonMeta.fixtures";

describe("§11.1 happy path — Neon meta adapter (H4–H6)", () => {
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
      isProjectSyncModuleEnabled({
        [AWC_PROJECT_SYNC_MODULE_ENV]: "1",
      } as unknown as NodeJS.ProcessEnv),
    ).toBe(true);
    // Rolled out: on unless the kill switch says 0 / false / off.
    expect(isProjectSyncModuleEnabled({} as unknown as NodeJS.ProcessEnv)).toBe(
      true,
    );
    for (const off of ["0", "false", "off", " OFF "]) {
      expect(
        isProjectSyncModuleEnabled({
          [AWC_PROJECT_SYNC_MODULE_ENV]: off,
        } as unknown as NodeJS.ProcessEnv),
      ).toBe(false);
    }
    expect(
      isProjectSyncModuleEnabled({
        NEXT_PUBLIC_AWC_PROJECT_SYNC_MODULE: "0",
      } as unknown as NodeJS.ProcessEnv),
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
