import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { PROJECT_PITFALL_AGENTWITCH_PROJECT_ID as AW } from "@agent-witch/shared/pitfalls";
import { afterEach, describe, expect, it } from "vitest";

import { createPitfallRegistry } from "./createPitfallRegistry";
import { closePitfallDb, openPitfallDb, type PitfallDatabase } from "./openPitfallDb";

const tempDirs: string[] = [];

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

const LEGACY_SEEDS = ["arch-max-lines", "ci-yml-main-only", "no-prs-daily-magic"];

const insertRow = (db: PitfallDatabase, projectId: string, id: string, source: string) =>
  db
    .prepare(
      `INSERT INTO pitfalls (project_id, id, symptom, cause, avoidance, check_kind,
         check_value, keywords_json, tags_json, source, severity)
       VALUES (?, ?, 'S', 'C', ?, 'id', 'pit.x', '[]', '[]', ?, 'warn')`,
    )
    .run(projectId, id, `avoid ${id}`, source);

/** A pre-trim local DB: legacy seeds, hits, and a user-authored row. */
const legacyDb = (knowsAgentWitch: boolean): string => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "awl-pitfall-retire-"));
  tempDirs.push(tempDir);
  const dbPath = path.join(tempDir, "token-saver.db");
  const db = openPitfallDb(dbPath);
  LEGACY_SEEDS.forEach((id) => insertRow(db, "", id, "seed"));
  insertRow(db, "user-proj", "my-own-rule", "project");
  db.prepare(
    `INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count) VALUES (?, ?, 7)`,
  ).run(knowsAgentWitch ? AW : "user-proj", "arch-max-lines");
  closePitfallDb(db);
  return dbPath;
};

const rows = (dbPath: string) => {
  const db = openPitfallDb(dbPath);
  const all = db
    .prepare("SELECT project_id, id, source, avoidance FROM pitfalls ORDER BY project_id, id")
    .all() as unknown as { project_id: string; id: string; source: string; avoidance: string }[];
  const hits = db.prepare("SELECT * FROM pitfall_hits").all();
  closePitfallDb(db);
  return { all, hits };
};

describe("retireStaleLocalSeedPitfalls", () => {
  it("moves legacy seeds onto the AgentWitch project with the same ids and keeps hits", () => {
    const dbPath = legacyDb(true);
    createPitfallRegistry({ dbPath }).close();
    const after = rows(dbPath);
    expect(after.all.filter((row) => row.project_id === "").map((row) => row.id)).toEqual([
      "secrets-in-logs",
    ]);
    const moved = after.all.filter((row) => row.project_id === AW);
    expect(moved.map((row) => row.id)).toEqual(LEGACY_SEEDS);
    expect(moved.every((row) => row.source === "project")).toBe(true);
    expect(moved[0]?.avoidance).toBe("avoid arch-max-lines");
    expect(after.all.some((row) => row.id === "my-own-rule")).toBe(true);
    expect(after.hits).toEqual([
      { project_id: AW, pitfall_id: "arch-max-lines", hit_count: 7, last_seen_at: null },
    ]);
    const registry = createPitfallRegistry({ dbPath });
    expect(registry.getPitfall({ projectId: AW, id: "arch-max-lines" })?.hitCount).toBe(7);
    registry.close();
    expect(rows(dbPath)).toEqual(after);
  });

  it("only drops legacy seeds when the DB does not know the AgentWitch project", () => {
    const dbPath = legacyDb(false);
    createPitfallRegistry({ dbPath }).close();
    const after = rows(dbPath);
    expect(after.all.map((row) => `${row.project_id}/${row.id}`)).toEqual([
      "/secrets-in-logs",
      "user-proj/my-own-rule",
    ]);
    expect(after.hits).toHaveLength(1);
  });

  it("never overwrites an existing AgentWitch row", () => {
    const dbPath = legacyDb(true);
    const db = openPitfallDb(dbPath);
    insertRow(db, AW, "ci-yml-main-only", "retired");
    closePitfallDb(db);
    createPitfallRegistry({ dbPath }).close();
    const kept = rows(dbPath).all.find((row) => row.project_id === AW && row.id === "ci-yml-main-only");
    expect(kept?.source).toBe("retired");
  });
});
