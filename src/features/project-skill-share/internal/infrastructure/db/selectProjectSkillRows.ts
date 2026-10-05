import type { ProjectSkillRecord } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { ensureProjectSkillShareSchema } from "@/features/project-skill-share/internal/infrastructure/db/ensureProjectSkillShareSchema";
import { mapProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/mapProjectSkillRow";
import { asRowArray, getSql } from "@/lib/db";

/**
 * Draft + published rows (revoked excluded); visibility filtered in the orchestrator.
 * `strict` → throw on a non-array driver result instead of coercing to `[]`
 * (required by pull listPublished: errors must never look like an empty set).
 */
export const selectProjectSkillRows = async (input: {
  readonly projectId: string;
  readonly states: readonly string[];
  readonly strict?: boolean;
}): Promise<readonly ProjectSkillRecord[]> => {
  await ensureProjectSkillShareSchema();
  const sql = getSql();
  const result: unknown = await sql`
      SELECT * FROM project_skills
      WHERE project_id = ${input.projectId}
        AND state = ANY(${[...input.states]}::text[])
      ORDER BY updated_at DESC
    `;
  if (input.strict === true && !Array.isArray(result)) {
    throw new Error("project-skill selectProjectSkillRows: non-array result");
  }
  return asRowArray(result).map(mapProjectSkillRow);
};
