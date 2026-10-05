import type { ProjectSkillVersionRecord } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { ensureProjectSkillShareSchema } from "@/features/project-skill-share/internal/infrastructure/db/ensureProjectSkillShareSchema";
import { mapProjectSkillVersionRow } from "@/features/project-skill-share/internal/infrastructure/db/mapProjectSkillVersionRow";
import { asRowArray, getSql } from "@/lib/db";

export const selectProjectSkillVersionRow = async (input: {
  readonly skillRowId: string;
  readonly version: number;
}): Promise<ProjectSkillVersionRecord | null> => {
  await ensureProjectSkillShareSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT * FROM project_skill_versions
      WHERE skill_row_id = ${input.skillRowId} AND version = ${input.version}
      LIMIT 1
    `,
  );
  return rows.length === 0 ? null : mapProjectSkillVersionRow(rows[0]);
};
