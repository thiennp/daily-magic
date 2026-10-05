import type { ProjectSkillRecord } from "@/features/project-skill-share/internal/core/projectSkill.type";
import type { ProjectSkillPublishTransition } from "@/features/project-skill-share/internal/core/decideProjectSkillPublishTransition";
import { ensureProjectSkillShareSchema } from "@/features/project-skill-share/internal/infrastructure/db/ensureProjectSkillShareSchema";
import { mapProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/mapProjectSkillRow";
import { asRowArray, getSql } from "@/lib/db";

/**
 * One statement (atomic): upsert the skill row + insert the new version.
 * Optimistic lock on latest_version; null = concurrent publish won.
 */
export const insertProjectSkillVersionWithSkill = async (input: {
  readonly projectId: string;
  readonly skillId: string;
  readonly name: string;
  readonly description: string | null;
  readonly actorUserId: string;
  readonly expectedLatestVersion: number;
  readonly version: number;
  readonly body: string;
  readonly contentHash: string;
  readonly byteSize: number;
  readonly asDraft: boolean;
  readonly transition: ProjectSkillPublishTransition;
}): Promise<ProjectSkillRecord | null> => {
  await ensureProjectSkillShareSchema();
  const sql = getSql();
  const t = input.transition;
  const rows = asRowArray(
    await sql`
      WITH skill AS (
        INSERT INTO project_skills (project_id, skill_id, name, description,
          publisher_user_id, state, published_version, latest_version, content_hash)
        VALUES (${input.projectId}, ${input.skillId}, ${input.name}, ${input.description},
          ${input.actorUserId}, ${t.state}, ${t.publishedVersion}, ${input.version}, ${t.contentHash})
        ON CONFLICT (project_id, skill_id) DO UPDATE SET
          name = EXCLUDED.name, description = EXCLUDED.description,
          state = EXCLUDED.state, published_version = EXCLUDED.published_version,
          latest_version = EXCLUDED.latest_version, content_hash = EXCLUDED.content_hash,
          revoked_at = NULL, revoked_by_user_id = NULL, updated_at = NOW()
        WHERE project_skills.latest_version = ${input.expectedLatestVersion}
        RETURNING *
      ), ver AS (
        INSERT INTO project_skill_versions (skill_row_id, version, body,
          content_hash, byte_size, is_draft, created_by_user_id)
        SELECT skill.id, ${input.version}, ${input.body}, ${input.contentHash},
          ${input.byteSize}, ${input.asDraft}, ${input.actorUserId}
        FROM skill
        RETURNING version
      )
      SELECT skill.* FROM skill, ver
    `,
  );
  return rows.length === 0 ? null : mapProjectSkillRow(rows[0]);
};
