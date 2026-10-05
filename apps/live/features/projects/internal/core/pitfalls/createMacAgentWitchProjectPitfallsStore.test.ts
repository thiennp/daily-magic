import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import type { ProjectPitfallView } from "@agent-witch/shared/pitfalls";
import { createPitfallRegistry } from "@agent-witch/live-token-saver";
import { PITFALL_MAX_ACTIVE_PER_PROJECT } from "@agent-witch/live-token-saver/types";

import type {
  AgentWitchProjectPitfallsStore,
  ListAgentWitchPitfallsResult,
} from "./agentWitchProjectPitfallsStore.type";
import createMacAgentWitchProjectPitfallsStore from "./createMacAgentWitchProjectPitfallsStore";
import { buildPitfallFixture } from "./projectPitfallFixtures.testUtil";

const tempDirs: string[] = [];

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

const openTempDbPath = (): string => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "awl-pitfall-mac-"));
  tempDirs.push(tempDir);
  return path.join(tempDir, "token-saver.db");
};

const cloudList = (
  items: readonly ProjectPitfallView[],
): AgentWitchProjectPitfallsStore => ({
  listPitfalls: async () => ({
    ok: true,
    items,
    syncedAt: "2026-10-05T12:00:00.000Z",
  }),
  upsertPitfall: async () => ({ ok: true }),
});

describe("createMacAgentWitchProjectPitfallsStore", () => {
  it("lists from a temp SQLite DB (never the real profile) including seeds", async () => {
    const dbPath = openTempDbPath();
    const store = createMacAgentWitchProjectPitfallsStore({
      dbPath,
      cloud: null,
    });
    const listed = await store.listPitfalls("proj-1", {
      includeRetired: false,
    });
    expect(listed.ok).toBe(true);
    if (!listed.ok) {
      return;
    }
    expect(listed.items.length).toBeGreaterThan(0);
    expect(listed.items.every((item) => item.source === "seed")).toBe(true);
    expect(listed.syncedAt).toBeNull();
  });

  it("write-through: upserts cloud first then caches content locally", async () => {
    const dbPath = openTempDbPath();
    const upserts: string[] = [];
    const cloud: AgentWitchProjectPitfallsStore = {
      listPitfalls: async () => ({ ok: true, items: [], syncedAt: null }),
      upsertPitfall: async (_projectId, pitfall) => {
        upserts.push(pitfall.id);
        return { ok: true };
      },
    };
    const store = createMacAgentWitchProjectPitfallsStore({ dbPath, cloud });
    const result = await store.upsertPitfall("proj-1", {
      id: "project-custom-1",
      symptom: "Flaky CI",
      cause: "Shared cache.",
      avoidance: "Isolate the job.",
      check: { kind: "command", value: "npm test" },
      keywords: ["ci"],
      tags: [],
      severity: "warn",
      source: "project",
    });
    expect(result).toEqual({ ok: true });
    expect(upserts).toEqual(["project-custom-1"]);

    const localOnly = createMacAgentWitchProjectPitfallsStore({
      dbPath,
      cloud: null,
    });
    const listed = await localOnly.listPitfalls("proj-1", {
      includeRetired: false,
    });
    expect(listed.ok).toBe(true);
    if (!listed.ok) {
      return;
    }
    const found = listed.items.find((item) => item.id === "project-custom-1");
    expect(found?.symptom).toBe("Flaky CI");
    expect(found?.hitCount).toBe(0);
  });

  it("syncs cloud content into SQLite on list and keeps local hit counters", async () => {
    const dbPath = openTempDbPath();
    const registry = createPitfallRegistry({ dbPath });
    registry.upsertPitfall({
      id: "project-custom-1",
      projectId: "proj-1",
      symptom: "Stale local",
      cause: "Old",
      avoidance: "Old fix",
      check: { kind: "command", value: "true" },
      keywords: [],
      source: "project",
    });
    const hit = registry.recordHit({
      projectId: "proj-1",
      id: "project-custom-1",
      nowIso: "2026-10-05T11:00:00.000Z",
    });
    expect(hit.ok).toBe(true);
    registry.close();

    const remoteItem = buildPitfallFixture({
      id: "project-custom-1",
      symptom: "Fresh from cloud",
      cause: "Cloud cause",
      avoidance: "Cloud fix",
      source: "project",
      hitCount: 99,
      lastSeenAt: "2026-10-01T00:00:00.000Z",
    });
    const store = createMacAgentWitchProjectPitfallsStore({
      dbPath,
      cloud: cloudList([remoteItem]),
    });
    const listed = await store.listPitfalls("proj-1", {
      includeRetired: false,
    });
    expect(listed.ok).toBe(true);
    if (!listed.ok) {
      return;
    }
    const found = listed.items.find((item) => item.id === "project-custom-1");
    expect(found?.symptom).toBe("Fresh from cloud");
    // Hits stay in local pitfall_hits — upsert/sync writes content only.
    expect(found?.hitCount).toBe(1);
    expect(found?.lastSeenAt).toBe("2026-10-05T11:00:00.000Z");
    expect(
      (listed as Extract<ListAgentWitchPitfallsResult, { ok: true }>).syncedAt,
    ).toBe("2026-10-05T12:00:00.000Z");
  });

  it("returns unavailable when the DB path cannot be opened and cloud is absent", async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-pitfall-bad-"));
    tempDirs.push(root);
    // Parent is a file → mkdirSync inside openPitfallDb fails.
    const blocker = path.join(root, "not-a-directory");
    fs.writeFileSync(blocker, "not-a-directory");
    const badDb = path.join(blocker, "nested", "token-saver.db");

    const store = createMacAgentWitchProjectPitfallsStore({
      dbPath: badDb,
      cloud: null,
    });
    const listed = await store.listPitfalls("proj-1", {
      includeRetired: false,
    });
    expect(listed).toEqual({ ok: false, reason: "unavailable" });
  });

  it("falls back to cloud list when local open fails", async () => {
    const blockerDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "awl-pitfall-block-"),
    );
    tempDirs.push(blockerDir);
    const blocker = path.join(blockerDir, "not-dir");
    fs.writeFileSync(blocker, "x");
    const badDb = path.join(blocker, "token-saver.db");

    const remote = buildPitfallFixture({ id: "cloud-only" });
    const store = createMacAgentWitchProjectPitfallsStore({
      dbPath: badDb,
      cloud: cloudList([remote]),
    });
    const listed = await store.listPitfalls("proj-1", {
      includeRetired: false,
    });
    expect(listed.ok).toBe(true);
    if (!listed.ok) {
      return;
    }
    expect(listed.items.map((item) => item.id)).toContain("cloud-only");
  });

  it("maps local validation failures and exposes the shared active cap", async () => {
    expect(PITFALL_MAX_ACTIVE_PER_PROJECT).toBe(64);
    const dbPath = openTempDbPath();
    const store = createMacAgentWitchProjectPitfallsStore({
      dbPath,
      cloud: null,
    });
    const rejected = await store.upsertPitfall("proj-1", {
      id: "",
      symptom: "Missing id",
      cause: "Empty",
      avoidance: "Provide an id",
      check: { kind: "command", value: "true" },
      keywords: [],
      tags: [],
      severity: "info",
      source: "project",
    });
    expect(rejected).toEqual({ ok: false, reason: "rejected" });

    // Cap mapping: fill via the registry directly, then one more through the store.
    const registry = createPitfallRegistry({ dbPath });
    const seedCount = registry.listPitfalls({
      projectId: "proj-1",
      includeRetired: false,
      format: "full",
    });
    expect(seedCount.format).toBe("full");
    if (seedCount.format !== "full") {
      registry.close();
      return;
    }
    for (
      let i = 0;
      i < PITFALL_MAX_ACTIVE_PER_PROJECT - seedCount.items.length;
      i += 1
    ) {
      const filled = registry.upsertPitfall({
        id: `fill-${i}`,
        projectId: "proj-1",
        symptom: `S${i}`,
        cause: `C${i}`,
        avoidance: `A${i}`,
        check: { kind: "command", value: "true" },
        keywords: [],
        source: "project",
        severity: "info",
      });
      expect(filled.ok).toBe(true);
    }
    registry.close();

    const overflow = await store.upsertPitfall("proj-1", {
      id: "overflow",
      symptom: "Too many",
      cause: "Cap",
      avoidance: "Retire one",
      check: { kind: "command", value: "true" },
      keywords: [],
      tags: [],
      severity: "info",
      source: "project",
    });
    expect(overflow).toEqual({ ok: false, reason: "active_limit" });
  });

  it("recordHit on the underlying registry returns not_found for unknown ids", () => {
    const dbPath = openTempDbPath();
    const registry = createPitfallRegistry({ dbPath });
    const missing = registry.recordHit({
      projectId: "proj-1",
      id: "does-not-exist",
    });
    expect(missing).toEqual({ ok: false, reason: "not_found" });
    registry.close();
  });
});
