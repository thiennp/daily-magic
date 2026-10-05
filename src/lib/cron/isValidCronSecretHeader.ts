import { createHash, timingSafeEqual } from "node:crypto";

import {
  CRON_SECRET_ENV,
  CRON_SECRET_HEADER,
} from "@/lib/cron/cronSecret.constants";

const digest = (value: string): Buffer =>
  createHash("sha256").update(value, "utf8").digest();

/**
 * Constant-time check of the cron secret header against the env secret.
 * Both sides are hashed first so lengths always match. Missing or empty
 * secret on either side is refused.
 */
export const isValidCronSecretHeader = (
  headers: Headers,
  env: Readonly<Record<string, string | undefined>>,
): boolean => {
  const expected = env[CRON_SECRET_ENV]?.trim() ?? "";
  const provided = headers.get(CRON_SECRET_HEADER)?.trim() ?? "";
  if (expected.length === 0 || provided.length === 0) {
    return false;
  }
  return timingSafeEqual(digest(provided), digest(expected));
};
