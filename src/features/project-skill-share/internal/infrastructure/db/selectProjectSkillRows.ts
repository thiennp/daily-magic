import type { ProjectSkillRecord } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { ensureProjectSkillShareSchema } from "@/features/project-skill-share/internal/infrastructure/db/ensureProjectSkillShareSchema";
import { mapProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/mapProjectSkillRow";
import { asRowArray, getSql } from "@/lib/db";

/**
 * Rows in `states` (+ latest version author); visibility filtered in the orchestrator.
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
      SELECT s.*, v.created_by_user_id AS latest_author_user_id,
        COALESCE(NULLIF(u.name, ''), split_part(u.email, '@', 1))
          AS latest_author_name
      FROM project_skills s
      LEFT JOIN project_skill_versions v
        ON v.skill_row_id = s.id AND v.version = s.latest_version
      LEFT JOIN users u ON u.id = v.created_by_user_id
      WHERE s.project_id = ${input.projectId}
        AND s.state = ANY(${[...input.states]}::text[])
      ORDER BY s.updated_at DESC
    `;
  if (input.strict === true && !Array.isArray(result)) {
    throw new Error("project-skill selectProjectSkillRows: non-array result");
  }
  return asRowArray(result).map(mapProjectSkillRow);
};
