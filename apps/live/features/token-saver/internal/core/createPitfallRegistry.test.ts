import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { PITFALL_MAX_ACTIVE_PER_PROJECT } from "../../public-api/types";
import { createPitfallRegistry } from "./createPitfallRegistry";
import { PITFALL_DB_BUSY_TIMEOUT_MS } from "./pitfall.constants";
import { listBundledSeedPitfalls } from "./pitfallSeedRows";
import { selectPitfall } from "./pitfallDbStatements";
import { openPitfallDb, closePitfallDb } from "./openPitfallDb";

const tempDirs: string[] = [];

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

const openTempRegistry = () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "awl-pitfall-"));
  tempDirs.push(tempDir);
  const dbPath = path.join(tempDir, "token-saver.db");
  const registry = createPitfallRegistry({ dbPath });
  return { registry, dbPath, tempDir };
};

describe("createPitfallRegistry", () => {
  it("seeds 11 rows idempotently without rewriting existing seed content", () => {
    const { registry, dbPath } = openTempRegistry();
    const first = registry.listPitfalls();
    expect(first.format).toBe("full");
    if (first.format !== "full") {
      return;
    }
    expect(first.items).toHaveLength(listBundledSeedPitfalls().length);
    expect(first.items.every((row) => row.source === "seed")).toBe(true);
    registry.close();

    const db = openPitfallDb(dbPath);
    const before = selectPitfall(db, null, "arch-max-lines");
    expect(before).not.toBeNull();
    if (before === null) {
      return;
    }
    // mutate seed avoidance directly to prove re-seed does not overwrite
    db.prepare(
      `UPDATE pitfalls SET avoidance = ? WHERE project_id = '' AND id = ?`,
    ).run("KEEP-ME", "arch-max-lines");
    closePitfallDb(db);

    const again = createPitfallRegistry({ dbPath });
    const listed = again.listPitfalls();
    expect(listed.format).toBe("full");
    if (listed.format !== "full") {
      return;
    }
    expect(listed.items).toHaveLength(11);
    const kept = listed.items.find((row) => row.id === "arch-max-lines");
    expect(kept?.avoidance).toBe("KEEP-ME");
    again.close();
  });

  it("project override shadows seed and never rewrites the seed row", () => {
    const { registry, dbPath } = openTempRegistry();
    const result = registry.upsertPitfall({
      id: "arch-max-lines",
      projectId: "proj-1",
      symptom: "Override symptom",
      cause: "Override cause",
      avoidance: "Use project-specific fix",
      check: { kind: "command", value: "npm run ci:architecture" },
      keywords: ["architecture", "land"],
    });
    expect(result.ok).toBe(true);

    const shadowed = registry.getPitfall({
      projectId: "proj-1",
      id: "arch-max-lines",
    });
    expect(shadowed?.avoidance).toBe("Use project-specific fix");
    expect(shadowed?.source).toBe("project");
    expect(shadowed?.projectId).toBe("proj-1");

    const seed = registry.getPitfall({ id: "arch-max-lines" });
    expect(seed?.source).toBe("seed");
    expect(seed?.avoidance).not.toBe("Use project-specific fix");

    const db = openPitfallDb(dbPath);
    expect(selectPitfall(db, null, "arch-max-lines")?.source).toBe("seed");
    expect(selectPitfall(db, "proj-1", "arch-max-lines")?.source).toBe(
      "project",
    );
    closePitfallDb(db);
    registry.close();
  });

  it("enforces the 64 active row cap per project", () => {
    const { registry } = openTempRegistry();
    const seedCount = listBundledSeedPitfalls().length;
    const extraNeeded = PITFALL_MAX_ACTIVE_PER_PROJECT - seedCount;

    for (let index = 0; index < extraNeeded; index += 1) {
      const result = registry.upsertPitfall({
        id: `extra-${index}`,
        projectId: "proj-cap",
        symptom: `Symptom ${index}`,
        cause: `Cause ${index}`,
        avoidance: `Fix ${index}`,
        check: { kind: "id", value: `pit.extra-${index}` },
        keywords: [`extra-${index}`],
      });
      expect(result.ok).toBe(true);
    }

    const overflow = registry.upsertPitfall({
      id: "extra-overflow",
      projectId: "proj-cap",
      symptom: "Too many",
      cause: "Cap",
      avoidance: "Should fail",
      check: { kind: "id", value: "pit.overflow" },
      keywords: ["overflow"],
    });
    expect(overflow.ok).toBe(false);
    if (overflow.ok) {
      return;
    }
    expect(overflow.error.kind).toBe("active_cap");
    registry.close();
  });

  it("recordHit bumps hitCount and lastSeenAt on seed when no override", () => {
    const { registry } = openTempRegistry();
    const nowIso = "2026-10-05T12:00:00.000Z";
    const hit = registry.recordHit({
      projectId: "proj-1",
      id: "health-lag",
      nowIso,
    });
    expect(hit.ok).toBe(true);
    if (!hit.ok) {
      return;
    }
    expect(hit.pitfall.hitCount).toBe(1);
    expect(hit.pitfall.lastSeenAt).toBe(nowIso);
    expect(hit.pitfall.projectId).toBeNull();

    const again = registry.recordHit({
      projectId: "proj-1",
      id: "health-lag",
      nowIso: "2026-10-05T13:00:00.000Z",
    });
    expect(again.ok).toBe(true);
    if (!again.ok) {
      return;
    }
    expect(again.pitfall.hitCount).toBe(2);
    registry.close();
  });

  it("bot format returns shared id|avoidance lines", () => {
    const { registry } = openTempRegistry();
    const bot = registry.listPitfalls({ format: "bot" });
    expect(bot.format).toBe("bot");
    if (bot.format !== "bot") {
      return;
    }
    expect(bot.lines.length).toBe(11);
    expect(bot.lines[0]).toMatch(/^[a-z0-9-]+\|[^|]/);
    expect(bot.items[0]).toEqual({
      id: expect.any(String),
      avoidance: expect.any(String),
    });
    registry.close();
  });

  it("opens the DB with a busy_timeout so short write locks wait", () => {
    const { registry, dbPath } = openTempRegistry();
    registry.close();
    const db = openPitfallDb(dbPath);
    const row = db.prepare("PRAGMA busy_timeout").get() as unknown as {
      readonly timeout: number;
    };
    closePitfallDb(db);
    expect(row.timeout).toBe(PITFALL_DB_BUSY_TIMEOUT_MS);
  });
});
