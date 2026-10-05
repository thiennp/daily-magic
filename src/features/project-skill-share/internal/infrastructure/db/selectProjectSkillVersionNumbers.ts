import { ensureProjectSkillShareSchema } from "@/features/project-skill-share/internal/infrastructure/db/ensureProjectSkillShareSchema";
import { asRowArray, getSql } from "@/lib/db";

export const selectProjectSkillVersionNumbers = async (
  skillRowId: string,
): Promise<readonly number[]> => {
  await ensureProjectSkillShareSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT version FROM project_skill_versions
      WHERE skill_row_id = ${skillRowId}
      ORDER BY version ASC
    `,
  );
  return rows.map((row) => Number(row.version));
};
