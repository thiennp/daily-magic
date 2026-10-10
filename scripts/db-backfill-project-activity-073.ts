/**
 * Invite S1b (post-deploy, run once): close the gap between migration 092
 * and the new code going live. Re-runs db/migrations/092-project-activity-events.sql
 * (CREATE IF NOT EXISTS + INSERT … ON CONFLICT (source_ref) DO NOTHING), so it
 * never creates duplicates, then prints 073 vs linked Access log counts.
 *
 * Run: DATABASE_URL=… npx tsx scripts/db-backfill-project-activity-073.ts
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { Pool } from "pg";

const MIGRATION = join(
  process.cwd(),
  "db/migrations/092-project-activity-events.sql",
);

const countOf = async (pool: Pool, sql: string): Promise<number> => {
  const result = await pool.query<{ n: string }>(sql);
  return Number(result.rows[0]?.n ?? 0);
};

const main = async (): Promise<void> => {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (!databaseUrl) {
    console.log("backfill-073: DATABASE_URL not set — nothing to do.");
    return;
  }
  const pool = new Pool({ connectionString: databaseUrl });
  try {
    const sql = await readFile(MIGRATION, "utf8");
    const before = await countOf(
      pool,
      "SELECT count(*) AS n FROM project_activity_events WHERE source_ref LIKE '073:%'",
    );
    await pool.query(sql);
    const linked = await countOf(
      pool,
      "SELECT count(*) AS n FROM project_activity_events WHERE source_ref LIKE '073:%'",
    );
    const source = await countOf(
      pool,
      "SELECT count(*) AS n FROM project_invite_auto_approve_events",
    );
    console.log(
      `backfill-073: net change ${linked - before}; linked ${linked} of ${source} 073 rows (073 rows past retention, 500 per project / 180 days, are not kept).`,
    );
  } finally {
    await pool.end();
  }
};

main().catch((error: unknown) => {
  console.error(
    "backfill-073 failed:",
    error instanceof Error ? error.message : "unknown",
  );
  process.exit(1);
});
