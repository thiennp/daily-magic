/** Trimmed non-empty string, else null. */
export const readOptionalHistoryString = (value: unknown): string | null => {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

/** First matching key with a non-empty string value. */
export const readOptionalHistoryStringKeys = (
  record: Readonly<Record<string, unknown>>,
  keys: readonly string[],
): string | null => {
  for (const key of keys) {
    const found = readOptionalHistoryString(record[key]);
    if (found !== null) {
      return found;
    }
  }
  return null;
};
