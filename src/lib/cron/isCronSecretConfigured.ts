import { CRON_SECRET_ENV } from "@/lib/cron/cronSecret.constants";

/** True when the optional cron secret env var holds a non-empty value. */
export const isCronSecretConfigured = (
  env: Readonly<Record<string, string | undefined>>,
): boolean => (env[CRON_SECRET_ENV]?.trim() ?? "").length > 0;
