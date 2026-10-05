// PGlite proof for 069: no data loss with duplicate Default/Personal projects,
// no re-pointing of rows that already have a project, idempotent re-runs.
// Run: PGLITE_DIR=<dir with node_modules/@electric-sql/pglite> node scripts/migration-proofs/prove069NoDataLoss.mjs
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { assertNoDataLoss, assertSameSnapshot } from "./assertNoDataLoss.mjs";
import { bootstrapSchemaThrough068, readMigrationSql } from "./bootstrapSchemaThrough068.mjs";
import {
  DRIFT_RUN_OWNERS,
  DUPLICATE_PROJECT_IDS,
  PRE_ASSIGNED_CAPABILITIES,
  seedDuplicateProjectsWithChildren,
} from "./seedDuplicateProjectsWithChildren.mjs";
import { countsOf, snapshotProjectChildren } from "./snapshotProjectChildren.mjs";

const ROOT = process.cwd();
const FILE = "069-library-reports-require-project.sql";
const SQL = readMigrationSql(ROOT, FILE);
const FIRST_PART = SQL.slice(0, SQL.indexOf("-- 4a)"));

const loadPGlite = async () => {
  const base = process.env.PGLITE_DIR ? path.join(process.env.PGLITE_DIR, "x.js") : import.meta.url;
  const resolved = createRequire(base).resolve("@electric-sql/pglite");
  return (await import(pathToFileURL(resolved).href)).PGlite;
};

// Same shape as scripts/applyDbMigrationFile.ts: one transaction per file.
const applyLikeRunner = async (db) => {
  await db.exec("BEGIN");
  try {
    const seen = await db.query("SELECT 1 FROM schema_migrations WHERE filename = $1", [FILE]);
    if (seen.rows.length === 0) {
      await db.exec(SQL);
      await db.query("INSERT INTO schema_migrations (filename) VALUES ($1)", [FILE]);
    }
    await db.exec("COMMIT");
  } catch (error) {
    await db.exec("ROLLBACK");
    throw error;
  }
};

const freshDb = async (PGlite, withPreAssigned, drift) => {
  const db = new PGlite();
  await bootstrapSchemaThrough068(db, ROOT);
  await seedDuplicateProjectsWithChildren(db);
  if (withPreAssigned) await db.exec(PRE_ASSIGNED_CAPABILITIES);
  if (drift) await db.exec(DRIFT_RUN_OWNERS);
  return db;
};

const scenario = async (PGlite, name, { preAssigned, partial, drift = false }) => {
  const db = await freshDb(PGlite, preAssigned, drift);
  const before = await snapshotProjectChildren(db);
  if (partial === "first-part") await db.exec(FIRST_PART);
  if (partial === "full-no-record") await db.exec(SQL);
  await applyLikeRunner(db);
  const after = await snapshotProjectChildren(db);
  const { problems, newProjects } = assertNoDataLoss(
    before, after, DUPLICATE_PROJECT_IDS, drift ? ["run_ownerless"] : [],
  );
  const ownerless = await db.query("SELECT COUNT(*)::int AS n FROM user_projects WHERE owner_user_id IS NULL");
  if (ownerless.rows[0].n !== 0) problems.push("ownerless project inserted");
  if (drift) {
    const owners = await db.query(
      `SELECT r.id, p.owner_user_id FROM agent_runs r JOIN user_projects p ON p.id = r.project_id
       WHERE r.id IN ('run_exec_only', 'run_cap_owner') ORDER BY r.id`,
    );
    const got = owners.rows.map((row) => `${row.id}=${row.owner_user_id}`).join(",");
    if (got !== "run_cap_owner=u_none,run_exec_only=u_exec") problems.push(`run owner fallback: ${got}`);
  }
  const guardIndexes = (await db.query(
    `SELECT indexname FROM pg_indexes WHERE indexname IN
     ('user_projects_owner_default_null_device_idx', 'user_projects_owner_personal_idx')`,
  )).rows.map((row) => row.indexname);
  if (guardIndexes.length > 0) problems.push(`guard index created despite duplicates: ${guardIndexes}`);
  await db.query("DELETE FROM schema_migrations WHERE filename = $1", [FILE]);
  await applyLikeRunner(db);
  await db.exec(SQL);
  problems.push(...assertSameSnapshot(after, await snapshotProjectChildren(db), name));
  await db.close();
  return { name, guardIndexes, countsBefore: countsOf(before), countsAfter: countsOf(after), newProjects,
    childrenAfter: { published_capabilities: after.published_capabilities, agent_runs: after.agent_runs },
    problems };
};

const main = async () => {
  const PGlite = await loadPGlite();
  const results = [
    await scenario(PGlite, "prod-like", { preAssigned: false, partial: null }),
    await scenario(PGlite, "pre-assigned-library-rows", { preAssigned: true, partial: null }),
    await scenario(PGlite, "half-applied-first-part", { preAssigned: true, partial: "first-part" }),
    await scenario(PGlite, "applied-but-record-dropped", { preAssigned: true, partial: "full-no-record" }),
    await scenario(PGlite, "run-owner-fallback-drift", { preAssigned: true, partial: null, drift: true }),
  ];
  console.log(JSON.stringify(results, null, 2));
  const failed = results.filter((r) => r.problems.length > 0);
  console.log(failed.length === 0 ? "PROOF PASS" : `PROOF FAIL (${failed.map((r) => r.name).join(", ")})`);
  process.exit(failed.length === 0 ? 0 : 1);
};

await main();
