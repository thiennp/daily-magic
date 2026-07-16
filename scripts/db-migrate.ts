import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

import { neonConfig, Pool } from "@neondatabase/serverless";
import ws from "ws";

import {
  listLegacySchemaSqlMigrationFilenames,
  listPendingMigrationFilenames,
  sortMigrationFilenames,
} from "./db-migrate.util";

neonConfig.webSocketConstructor = ws;

const MIGRATIONS_DIR = join(process.cwd(), "db/migrations");

const ensureSchemaMigrationsTable = async (pool: Pool): Promise<void> => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
};

const readAppliedMigrationFilenames = async (
  pool: Pool,
): Promise<ReadonlySet<string>> => {
  const result = await pool.query<{ filename: string }>(
    "SELECT filename FROM schema_migrations",
  );

  return new Set(result.rows.map((row) => row.filename));
};

const applyMigrationFile = async (
  pool: Pool,
  filename: string,
): Promise<void> => {
  const sql = await readFile(join(MIGRATIONS_DIR, filename), "utf8");

  await pool.query("BEGIN");

  try {
    await pool.query(sql);
    await pool.query("INSERT INTO schema_migrations (filename) VALUES ($1)", [
      filename,
    ]);
    await pool.query("COMMIT");
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};

const hasSchemaSqlSnapshot = async (pool: Pool): Promise<boolean> => {
  const result = await pool.query<{ exists: boolean }>(`
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'users'
        AND column_name = 'onboarding_setup_acknowledged'
    ) AS exists
  `);

  return result.rows[0]?.exists === true;
};

const recordLegacySchemaSqlMigrations = async (
  pool: Pool,
  filenames: readonly string[],
  appliedFilenames: ReadonlySet<string>,
): Promise<ReadonlySet<string>> => {
  const hasSnapshot = await hasSchemaSqlSnapshot(pool);
  const legacyFilenames = listLegacySchemaSqlMigrationFilenames(
    filenames,
    appliedFilenames,
    hasSnapshot,
  );

  if (legacyFilenames.length === 0) {
    return appliedFilenames;
  }

  console.log(
    `db-migrate: schema.sql snapshot detected — recording ${legacyFilenames.length} legacy migration(s) without re-running.`,
  );

  const updatedAppliedFilenames = new Set(appliedFilenames);

  for (const filename of legacyFilenames) {
    await pool.query(
      "INSERT INTO schema_migrations (filename) VALUES ($1) ON CONFLICT DO NOTHING",
      [filename],
    );
    updatedAppliedFilenames.add(filename);
    console.log(`db-migrate: recorded legacy ${filename}`);
  }

  return updatedAppliedFilenames;
};

export async function runPendingDbMigrations(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    console.log("db-migrate: DATABASE_URL not set — skipping migrations.");
    return;
  }

  const pool = new Pool({ connectionString: databaseUrl });

  try {
    await ensureSchemaMigrationsTable(pool);

    const filenames = await readdir(MIGRATIONS_DIR);
    const appliedFilenames = await readAppliedMigrationFilenames(pool);
    const appliedAfterLegacy = await recordLegacySchemaSqlMigrations(
      pool,
      filenames,
      appliedFilenames,
    );
    const pendingFilenames = listPendingMigrationFilenames(
      filenames,
      appliedAfterLegacy,
    );

    if (pendingFilenames.length === 0) {
      console.log("db-migrate: no pending migrations.");
      return;
    }

    for (const filename of pendingFilenames) {
      console.log(`db-migrate: applying ${filename}…`);
      await applyMigrationFile(pool, filename);
    }

    console.log(`db-migrate: applied ${pendingFilenames.length} migration(s).`);
  } finally {
    await pool.end();
  }
}

const isDirectExecution = process.argv[1]?.endsWith("db-migrate.ts") === true;

if (isDirectExecution) {
  runPendingDbMigrations().catch((error: unknown) => {
    console.error("db-migrate failed:", error);
    process.exit(1);
  });
}

export { sortMigrationFilenames };
