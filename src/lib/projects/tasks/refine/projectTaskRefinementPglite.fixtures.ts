import fs from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";

const MIGRATION = fs.readFileSync(
  path.resolve(
    __dirname,
    "../../../../../db/migrations/135-project-task-refinement.sql",
  ),
  "utf-8",
);

/** PGlite with a minimal task table plus the real 135 migration SQL. */
export const createRefinementDb = async (): Promise<{
  readonly db: PGlite;
  readonly sql: (
    strings: TemplateStringsArray,
    ...values: unknown[]
  ) => Promise<unknown[]>;
}> => {
  const db = new PGlite();
  await db.exec(`CREATE TABLE project_task_records (
    id TEXT PRIMARY KEY, project_id TEXT NOT NULL, title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'queued', blocked_at TIMESTAMPTZ,
    started_at TIMESTAMPTZ, done_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`);
  await db.exec(MIGRATION);
  const sql = async (strings: TemplateStringsArray, ...values: unknown[]) => {
    const text = strings.reduce((acc, part, i) => `${acc}$${i}${part}`);
    return (await db.query(text, values)).rows;
  };
  return { db, sql };
};

export const resetRefinementDb = async (db: PGlite): Promise<void> => {
  await db.exec(
    "DELETE FROM project_task_refinement; DELETE FROM project_task_records;",
  );
  await db.exec(
    `INSERT INTO project_task_records (id, project_id, title) VALUES ('t1', 'p1', 'Task one')`,
  );
};
