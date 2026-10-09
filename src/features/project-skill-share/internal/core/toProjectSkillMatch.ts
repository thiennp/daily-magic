import type {
  ProjectSkillMatch,
  ProjectSkillRecord,
} from "@/features/project-skill-share/internal/core/projectSkill.type";
import {
  PROJECT_SKILL_MATCH_DESCRIPTION_CHARS,
  PROJECT_SKILL_MATCH_TAGS,
} from "@/features/project-skill-share/internal/core/projectSkillShare.constant";

export const toProjectSkillMatch = (
  record: Pick<ProjectSkillRecord, "skillId" | "name" | "description" | "tags">,
): ProjectSkillMatch => ({
  skillId: record.skillId,
  name: record.name,
  description: (record.description ?? "").slice(
    0,
    PROJECT_SKILL_MATCH_DESCRIPTION_CHARS,
  ),
  tags: record.tags.slice(0, PROJECT_SKILL_MATCH_TAGS),
});
