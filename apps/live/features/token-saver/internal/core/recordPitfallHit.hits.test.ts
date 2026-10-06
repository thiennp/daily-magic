import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { createPitfallRegistry } from "./createPitfallRegistry";
import { closePitfallDb, openPitfallDb } from "./openPitfallDb";

const tempDirs: string[] = [];

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

const openTemp = () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "awl-pitfall-hits-"));
  tempDirs.push(tempDir);
  const dbPath = path.join(tempDir, "token-saver.db");
  return { registry: createPitfallRegistry({ dbPath }), dbPath };
};

const countRows = (dbPath: string, table: string): number => {
  const db = openPitfallDb(dbPath);
  const row = db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get() as unknown as {
    n: number;
  };
  closePitfallDb(db);
  return row.n;
};

const readHits = (dbPath: string): readonly unknown[] => {
  const db = openPitfallDb(dbPath);
  const rows = db
    .prepare(
      "SELECT project_id, pitfall_id, hit_count FROM pitfall_hits ORDER BY project_id",
    )
    .all()
    .map((row) => ({ ...row }));
  closePitfallDb(db);
  return rows;
};

describe("recordHit uses the pitfall_hits table (must-fix a)", () => {
  it("returns not_found for unknown ids and never creates a pitfall or hit row", () => {
    const { registry, dbPath } = openTemp();
    const before = countRows(dbPath, "pitfalls");
    const miss = registry.recordHit({ projectId: "proj-1", id: "no-such-id" });
    expect(miss).toEqual({ ok: false, reason: "not_found" });
    expect(countRows(dbPath, "pitfalls")).toBe(before);
    expect(countRows(dbPath, "pitfall_hits")).toBe(0);
    registry.close();
  });

  it("keys counters per project + pitfall id and leaves pitfall rows untouched", () => {
    const { registry, dbPath } = openTemp();
    registry.recordHit({ projectId: "proj-1", id: "secrets-in-logs" });
    registry.recordHit({ projectId: "proj-1", id: "secrets-in-logs" });
    registry.recordHit({ projectId: "proj-2", id: "secrets-in-logs" });

    expect(readHits(dbPath)).toEqual([
      { project_id: "proj-1", pitfall_id: "secrets-in-logs", hit_count: 2 },
      { project_id: "proj-2", pitfall_id: "secrets-in-logs", hit_count: 1 },
    ]);
    expect(registry.getPitfall({ projectId: "proj-1", id: "secrets-in-logs" })?.hitCount).toBe(2);
    expect(registry.getPitfall({ projectId: "proj-2", id: "secrets-in-logs" })?.hitCount).toBe(1);
    expect(registry.getPitfall({ id: "secrets-in-logs" })?.hitCount).toBe(0);

    const db = openPitfallDb(dbPath);
    const columns = db
      .prepare("PRAGMA table_info(pitfalls)")
      .all()
      .map((row) => (row as { name: string }).name);
    closePitfallDb(db);
    expect(columns).not.toContain("hit_count");
    expect(columns).not.toContain("last_seen_at");
    registry.close();
  });

  it("bumps atomically in SQL from the stored counter, not a cached value", () => {
    const { registry, dbPath } = openTemp();
    const db = openPitfallDb(dbPath);
    db.prepare(
      `INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count, last_seen_at)
       VALUES ('proj-1', 'secrets-in-logs', 41, NULL)`,
    ).run();
    closePitfallDb(db);

    const nowIso = "2026-10-05T12:00:00.000Z";
    const hit = registry.recordHit({ projectId: "proj-1", id: "secrets-in-logs", nowIso });
    expect(hit.ok).toBe(true);
    if (!hit.ok) {
      return;
    }
    expect(hit.pitfall.hitCount).toBe(42);
    expect(hit.pitfall.lastSeenAt).toBe(nowIso);
    registry.close();
  });
});
