import { writeFile } from "node:fs/promises";

import { neon } from "@neondatabase/serverless";

import { parsePurgeArgs, purgeStatuses } from "./purgeOldProjectTasks.util";

/**
 * Remove old project tasks from the database, safely:
 *  1. Selects tasks created before --before (done/cancelled only unless
 *     --include-open), skipping tasks that already belong to the refinement model.
 *  2. Writes them (meta only) to --out BEFORE deleting; a failed export aborts.
 *  3. Deletes only with --confirm. Without it, prints counts and exits (dry run).
 * Usage: npm run tasks:purge-old -- --before 2026-10-10 [--project <id>] [--include-open] [--out file] [--confirm]
 */
const main = async (): Promise<void> => {
  const options = parsePurgeArgs(process.argv.slice(2));
  if ("error" in options) {
    console.error(options.error);
    process.exit(1);
  }
  const url = process.env.DATABASE_URL;
  if (url === undefined || url.length === 0) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }
  const sql = neon(url);
  const statuses = [...purgeStatuses(options.includeOpen)];
  const rows = (await sql`
    SELECT t.* FROM project_task_records t
    WHERE t.created_at < ${options.before}::timestamptz
      AND t.status = ANY(${statuses})
      AND (${options.projectId}::text IS NULL OR t.project_id = ${options.projectId})
      AND NOT EXISTS (
        SELECT 1 FROM project_task_refinement r
        WHERE r.task_id = t.id OR r.parent_task_id = t.id
      )
    ORDER BY t.created_at`) as {
    id: string;
    project_id: string;
    status: string;
  }[];
  const byStatus = rows.reduce<Record<string, number>>(
    (acc, row) => ({ ...acc, [row.status]: (acc[row.status] ?? 0) + 1 }),
    {},
  );
  console.log(
    `Found ${rows.length} task(s) before ${options.before}:`,
    byStatus,
  );
  if (rows.length === 0) return;
  await writeFile(
    options.outFile,
    `${JSON.stringify(rows, null, 2)}\n`,
    "utf-8",
  );
  console.log(`Exported to ${options.outFile}`);
  if (!options.confirm) {
    console.log("Dry run: nothing deleted. Re-run with --confirm to delete.");
    return;
  }
  await sql`DELETE FROM project_task_records WHERE id = ANY(${rows.map((r) => r.id)})`;
  console.log(`Deleted ${rows.length} task(s).`);
};

void main();
