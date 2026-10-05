import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

// Static guard for the deploy-safe 069. The runtime proof against the real
// schema (duplicate Default/Personal projects with children, half-applied and
// repeated runs) lives in scripts/migration-proofs/prove069NoDataLoss.mjs
// (PGlite is not a repo dependency; run it with PGLITE_DIR, see file header).
const readMigration = (): string =>
  fs.readFileSync(
    path.join(
      process.cwd(),
      "db/migrations/069-library-reports-require-project.sql",
    ),
    "utf8",
  );

const withoutComments = (sql: string): string => sql.replace(/--.*$/gm, "");

const updateStatements = (sql: string): readonly string[] =>
  withoutComments(sql)
    .split(";")
    .map((statement) => statement.trim())
    .filter((statement) => /\bUPDATE\s+\w+/i.test(statement));

describe("069 no data loss", () => {
  it("never deletes or truncates rows", () => {
    const sql = withoutComments(readMigration());
    expect(sql).not.toMatch(/\bDELETE\s+FROM\b/i);
    expect(sql).not.toMatch(/\bTRUNCATE\b/i);
    expect(sql).not.toMatch(/\bDROP\s+TABLE\b/i);
  });

  it("only fills NULL project_id; never re-points a row that has a project", () => {
    const updates = updateStatements(readMigration());
    expect(updates).toHaveLength(4);
    for (const update of updates) {
      expect(update).toMatch(/\bUPDATE (published_capabilities|agent_runs) [a-z]\n/);
      expect(update).toMatch(/AND [a-z]\.project_id IS NULL$/);
    }
  });

  it("keeps duplicate Default/Personal projects and skips the guard index", () => {
    const sql = readMigration();
    expect(sql).toContain("HAVING COUNT(*) > 1");
    expect(sql.match(/kept as-is \(no delete, no re-point\)/g)).toHaveLength(2);
    expect(withoutComments(sql)).not.toMatch(/UPDATE user_projects/i);
  });

  it("drops any leftover guard index before the guarded re-create", () => {
    const sql = withoutComments(readMigration());
    const dropDefault = sql.indexOf(
      "DROP INDEX IF EXISTS user_projects_owner_default_null_device_idx;",
    );
    const dropPersonal = sql.indexOf(
      "DROP INDEX IF EXISTS user_projects_owner_personal_idx;",
    );
    expect(dropDefault).toBeGreaterThan(-1);
    expect(dropPersonal).toBeGreaterThan(-1);
    expect(dropPersonal).toBeLessThan(sql.indexOf("DO $$"));
  });

  it("run owner falls back requester -> executor -> capability owner; never NULL", () => {
    const sql = withoutComments(readMigration());
    const fallback =
      /COALESCE\(\s*(r|src)\.requester_user_id,\s*\1\.executor_user_id,\s*c\.owner_user_id\s*\)/g;
    expect(sql.match(fallback)?.length ?? 0).toBeGreaterThanOrEqual(4);
    expect(sql).toContain("WHERE owner_user_id IS NOT NULL");
    expect(sql.match(/AND owner_user_id IS NOT NULL/g)).toHaveLength(2);
  });

  it("ships the PGlite runtime proof", () => {
    const proof = path.join(
      process.cwd(),
      "scripts/migration-proofs/prove069NoDataLoss.mjs",
    );
    expect(fs.existsSync(proof)).toBe(true);
    expect(fs.readFileSync(proof, "utf8")).toContain("applied-but-record-dropped");
  });
});
