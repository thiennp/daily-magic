import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectSkillChecksSchema } from "@/lib/knowledge/skillUses/ensureProjectSkillChecksSchema";

export type SkillCheckStat = {
  readonly skillId: string;
  /** Checks the judge finished for this skill. */
  readonly checks: number;
  /** Of those, the ones that said a better version would help. */
  readonly improves: number;
};

/** Per skill: how often it was checked and how often the judge wanted it improved. Empty on any failure. */
export const listSkillCheckStats = async (
  projectId: string,
): Promise<readonly SkillCheckStat[]> => {
  try {
    await ensureProjectSkillChecksSchema();
    return asRowArray(
      await getSql()`
        SELECT skill_id,
               COUNT(*)::int AS checks,
               COUNT(*) FILTER (WHERE verdict = 'improve')::int AS improves
        FROM project_skill_checks
        WHERE project_id = ${projectId} AND status = 'judged'
        GROUP BY skill_id`,
    ).map((row) => ({
      skillId: String(row.skill_id),
      checks: Number(row.checks),
      improves: Number(row.improves),
    }));
  } catch {
    return [];
  }
};
