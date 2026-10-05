/** Header the scheduler sends with the shared cron secret. */
export const CRON_SECRET_HEADER = "x-awc-cron-secret";
/** Optional env var holding the cron secret. Unset or empty = the cron route is disabled (503). */
export const CRON_SECRET_ENV = "AWC_CRON_SECRET";
