import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const read = (...parts: string[]) =>
  fs.readFileSync(path.join(process.cwd(), ...parts), "utf8");

const migration = read("db/migrations/109-project-task-records.sql");
const ensure = read("src/lib/projects/tasks/ensureProjectTaskRecordsSchema.ts");

const COLUMNS = [
  "project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE",
  "created_by_membership_id TEXT",
  "owner_membership_id TEXT",
  "char_length(title) BETWEEN 1 AND 120",
  "char_length(description) <= 200",
  "status IN ('queued', 'planned', 'in_progress', 'blocked', 'done')",
  "priority IN ('p0', 'p1', 'p2', 'p3')",
  "stage IN ('design', 'en', 'build', 'ready', 'live')",
  "tip_sha ~ '^[0-9a-f]{7,40}$'",
  "cardinality(depends_on) <= 10",
  "REFERENCES project_task_records(id) ON DELETE SET NULL",
  "started_at TIMESTAMPTZ",
  "blocked_at TIMESTAMPTZ",
  "done_at TIMESTAMPTZ",
  "stage_times JSONB NOT NULL DEFAULT '{}'::jsonb",
  "project_task_records_project_created_idx",
  "project_task_records_plan_item_idx",
  "project_task_records_creator_created_idx",
];

describe("migration 109 project_task_records shape (DF-024)", () => {
  it("creates the stand-alone table with capped meta columns", () => {
    expect(migration).toContain(
      "CREATE TABLE IF NOT EXISTS project_task_records",
    );
    for (const column of COLUMNS) expect(migration).toContain(column);
  });

  it("stores no body / prompt (Neon meta only) and is not agent_runs", () => {
    expect(migration).not.toMatch(/^\s*(body|prompt|report|logs)\s/m);
    expect(migration).not.toMatch(/ALTER TABLE\s+agent_runs/i);
  });

  it("runtime ensure mirrors the migration", () => {
    expect(ensure).toContain("109-project-task-records.sql");
    for (const column of COLUMNS) {
      if (column.startsWith("status IN")) continue; // updated in 116
      expect(ensure).toContain(column);
    }
    expect(ensure).toContain(
      "status IN ('queued', 'planned', 'in_progress', 'blocked', 'done', 'cancelled')",
    );
    expect(ensure).toContain("cancelled_at TIMESTAMPTZ");
  });
});
