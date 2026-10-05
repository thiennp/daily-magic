import { isNonEmptyString, isType } from "guardz";

import type { ListProjectSkillsArgs } from "@/features/project-skill-share/internal/core/projectSkillArgs.type";

export const isListProjectSkillsArgs = isType<ListProjectSkillsArgs>({
  projectId: isNonEmptyString,
});
