import {
  PROJECT_SKILL_AWL_PROJECT_DATA_DIR,
  PROJECT_SKILL_AWL_SKILLS_DIR,
} from "@/features/project-skill-share/internal/core/projectSkillShare.constant";

/** Relative to `<profileDir>`: `project-data/<projectId>/skills/<skillId>`. */
export const buildProjectSkillAwlRelativeDir = (input: {
  readonly projectId: string;
  readonly skillId: string;
}): string =>
  [
    PROJECT_SKILL_AWL_PROJECT_DATA_DIR,
    input.projectId,
    PROJECT_SKILL_AWL_SKILLS_DIR,
    input.skillId,
  ].join("/");
