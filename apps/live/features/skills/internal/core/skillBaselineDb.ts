import type { SkillIndexDb } from "./skillIndex.types";
import { median } from "./skillSavings";

export type SkillBaseline = {
  readonly samples: readonly number[];
  readonly baseline: number | null;
  /** True when the token figures are estimated from text length. */
  readonly estimate: boolean;
};

export const getSkillBaseline = (
  db: SkillIndexDb,
  projectId: string,
  skillId: string,
): SkillBaseline => {
  const row = db
    .prepare(
      "SELECT samples, baseline, estimate FROM skill_baseline WHERE project_id = ? AND skill_id = ?",
    )
    .get(projectId, skillId) as
    { samples: string; baseline: number | null; estimate: number } | undefined;
  if (row === undefined) {
    return { samples: [], baseline: null, estimate: true };
  }
  return {
    samples: JSON.parse(row.samples) as number[],
    baseline: row.baseline,
    estimate: row.estimate === 1,
  };
};

const MAX_SAMPLES = 25;

/** Add one baseline sample; the baseline is the running median. */
export const addSkillBaselineSample = (
  db: SkillIndexDb,
  input: {
    readonly projectId: string;
    readonly skillId: string;
    readonly tokens: number;
    readonly estimate: boolean;
    readonly seeded?: boolean;
  },
): SkillBaseline => {
  const current = getSkillBaseline(db, input.projectId, input.skillId);
  const samples = [
    ...current.samples,
    Math.max(0, Math.round(input.tokens)),
  ].slice(-MAX_SAMPLES);
  const next: SkillBaseline = {
    samples,
    baseline: median(samples),
    estimate: current.estimate && input.estimate,
  };
  db.prepare(
    `INSERT OR REPLACE INTO skill_baseline (project_id, skill_id, samples,
      baseline, estimate, seeded) VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(
    input.projectId,
    input.skillId,
    JSON.stringify(samples),
    next.baseline,
    next.estimate ? 1 : 0,
    input.seeded === true ? 1 : 0,
  );
  return next;
};
