// Railway can start two production deploys at once. Each runs preDeployCommand
// (`npm run db:migrate`). A transaction lock makes the second wait, then skip
// a filename the first deploy already stored in schema_migrations.

const MIGRATION_ADVISORY_LOCK_KEY = "81404320261002";

export interface MigrationDbClient {
  query: (
    sql: string,
    values?: unknown[],
  ) => Promise<{ rows: ReadonlyArray<{ filename?: string }> }>;
  release: () => void;
}

export interface MigrationDbPool {
  connect: () => Promise<MigrationDbClient>;
}

export async function applyDbMigrationFile(
  pool: MigrationDbPool,
  filename: string,
  sql: string,
): Promise<void> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    try {
      await client.query("SELECT pg_advisory_xact_lock($1::bigint)", [
        MIGRATION_ADVISORY_LOCK_KEY,
      ]);

      const existing = await client.query(
        "SELECT filename FROM schema_migrations WHERE filename = $1",
        [filename],
      );

      if (existing.rows.length > 0) {
        await client.query("COMMIT");
        console.log(`db-migrate: ${filename} already recorded — skipping.`);
        return;
      }

      await client.query(sql);
      await client.query(
        "INSERT INTO schema_migrations (filename) VALUES ($1)",
        [filename],
      );
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    }
  } finally {
    client.release();
  }
}
