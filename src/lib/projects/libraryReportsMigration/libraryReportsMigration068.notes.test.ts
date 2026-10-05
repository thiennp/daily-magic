import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const readMigration = (): string =>
  fs.readFileSync(
    path.join(
      process.cwd(),
      "db/migrations/068-library-reports-require-project.sql",
    ),
    "utf8",
  );

describe("068-library-reports-require-project.sql", () => {
  it("adds capability project_id, backfills, then sets NOT NULL with FK", () => {
    const sql = readMigration();
    expect(sql).toContain("ADD COLUMN IF NOT EXISTS project_id TEXT");
    expect(sql).toContain("UPDATE published_capabilities");
    expect(sql).toContain("UPDATE agent_runs");
    expect(sql).toContain("ALTER COLUMN project_id SET NOT NULL");
    expect(sql).toContain("published_capabilities_project_id_fkey");
    expect(sql).toContain("ON DELETE CASCADE");
    expect(sql).not.toMatch(/DELETE FROM published_capabilities/);
    expect(sql).not.toMatch(/DELETE FROM agent_runs/);
  });

  it("prefers Default private fallback; Personal only when Default is shared", () => {
    const sql = readMigration();
    expect(sql).toContain("user_projects_owner_default_null_device_idx");
    expect(sql).toContain("lower(name) = 'default'");
    expect(sql).toContain("needs_default_create");
    expect(sql).toContain("needs_personal_create");
    expect(sql).toContain("m.status = 'active'");
    expect(sql).toContain("m.user_id <> o.owner_user_id");
    expect(sql).toContain(
      "ORDER BY p.owner_user_id, p.created_at ASC, p.id ASC",
    );
    expect(sql).toContain("WHERE project_id IS NULL");
  });

  it("documents dry-run and verification orphan queries", () => {
    const sql = readMigration();
    expect(sql).toContain("capabilities_null");
    expect(sql).toContain("agent_runs_null");
    expect(sql).toContain("Verification after backfill");
  });
});
