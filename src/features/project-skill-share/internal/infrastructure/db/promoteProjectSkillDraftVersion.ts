import type { ProjectSkillRecord } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { ensureProjectSkillShareSchema } from "@/features/project-skill-share/internal/infrastructure/db/ensureProjectSkillShareSchema";
import { mapProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/mapProjectSkillRow";
import { asRowArray, getSql } from "@/lib/db";

/** draft → published for an existing draft version (one atomic statement). */
export const promoteProjectSkillDraftVersion = async (input: {
  readonly skillRowId: string;
  readonly version: number;
}): Promise<ProjectSkillRecord | null> => {
  await ensureProjectSkillShareSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      WITH v AS (
        UPDATE project_skill_versions SET is_draft = FALSE
        WHERE skill_row_id = ${input.skillRowId}
          AND version = ${input.version} AND is_draft = TRUE
        RETURNING version, content_hash
      )
      UPDATE project_skills s SET state = 'published',
        published_version = v.version, content_hash = v.content_hash,
        revoked_at = NULL, revoked_by_user_id = NULL, updated_at = NOW()
      FROM v WHERE s.id = ${input.skillRowId}
      RETURNING s.*
    `,
  );
  return rows.length === 0 ? null : mapProjectSkillRow(rows[0]);
};
