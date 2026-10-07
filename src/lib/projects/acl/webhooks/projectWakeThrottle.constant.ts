/**
 * DF-026 wake throttle. A burst of rows to one recipient, sent before its bot
 * has read its inbox, gets one wake. The woken run lists every pending row.
 */
export const PROJECT_WAKE_COALESCE_WINDOW_SECONDS = 120;

/**
 * An earlier row with no stored wake yet counts as "wake in flight" only this
 * long. The Grok wake POST times out after 3s, so its result lands well before.
 */
export const PROJECT_WAKE_IN_FLIGHT_SECONDS = 15;

/** Cooldown after a wake endpoint returns 429 without a usable Retry-After. */
export const PROJECT_WAKE_DEFAULT_RETRY_AFTER_SECONDS = 60;

/** Upper bound on an honored Retry-After / retryAfterSeconds. */
export const PROJECT_WAKE_MAX_RETRY_AFTER_SECONDS = 3_600;

/** Wake result (not stored): an earlier wake to this recipient covers this row. */
export const PROJECT_WAKE_RESULT_COALESCED = "coalesced";

/** Wake result (not stored): the endpoint said 429 and Retry-After has not passed. */
export const PROJECT_WAKE_RESULT_DEFERRED_429 = "deferred_429";

/** Gate results: returned to callers, never stored as a wake attempt. */
export const PROJECT_WAKE_GATED_RESULTS: ReadonlySet<string> = new Set([
  PROJECT_WAKE_RESULT_COALESCED,
  PROJECT_WAKE_RESULT_DEFERRED_429,
]);

/** HMAC delivery last_error while the endpoint's Retry-After is active. */
export const PROJECT_WEBHOOK_ERROR_RATE_LIMITED = "rate_limited_retry_after";
