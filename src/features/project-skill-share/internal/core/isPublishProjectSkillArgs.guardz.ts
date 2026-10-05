import {
  isBoolean,
  isNonEmptyString,
  isString,
  isType,
  isUndefinedOr,
} from "guardz";

import type { PublishProjectSkillArgs } from "@/features/project-skill-share/internal/core/projectSkillArgs.type";

export const isPublishProjectSkillArgs = isType<PublishProjectSkillArgs>({
  projectId: isNonEmptyString,
  skillId: isUndefinedOr(isNonEmptyString),
  name: isUndefinedOr(isNonEmptyString),
  description: isUndefinedOr(isString),
  body: isUndefinedOr(isString),
  asDraft: isUndefinedOr(isBoolean),
});
