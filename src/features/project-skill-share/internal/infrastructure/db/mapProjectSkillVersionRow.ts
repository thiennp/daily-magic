import type { ProjectSkillVersionRecord } from "@/features/project-skill-share/internal/core/projectSkill.type";

export const mapProjectSkillVersionRow = (
  row: Record<string, unknown>,
): ProjectSkillVersionRecord => ({
  skillRowId: String(row.skill_row_id),
  version: Number(row.version),
  body: String(row.body),
  contentHash: String(row.content_hash),
  byteSize: Number(row.byte_size),
  isDraft: row.is_draft === true,
  createdByUserId: String(row.created_by_user_id),
  createdAt: String(row.created_at),
});
