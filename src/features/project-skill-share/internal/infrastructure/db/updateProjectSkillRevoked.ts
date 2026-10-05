import type { ProjectSkillRecord } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { ensureProjectSkillShareSchema } from "@/features/project-skill-share/internal/infrastructure/db/ensureProjectSkillShareSchema";
import { mapProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/mapProjectSkillRow";
import { asRowArray, getSql } from "@/lib/db";

/** published|draft → revoked. Versions stay (owner may republish). */
export const updateProjectSkillRevoked = async (input: {
  readonly skillRowId: string;
  readonly actorUserId: string;
}): Promise<ProjectSkillRecord | null> => {
  await ensureProjectSkillShareSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE project_skills SET state = 'revoked', revoked_at = NOW(),
        revoked_by_user_id = ${input.actorUserId}, updated_at = NOW()
      WHERE id = ${input.skillRowId}
      RETURNING *
    `,
  );
  return rows.length === 0 ? null : mapProjectSkillRow(rows[0]);
};
