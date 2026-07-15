import { readdir } from "node:fs/promises";
import { join } from "node:path";

import { neonConfig, Pool } from "@neondatabase/serverless";
import ws from "ws";

import { sortMigrationFilenames } from "./db-migrate.util";

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

export async function bootstrapSchemaMigrations(
  dryRun: boolean,
): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required.");
  }

  const pool = new Pool({ connectionString: databaseUrl });

  try {
    await ensureSchemaMigrationsTable(pool);

    const filenames = sortMigrationFilenames(await readdir(MIGRATIONS_DIR));
    const appliedFilenames = await readAppliedMigrationFilenames(pool);
    const missingFilenames = filenames.filter(
      (filename) => !appliedFilenames.has(filename),
    );

    if (missingFilenames.length === 0) {
      console.log(
        "db-migrate:bootstrap — all migration files already recorded.",
      );
      return;
    }

    for (const filename of missingFilenames) {
      if (dryRun) {
        console.log(`db-migrate:bootstrap — would record ${filename}`);
        continue;
      }

      await pool.query(
        "INSERT INTO schema_migrations (filename) VALUES ($1) ON CONFLICT DO NOTHING",
        [filename],
      );
      console.log(`db-migrate:bootstrap — recorded ${filename}`);
    }

    console.log(
      `db-migrate:bootstrap — ${dryRun ? "would record" : "recorded"} ${missingFilenames.length} migration file(s).`,
    );
  } finally {
    await pool.end();
  }
}

const dryRun = process.argv.includes("--dry-run");

bootstrapSchemaMigrations(dryRun).catch((error: unknown) => {
  console.error("db-migrate:bootstrap failed:", error);
  process.exit(1);
});
