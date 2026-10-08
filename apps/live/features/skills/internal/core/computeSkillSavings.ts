import type { SkillIndexDb } from "./skillIndex.types";
import { getSkillBaseline } from "./skillBaselineDb";
import { isEstimate } from "./skillSavings";

export type SkillSavings = {
  readonly skillId: string;
  readonly calls: number;
  readonly saved: number;
  readonly baseline: number | null;
  readonly samples: number;
  readonly holdouts: number;
  /** Shown with a ≈ mark: under 3 samples, or token figures were estimated. */
  readonly estimate: boolean;
  /** Finds that returned the skill and ended without choosing it. */
  readonly missRate: number;
  readonly hasScripts: boolean;
};

type Row = Record<string, unknown>;

const missRates = (
  db: SkillIndexDb,
  projectId: string,
  skillId: string,
): number => {
  const row = db
    .prepare(
      `SELECT COUNT(*) AS finds,
              SUM(CASE WHEN chosen_id IS NULL THEN 1 ELSE 0 END) AS misses
       FROM skill_find_log WHERE project_id = ? AND instr(returned_ids, ?) > 0`,
    )
    .get(projectId, JSON.stringify(skillId)) as Row;
  const finds = Number(row.finds);
  return finds === 0 ? 0 : Number(row.misses ?? 0) / finds;
};

/** Per-skill calls, tokens saved, baseline and miss rate for one project. */
export const computeSkillSavings = (
  db: SkillIndexDb,
  projectId: string,
): SkillSavings[] => {
  const skills = db
    .prepare(
      "SELECT skill_id, has_scripts FROM skill_index WHERE project_id = ?",
    )
    .all(projectId) as Row[];
  const calls = new Map(
    (
      db
        .prepare(
          `SELECT skill_id, SUM(CASE WHEN holdout = 0 THEN 1 ELSE 0 END) AS calls,
                  SUM(holdout) AS holdouts, SUM(COALESCE(saved_tokens, 0)) AS saved
           FROM skill_call WHERE project_id = ? AND tool = 'skills_run'
           GROUP BY skill_id`,
        )
        .all(projectId) as Row[]
    ).map((r) => [String(r.skill_id), r] as const),
  );
  return skills.map((skill) => {
    const skillId = String(skill.skill_id);
    const stats = calls.get(skillId);
    const baseline = getSkillBaseline(db, projectId, skillId);
    return {
      skillId,
      calls: Number(stats?.calls ?? 0),
      saved: Number(stats?.saved ?? 0),
      baseline: baseline.baseline,
      samples: baseline.samples.length,
      holdouts: Number(stats?.holdouts ?? 0),
      estimate: isEstimate(baseline.samples.length) || baseline.estimate,
      missRate: missRates(db, projectId, skillId),
      hasScripts: Number(skill.has_scripts) === 1,
    };
  });
};

export type SkillWeeklyPoint = {
  readonly weekStart: string;
  readonly chosen: number;
  readonly missed: number;
};

/** Weekly finds that returned skills: chosen one vs. missed (none chosen). */
export const computeSkillWeekly = (
  db: SkillIndexDb,
  projectId: string,
  weeks = 12,
): SkillWeeklyPoint[] => {
  const since = new Date(Date.now() - weeks * 7 * 86_400_000).toISOString();
  return (
    db
      .prepare(
        `SELECT date(created_at, 'weekday 0', '-6 days') AS week,
                SUM(CASE WHEN chosen_id IS NULL THEN 0 ELSE 1 END) AS chosen,
                SUM(CASE WHEN chosen_id IS NULL THEN 1 ELSE 0 END) AS missed
         FROM skill_find_log
         WHERE project_id = ? AND returned_ids != '[]' AND created_at >= ?
         GROUP BY week ORDER BY week`,
      )
      .all(projectId, since) as Row[]
  ).map((r) => ({
    weekStart: String(r.week),
    chosen: Number(r.chosen),
    missed: Number(r.missed),
  }));
};
