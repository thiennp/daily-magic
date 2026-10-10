import { getSql } from "@/lib/db";
import { ensureProjectSkillComparisonsSchema } from "@/lib/knowledge/skillUses/ensureProjectSkillComparisonsSchema";

/**
 * Begin serving the published version and the new draft version in turn.
 * One running comparison per skill; a second start is ignored. Never throws.
 */
export const startSkillComparison = async (input: {
  readonly projectId: string;
  readonly skillId: string;
  readonly newVersion: number;
  readonly checkId: number;
}): Promise<void> => {
  try {
    await ensureProjectSkillComparisonsSchema();
    await getSql()`
      INSERT INTO project_skill_comparisons (project_id, skill_id, old_version, new_version, check_id)
      SELECT ${input.projectId}, ps.skill_id, ps.published_version, ${input.newVersion}, ${input.checkId}
      FROM project_skills ps
      WHERE ps.project_id = ${input.projectId} AND ps.skill_id = ${input.skillId}
        AND ps.published_version IS NOT NULL AND ps.published_version <> ${input.newVersion}
      ON CONFLICT DO NOTHING`;
  } catch (error: unknown) {
    console.error("skill comparison start failed", {
      error: error instanceof Error ? error.message : "start_failed",
    });
  }
};
