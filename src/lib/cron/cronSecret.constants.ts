/** Header the scheduler sends with the shared cron secret. */
export const CRON_SECRET_HEADER = "x-awc-cron-secret";
/** Env var holding the cron secret. Unset or empty = every cron call is refused. */
export const CRON_SECRET_ENV = "AWC_CRON_SECRET";
