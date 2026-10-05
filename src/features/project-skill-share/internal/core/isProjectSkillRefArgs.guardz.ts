import { isNonEmptyString, isNumber, isType, isUndefinedOr } from "guardz";

import type { ProjectSkillRefArgs } from "@/features/project-skill-share/internal/core/projectSkillArgs.type";

export const isProjectSkillRefArgs = isType<ProjectSkillRefArgs>({
  projectId: isNonEmptyString,
  skillId: isNonEmptyString,
  version: isUndefinedOr(isNumber),
});
