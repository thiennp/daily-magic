import type { ProjectSkillRecord } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { ensureProjectSkillShareSchema } from "@/features/project-skill-share/internal/infrastructure/db/ensureProjectSkillShareSchema";
import { mapProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/mapProjectSkillRow";
import { asRowArray, getSql } from "@/lib/db";

export const selectProjectSkillRow = async (input: {
  readonly projectId: string;
  readonly skillId: string;
}): Promise<ProjectSkillRecord | null> => {
  await ensureProjectSkillShareSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT * FROM project_skills
      WHERE project_id = ${input.projectId} AND skill_id = ${input.skillId}
      LIMIT 1
    `,
  );
  return rows.length === 0 ? null : mapProjectSkillRow(rows[0]);
};
