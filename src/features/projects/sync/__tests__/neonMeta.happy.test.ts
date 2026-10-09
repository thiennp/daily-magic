/**
 * SPEC §11.1 happy paths — Dispatch Neon meta adapter slice (H1–H3).
 */
import { describe, expect, it } from "vitest";

import { PROJECT_TASK_NEON_FIELDS } from "@/features/projects/sync/adapters/projectTasksNeonMeta";
import { gateProjectTaskNeonMetaBatch } from "@/features/projects/sync/adapters/upsertProjectTaskNeonMeta";
import {
  loadPage,
  mergeProjectSyncEntries,
} from "@/features/projects/sync/projectSyncPager";
import { meta } from "@/features/projects/sync/__tests__/neonMeta.fixtures";

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
    const idb = [
      meta({ id, createdAt: "2026-10-07T09:00:00.000000Z", title: "idb" }),
    ];
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
});
