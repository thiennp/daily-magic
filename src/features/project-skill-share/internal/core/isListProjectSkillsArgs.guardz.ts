import { isNonEmptyString, isOneOf, isType, isUndefinedOr } from "guardz";

import type { ListProjectSkillsArgs } from "@/features/project-skill-share/internal/core/projectSkillArgs.type";

export const isListProjectSkillsArgs = isType<ListProjectSkillsArgs>({
  projectId: isNonEmptyString,
  kind: isUndefinedOr(isOneOf("skill", "playbook")),
});
