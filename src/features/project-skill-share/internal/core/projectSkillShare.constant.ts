/** Locked caps (Lead + History): text body per version and kept versions per skill. */
export const PROJECT_SKILL_MAX_BODY_BYTES = 64 * 1024;
export const PROJECT_SKILL_MAX_VERSIONS = 20;

export const PROJECT_SKILL_NAME_MAX_LENGTH = 120;
export const PROJECT_SKILL_DESCRIPTION_MAX_LENGTH = 500;

export {
  PROJECT_SKILL_CONTENT_HASH_PREFIX,
  PROJECT_SKILL_ID_PATTERN,
} from "@agent-witch/shared/projectSkills";

/** AWL mirror layout: `<profileDir>/project-data/<projectId>/skills/<skillId>/`. */
export const PROJECT_SKILL_AWL_PROJECT_DATA_DIR = "project-data";
export const PROJECT_SKILL_AWL_SKILLS_DIR = "skills";
export const PROJECT_SKILL_AWL_VERSION_PAD = 4;
export const PROJECT_SKILL_AWL_META_FILE = "meta.json";

export const PROJECT_SKILL_STATES = ["draft", "published", "revoked"] as const;

/** A playbook is a project skill with kind "playbook" (same lifecycle / ACL / caps). */
export const PROJECT_SKILL_KINDS = ["skill", "playbook"] as const;
export const PROJECT_SKILL_DEFAULT_KIND = "skill";

/** list_project_skills with `query` or `limit`: default and maximum rows returned. */
export const PROJECT_SKILL_LIST_DEFAULT_LIMIT = 3;
export const PROJECT_SKILL_LIST_MAX_LIMIT = 10;
export const PROJECT_SKILL_MATCH_DESCRIPTION_CHARS = 100;
export const PROJECT_SKILL_MATCH_TAGS = 5;
