/** Locked caps (Lead + History): text body per version and kept versions per skill. */
export const PROJECT_SKILL_MAX_BODY_BYTES = 64 * 1024;
export const PROJECT_SKILL_MAX_VERSIONS = 20;

export const PROJECT_SKILL_NAME_MAX_LENGTH = 120;
export const PROJECT_SKILL_DESCRIPTION_MAX_LENGTH = 500;

/** Lowercase slug, never `_`-prefixed (History reserves `_` dirs such as `_drafts`). */
export const PROJECT_SKILL_ID_PATTERN = /^[a-z0-9][a-z0-9_-]{0,63}$/;

/** `sha256:` + lowercase hex of the exact UTF-8 body bytes (no trim, no CRLF fix). */
export const PROJECT_SKILL_CONTENT_HASH_PREFIX = "sha256:";

/** AWL mirror layout: `<profileDir>/project-data/<projectId>/skills/<skillId>/`. */
export const PROJECT_SKILL_AWL_PROJECT_DATA_DIR = "project-data";
export const PROJECT_SKILL_AWL_SKILLS_DIR = "skills";
export const PROJECT_SKILL_AWL_VERSION_PAD = 4;
export const PROJECT_SKILL_AWL_META_FILE = "meta.json";

export const PROJECT_SKILL_STATES = ["draft", "published", "revoked"] as const;
