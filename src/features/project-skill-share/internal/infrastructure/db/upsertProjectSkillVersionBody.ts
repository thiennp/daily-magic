import { ensureProjectSkillShareSchema } from "@/features/project-skill-share/internal/infrastructure/db/ensureProjectSkillShareSchema";
import { getSql } from "@/lib/db";

/** Rehome restore: write the exact expected bytes for a published version. */
export const upsertProjectSkillVersionBody = async (input: {
  readonly skillRowId: string;
  readonly version: number;
  readonly body: string;
  readonly contentHash: string;
  readonly byteSize: number;
  readonly actorUserId: string;
}): Promise<void> => {
  await ensureProjectSkillShareSchema();
  const sql = getSql();
  await sql`
    INSERT INTO project_skill_versions (skill_row_id, version, body,
      content_hash, byte_size, is_draft, created_by_user_id)
    VALUES (${input.skillRowId}, ${input.version}, ${input.body},
      ${input.contentHash}, ${input.byteSize}, FALSE, ${input.actorUserId})
    ON CONFLICT (skill_row_id, version) DO UPDATE SET
      body = EXCLUDED.body, content_hash = EXCLUDED.content_hash,
      byte_size = EXCLUDED.byte_size
  `;
};
