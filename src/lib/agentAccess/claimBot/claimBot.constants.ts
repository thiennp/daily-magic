/** Human-enterable claim code lifetime. */
export const CLAIM_BOT_CODE_TTL_MS = 10 * 60 * 1000;

/** Raw entropy for claim codes (base64url length ≈ 22). */
export const CLAIM_BOT_CODE_BYTES = 16;

export const CLAIM_BOT_CODE_PREFIX = "awc_claim_";

/** Failed code entries in the window before lock. */
export const CLAIM_BOT_ENTRY_FAIL_LIMIT = 5;

/** Window for counting failures and lock duration. */
export const CLAIM_BOT_ENTRY_WINDOW_MS = 15 * 60 * 1000;
