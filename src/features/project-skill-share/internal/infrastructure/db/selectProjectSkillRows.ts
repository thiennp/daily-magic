import type { ProjectSkillRecord } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { ensureProjectSkillShareSchema } from "@/features/project-skill-share/internal/infrastructure/db/ensureProjectSkillShareSchema";
import { mapProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/mapProjectSkillRow";
import { asRowArray, getSql } from "@/lib/db";

/** Draft + published rows (revoked excluded); visibility filtered in the orchestrator. */
export const selectProjectSkillRows = async (input: {
  readonly projectId: string;
  readonly states: readonly string[];
}): Promise<readonly ProjectSkillRecord[]> => {
  await ensureProjectSkillShareSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT * FROM project_skills
      WHERE project_id = ${input.projectId}
        AND state = ANY(${[...input.states]}::text[])
      ORDER BY updated_at DESC
    `,
  );
  return rows.map(mapProjectSkillRow);
};
