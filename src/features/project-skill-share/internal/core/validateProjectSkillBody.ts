import type { ProjectSkillShareErrorCode } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { measureProjectSkillBodyBytes } from "@/features/project-skill-share/internal/core/measureProjectSkillBodyBytes";
import { PROJECT_SKILL_MAX_BODY_BYTES } from "@/features/project-skill-share/internal/core/projectSkillShare.constant";

/** null = valid. Body is stored verbatim (no trim) so the content hash stays exact. */
export const validateProjectSkillBody = (
  body: string,
): ProjectSkillShareErrorCode | null => {
  if (body.trim().length === 0) {
    return "body_required";
  }
  if (measureProjectSkillBodyBytes(body) > PROJECT_SKILL_MAX_BODY_BYTES) {
    return "body_too_large";
  }
  return null;
};
