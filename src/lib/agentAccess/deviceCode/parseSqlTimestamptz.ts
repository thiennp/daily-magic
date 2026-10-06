/** Normalize a SQL timestamptz cell to ISO string, or empty when missing. */
export const parseSqlTimestamptz = (value: unknown): string => {
  if (typeof value === "string") {
    return value;
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  return "";
};

/** Normalize a SQL timestamptz cell to epoch ms, or null when missing. */
export const parseSqlTimestamptzMs = (value: unknown): number | null => {
  const iso = parseSqlTimestamptz(value);
  if (iso.length === 0) {
    return null;
  }
  return Date.parse(iso);
};
