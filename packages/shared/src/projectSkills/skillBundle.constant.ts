export const SKILL_SCRIPT_MAX_BYTES = 64 * 1024;
export const SKILL_SCRIPT_MAX_COUNT = 10;
export const SKILL_BUNDLE_MAX_TOTAL_BYTES = 256 * 1024;
export const SKILL_SCRIPT_DEFAULT_TIMEOUT_SEC = 60;
export const SKILL_SCRIPT_MAX_TIMEOUT_SEC = 300;
export const SKILL_SCRIPT_MAX_PARAMS = 8;
export const SKILL_SCRIPT_PARAM_VALUE_MAX = 500;

export const SKILL_SCRIPT_NAME_PATTERN = /^[a-z0-9][a-z0-9_-]{0,47}$/;
export const SKILL_SCRIPT_FILE_PATTERN =
  /^[A-Za-z0-9][A-Za-z0-9_-]{0,47}\.(sh|mjs|cjs|js)$/;
export const SKILL_SCRIPT_PARAM_PATTERN = /^[a-z][a-z0-9_]{0,31}$/;

export const SKILL_BUNDLE_START = "<!-- agent-witch-skill-bundle:v1\n";
export const SKILL_BUNDLE_END = "\n-->";
