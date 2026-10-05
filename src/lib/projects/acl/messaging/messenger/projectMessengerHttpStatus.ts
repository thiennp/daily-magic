const STATUS_BY_CODE: Readonly<Record<string, number>> = {
  not_found: 404,
  thread_not_found: 404,
  forbidden: 403,
  viewer_read_only: 403,
  missing_scope: 403,
  naming_required: 409,
  no_bots: 409,
  rate_limited: 429,
};

/** Messenger failure code → HTTP status. Viewer sends are 403; unknown codes 400. */
export const projectMessengerHttpStatus = (code: string): number =>
  STATUS_BY_CODE[code] ?? 400;
