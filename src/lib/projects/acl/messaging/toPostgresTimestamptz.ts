/**
 * Neon/JS often yields Date; callers that String(date) produce
 * "Mon Oct 05 2026 10:38:04 GMT+0200 (...)" which Postgres rejects as
 * timestamptz (22023 time zone "gmt+0200" not recognized). Always ISO-8601.
 */
export const toPostgresTimestamptz = (value: unknown): string | null => {
  if (value === null || value === undefined) {
    return null;
  }
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value.toISOString();
  }
  if (typeof value !== "string") {
    return toPostgresTimestamptz(String(value));
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return null;
  }
  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    return trimmed;
  }
  return parsed.toISOString();
};
