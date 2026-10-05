/** Live-server History tick interval (separate from automations). */
export const PROJECT_COMPUTER_HISTORY_TICK_INTERVAL_MS = 60_000;

/** Episode close: fire after this many new durable messages. */
export const PROJECT_HISTORY_SKILL_EPISODE_MESSAGE_COUNT = 20;
/** Episode close: fire after this idle window since the newest message. */
export const PROJECT_HISTORY_SKILL_IDLE_MS = 30 * 60 * 1000;
/** Episode close: fire at least this often while History is ON. */
export const PROJECT_HISTORY_SKILL_MAX_INTERVAL_MS = 24 * 60 * 60 * 1000;

/** Owner-LLM token budget per mining run. */
export const PROJECT_HISTORY_SKILL_RUN_TOKEN_CAP = 30_000;
/** Owner-LLM token budget per UTC day. */
export const PROJECT_HISTORY_SKILL_DAY_TOKEN_CAP = 100_000;

/** Open drafts per project before mining pauses. */
export const PROJECT_HISTORY_SKILL_MAX_OPEN_DRAFTS = 20;
/** Qualify: episodes shorter than this (unless owner-marked) are filtered. */
export const PROJECT_HISTORY_SKILL_QUALIFY_MIN_MESSAGES = 3;
/** Validate: minimum Steps section items. */
export const PROJECT_HISTORY_SKILL_DRAFT_MIN_STEPS = 2;
/** Validate: max SKILL.md UTF-8 bytes (matches Share body cap). */
export const PROJECT_HISTORY_SKILL_DRAFT_MAX_BODY_BYTES = 64 * 1024;
/** Validate may send the episode back to EXTRACT once. */
export const PROJECT_HISTORY_SKILL_VALIDATE_RETRY_MAX = 1;
/** Owner LLM input transcript soft cap (tokens); above this, reflect then write. */
export const PROJECT_HISTORY_SKILL_OWNER_LLM_INPUT_TOKEN_CAP = 12_000;
/** Near-duplicate: Jaccard on step lines at or above this updates the draft. */
export const PROJECT_HISTORY_SKILL_NEAR_DUP_STEP_JACCARD = 0.6;
