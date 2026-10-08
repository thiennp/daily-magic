import { readSkillBundleFromBody } from "@agent-witch/shared/projectSkills";

import type { ProjectSkillShareErrorCode } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { measureProjectSkillBodyBytes } from "@/features/project-skill-share/internal/core/measureProjectSkillBodyBytes";
import { PROJECT_SKILL_MAX_BODY_BYTES } from "@/features/project-skill-share/internal/core/projectSkillShare.constant";

const BUNDLE_MARKER = "agent-witch-skill-bundle:v1";

/**
 * null = valid. Body is stored verbatim (no trim) so the content hash stays exact.
 * The 64 KB cap applies to the SKILL.md text; an embedded script bundle has its
 * own caps (per script, count, total) enforced by the shared validator, and any
 * invalid bundle (binary, secret, hash mismatch, over cap) is rejected.
 */
export const validateProjectSkillBody = (
  body: string,
): ProjectSkillShareErrorCode | null => {
  if (body.trim().length === 0) {
    return "body_required";
  }
  if (!body.includes(BUNDLE_MARKER)) {
    return measureProjectSkillBodyBytes(body) > PROJECT_SKILL_MAX_BODY_BYTES
      ? "body_too_large"
      : null;
  }
  const { markdown, bundle, error } = readSkillBundleFromBody(body);
  if (measureProjectSkillBodyBytes(markdown) > PROJECT_SKILL_MAX_BODY_BYTES) {
    return "body_too_large";
  }
  return error !== null || bundle === null ? "bundle_invalid" : null;
};
