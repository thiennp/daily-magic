/** Trimmed non-empty string within max length, else null. */
export const readBoundedText = (value: unknown, max: number): string | null => {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= max ? trimmed : null;
};

/** Optional list of lowercase unique strings; undefined → []. */
export const readBoundedList = (
  value: unknown,
  maxItems: number,
  maxLength: number,
): readonly string[] | null => {
  if (value === undefined || value === null) {
    return [];
  }
  if (!Array.isArray(value) || value.length > maxItems) {
    return null;
  }
  const items = value.map((item: unknown) =>
    typeof item === "string" ? item.trim().toLowerCase() : "",
  );
  return items.every((item) => item.length > 0 && item.length <= maxLength)
    ? [...new Set(items)]
    : null;
};

/** Value must be one of the allowed literals; undefined → fallback. */
export const readEnumValue = <T extends string>(
  value: unknown,
  allowed: readonly T[],
  fallback: T,
): T | null => {
  if (value === undefined || value === null) {
    return fallback;
  }
  return allowed.find((option) => option === value) ?? null;
};
