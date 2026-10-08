import type { SkillIndexDb } from "./skillIndex.types";
import { addSkillBaselineSample, getSkillBaseline } from "./skillBaselineDb";
import { savedTokens } from "./skillSavings";

type CallRow = {
  id: string;
  skill_id: string;
  project_id: string;
  holdout: number;
  ok: number;
};

/**
 * A run finished with a known token figure: attribute it (evenly) to that
 * run's open `skills_run` calls and settle savings.
 *
 * - holdout call: the agent did the step itself, so its share is a baseline
 *   sample (running median)
 * - first successful call of a skill with no baseline: becomes the baseline
 * - later calls: saved = max(0, baseline - actual)
 *
 * `estimate` marks token figures derived from text length, not real usage.
 */
export const settleSkillCallsForRun = (
  db: SkillIndexDb,
  input: {
    readonly runId: string;
    readonly tokens: number;
    readonly estimate: boolean;
  },
): number => {
  const rows = db
    .prepare(
      `SELECT id, skill_id, project_id, holdout, ok FROM skill_call
       WHERE run_id = ? AND tool = 'skills_run' AND tokens_actual IS NULL
       ORDER BY created_at`,
    )
    .all(input.runId) as unknown as CallRow[];
  if (rows.length === 0 || input.tokens <= 0) {
    return 0;
  }
  const share = Math.round(input.tokens / rows.length);
  const update = db.prepare(
    `UPDATE skill_call SET tokens_actual = ?, baseline_tokens = ?,
       saved_tokens = ? WHERE id = ?`,
  );
  for (const row of rows) {
    const key = { projectId: row.project_id, skillId: row.skill_id };
    let baseline = getSkillBaseline(db, key.projectId, key.skillId);
    const isSample = row.holdout === 1 || baseline.baseline === null;
    if (isSample && (row.holdout === 1 || row.ok === 1)) {
      baseline = addSkillBaselineSample(db, {
        ...key,
        tokens: share,
        estimate: input.estimate,
      });
    }
    const saved =
      isSample || baseline.baseline === null
        ? 0
        : savedTokens(baseline.baseline, share);
    update.run(share, baseline.baseline, saved, row.id);
  }
  return rows.length;
};
