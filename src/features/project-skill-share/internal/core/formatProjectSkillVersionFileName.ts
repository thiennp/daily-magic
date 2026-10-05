import { PROJECT_SKILL_AWL_VERSION_PAD } from "@/features/project-skill-share/internal/core/projectSkillShare.constant";

/** AWL mirror file name: `v0001.md` (4-digit zero pad). */
export const formatProjectSkillVersionFileName = (version: number): string =>
  `v${String(version).padStart(PROJECT_SKILL_AWL_VERSION_PAD, "0")}.md`;
