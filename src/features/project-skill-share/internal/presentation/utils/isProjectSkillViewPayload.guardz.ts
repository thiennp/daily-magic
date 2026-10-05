import {
  isBoolean,
  isNonEmptyString,
  isNullOr,
  isNumber,
  isOneOf,
  isString,
  isType,
} from "guardz";

import type { ProjectSkillView } from "@/features/project-skill-share/internal/core/projectSkill.type";

export const isProjectSkillViewPayload = isType<ProjectSkillView>({
  skillId: isNonEmptyString,
  name: isString,
  description: isNullOr(isString),
  state: isOneOf("draft", "published", "revoked"),
  publishedVersion: isNullOr(isNumber),
  latestVersion: isNumber,
  contentHash: isNullOr(isString),
  updatedAt: isString,
  isPublisher: isBoolean,
  canRevoke: isBoolean,
});
