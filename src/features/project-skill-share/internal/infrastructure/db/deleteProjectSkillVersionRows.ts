import { ensureProjectSkillShareSchema } from "@/features/project-skill-share/internal/infrastructure/db/ensureProjectSkillShareSchema";
import { getSql } from "@/lib/db";

export const deleteProjectSkillVersionRows = async (input: {
  readonly skillRowId: string;
  readonly versions: readonly number[];
}): Promise<void> => {
  if (input.versions.length === 0) {
    return;
  }
  await ensureProjectSkillShareSchema();
  const sql = getSql();
  await sql`
    DELETE FROM project_skill_versions
    WHERE skill_row_id = ${input.skillRowId}
      AND version = ANY(${[...input.versions]}::int[])
  `;
};
