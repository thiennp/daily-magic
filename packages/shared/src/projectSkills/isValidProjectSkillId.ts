import { PROJECT_SKILL_ID_PATTERN } from "./projectSkillId.constant";

/** Lowercase slug ≤ 64 chars; never `_`-prefixed (reserved by History). */
export const isValidProjectSkillId = (skillId: string): boolean =>
  PROJECT_SKILL_ID_PATTERN.test(skillId);
