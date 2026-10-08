import { randomUUID } from "node:crypto";

import type { SkillIndexDb } from "./skillIndex.types";

export type SkillCallRecord = {
  readonly skillId: string;
  readonly projectId: string;
  readonly runId: string | null;
  readonly chosenBy: "agent" | "bot" | "owner";
  readonly tool: string;
  readonly ok: boolean;
  readonly durationMs: number;
};

/** One row per tool call; savings columns stay NULL until phase 3. */
export const insertSkillCall = (
  db: SkillIndexDb,
  call: SkillCallRecord,
): void => {
  db.prepare(
    `INSERT INTO skill_call (id, skill_id, project_id, run_id, chosen_by,
      tool, ok, duration_ms, created_at, holdout)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
  ).run(
    randomUUID(),
    call.skillId,
    call.projectId,
    call.runId,
    call.chosenBy,
    call.tool,
    call.ok ? 1 : 0,
    Math.round(call.durationMs),
    new Date().toISOString(),
  );
};

export const insertFindLog = (
  db: SkillIndexDb,
  input: {
    readonly projectId: string;
    readonly query: string;
    readonly returnedIds: readonly string[];
    readonly runId: string | null;
  },
): void => {
  db.prepare(
    `INSERT INTO skill_find_log (project_id, query, returned_ids, run_id,
      created_at) VALUES (?, ?, ?, ?, ?)`,
  ).run(
    input.projectId,
    input.query.slice(0, 500),
    JSON.stringify(input.returnedIds),
    input.runId,
    new Date().toISOString(),
  );
};

/** Attach the chosen skill to the newest open find that returned it. */
export const markFindChosen = (
  db: SkillIndexDb,
  input: { readonly projectId: string; readonly skillId: string },
): void => {
  db.prepare(
    `UPDATE skill_find_log SET chosen_id = ? WHERE id = (
       SELECT id FROM skill_find_log
       WHERE project_id = ? AND chosen_id IS NULL
         AND instr(returned_ids, ?) > 0
       ORDER BY id DESC LIMIT 1)`,
  ).run(input.skillId, input.projectId, JSON.stringify(input.skillId));
};

/** MISS metric: finds that returned skills where none was chosen. */
export const computeSkillMissRate = (
  db: SkillIndexDb,
  projectId: string,
): {
  readonly finds: number;
  readonly misses: number;
  readonly rate: number;
} => {
  const row = db
    .prepare(
      `SELECT COUNT(*) AS finds,
              SUM(CASE WHEN chosen_id IS NULL THEN 1 ELSE 0 END) AS misses
       FROM skill_find_log WHERE project_id = ? AND returned_ids != '[]'`,
    )
    .get(projectId) as { finds: number; misses: number | null };
  const misses = Number(row.misses ?? 0);
  return {
    finds: Number(row.finds),
    misses,
    rate: row.finds === 0 ? 0 : misses / Number(row.finds),
  };
};
