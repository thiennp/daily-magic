/** Stored wake result for a message kind the server never wakes on (DF-022). */
export const GROK_WAKE_RESULT_SKIPPED_BY_POLICY = "skipped_by_policy";

export const STORED_GROK_WAKE_RESULT =
  /^(?:http_\d{3}|fetch_failed|not_postable|skipped_by_policy)$/;
