import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectSkillComparisonsSchema } from "@/lib/knowledge/skillUses/ensureProjectSkillComparisonsSchema";

/** Finished runs of each version before the app offers to pick one. */
export const MIN_COMPARISON_RUNS = 3;

export type SkillComparison = {
  readonly id: number;
  readonly skillId: string;
  readonly skillName: string;
  readonly oldVersion: number;
  readonly newVersion: number;
  readonly oldRuns: number;
  readonly oldDone: number;
  readonly newRuns: number;
  readonly newDone: number;
  /** Both versions have enough finished runs to compare. */
  readonly ready: boolean;
};

const mapRow = (row: Record<string, unknown>): SkillComparison => {
  const oldRuns = Number(row.old_runs);
  const newRuns = Number(row.new_runs);
  return {
    id: Number(row.id),
    skillId: String(row.skill_id),
    skillName: String(row.name),
    oldVersion: Number(row.old_version),
    newVersion: Number(row.new_version),
    oldRuns,
    oldDone: Number(row.old_done),
    newRuns,
    newDone: Number(row.new_done),
    ready: oldRuns >= MIN_COMPARISON_RUNS && newRuns >= MIN_COMPARISON_RUNS,
  };
};

/** Running comparisons of a project with each version's finished and successful runs. Empty on any failure. */
export const listSkillComparisons = async (
  projectId: string,
): Promise<readonly SkillComparison[]> => {
  try {
    await ensureProjectSkillComparisonsSchema();
    return asRowArray(
      await getSql()`
        SELECT c.id, c.skill_id, ps.name, c.old_version, c.new_version,
          COUNT(u.id) FILTER (WHERE u.skill_version = c.old_version AND u.outcome IS NOT NULL)::int AS old_runs,
          COUNT(u.id) FILTER (WHERE u.skill_version = c.old_version AND u.outcome = 'done')::int AS old_done,
          COUNT(u.id) FILTER (WHERE u.skill_version = c.new_version AND u.outcome IS NOT NULL)::int AS new_runs,
          COUNT(u.id) FILTER (WHERE u.skill_version = c.new_version AND u.outcome = 'done')::int AS new_done
        FROM project_skill_comparisons c
        JOIN project_skills ps ON ps.project_id = c.project_id AND ps.skill_id = c.skill_id
        LEFT JOIN project_skill_uses u
          ON u.project_id = c.project_id AND u.skill_id = c.skill_id AND u.used_at >= c.started_at
        WHERE c.project_id = ${projectId} AND c.status = 'running'
        GROUP BY c.id, ps.name
        ORDER BY c.started_at
        LIMIT 20`,
    ).map(mapRow);
  } catch {
    return [];
  }
};

/** Close a running comparison with the owner's pick; false when it was not running. */
export const decideSkillComparison = async (input: {
  readonly projectId: string;
  readonly comparisonId: number;
  readonly winner: "old" | "new";
  readonly actorUserId: string;
}): Promise<boolean> =>
  asRowArray(
    await getSql()`
      UPDATE project_skill_comparisons SET status = 'decided', winner = ${input.winner},
        decided_at = NOW(), decided_by_user_id = ${input.actorUserId}
      WHERE id = ${input.comparisonId} AND project_id = ${input.projectId}
        AND status = 'running'
      RETURNING id`,
  ).length > 0;
