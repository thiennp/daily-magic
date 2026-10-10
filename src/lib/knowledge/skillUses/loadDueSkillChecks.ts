import { asRowArray, getSql } from "@/lib/db";

export type DueSkillCheckRun = {
  readonly outcome: string;
  readonly title: string;
  readonly description: string | null;
  readonly resultSummary: string | null;
};

export type DueSkillCheck = {
  readonly checkId: number;
  readonly skillId: string;
  readonly skillName: string;
  readonly skillVersion: number;
  readonly usesAtCheck: number;
  readonly trigger: string;
  readonly skillBody: string;
  /** Finished runs since the previous check of this version (meta only). */
  readonly runs: readonly DueSkillCheckRun[];
};

const MAX_RUNS_PER_CHECK = 30;

/** Checks waiting for a judge, oldest first, each with the skill text and its window of runs. */
export const loadDueSkillChecks = async (
  projectId: string,
  limit: number,
): Promise<readonly DueSkillCheck[]> => {
  const sql = getSql();
  const checks = asRowArray(
    await sql`
      SELECT c.id, c.skill_id, c.skill_version, c.uses_at_check, c.trigger,
             c.last_use_id, ps.name, v.body,
             COALESCE((
               SELECT MAX(p.last_use_id) FROM project_skill_checks p
               WHERE p.project_id = c.project_id AND p.skill_id = c.skill_id
                 AND p.skill_version = c.skill_version
                 AND p.uses_at_check < c.uses_at_check), 0) AS prev_last_use_id
      FROM project_skill_checks c
      JOIN project_skills ps ON ps.project_id = c.project_id AND ps.skill_id = c.skill_id
      JOIN project_skill_versions v ON v.skill_row_id = ps.id AND v.version = c.skill_version
      WHERE c.project_id = ${projectId} AND c.status = 'due'
      ORDER BY c.created_at
      LIMIT ${limit}`,
  );
  return Promise.all(
    checks.map(async (check): Promise<DueSkillCheck> => {
      const runs = asRowArray(
        await sql`
          SELECT u.outcome, t.title, t.description, t.result_summary
          FROM project_skill_uses u
          LEFT JOIN project_task_records t
            ON t.id = u.task_id AND t.project_id = u.project_id
          WHERE u.project_id = ${projectId} AND u.skill_id = ${String(check.skill_id)}
            AND u.skill_version = ${Number(check.skill_version)}
            AND u.outcome IS NOT NULL
            AND u.id > ${Number(check.prev_last_use_id)}
            AND u.id <= ${Number(check.last_use_id)}
          ORDER BY u.id
          LIMIT ${MAX_RUNS_PER_CHECK}`,
      );
      return {
        checkId: Number(check.id),
        skillId: String(check.skill_id),
        skillName: String(check.name),
        skillVersion: Number(check.skill_version),
        usesAtCheck: Number(check.uses_at_check),
        trigger: String(check.trigger),
        skillBody: String(check.body),
        runs: runs.map((run) => ({
          outcome: String(run.outcome),
          title: run.title === null ? "(task removed)" : String(run.title),
          description:
            run.description === null ? null : String(run.description),
          resultSummary:
            run.result_summary === null ? null : String(run.result_summary),
        })),
      };
    }),
  );
};
