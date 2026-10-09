import type {
  ProjectSkillKind,
  ProjectSkillRecord,
  ProjectSkillState,
} from "@/features/project-skill-share/internal/core/projectSkill.type";

const parseState = (value: unknown): ProjectSkillState => {
  if (value === "published" || value === "revoked") return value;
  return "draft";
};

const parseKind = (value: unknown): ProjectSkillKind =>
  value === "playbook" ? "playbook" : "skill";

const nullableString = (value: unknown): string | null =>
  value === null || value === undefined ? null : String(value);

const nullableInt = (value: unknown): number | null =>
  value === null || value === undefined ? null : Number(value);

export const mapProjectSkillRow = (
  row: Record<string, unknown>,
): ProjectSkillRecord => ({
  rowId: String(row.id),
  projectId: String(row.project_id),
  skillId: String(row.skill_id),
  kind: parseKind(row.kind),
  name: String(row.name),
  description: nullableString(row.description),
  publisherUserId: String(row.publisher_user_id),
  state: parseState(row.state),
  publishedVersion: nullableInt(row.published_version),
  latestVersion: Number(row.latest_version ?? 0),
  contentHash: nullableString(row.content_hash),
  createdAt: String(row.created_at),
  updatedAt: String(row.updated_at),
  revokedAt: nullableString(row.revoked_at),
  tags: Array.isArray(row.tags) ? row.tags.map(String) : [],
  latestAuthorUserId: nullableString(row.latest_author_user_id),
  latestAuthorName: nullableString(row.latest_author_name),
});
