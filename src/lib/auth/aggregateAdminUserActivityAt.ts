/** Greatest ISO timestamp among candidates; null if none. Does not use createdAt. */
const aggregateAdminUserActivityAt = (
  timestamps: readonly (string | null | undefined)[],
): string | null => {
  const parsed = timestamps
    .filter((value): value is string => value != null && value !== "")
    .map((value) => ({ value, ms: Date.parse(value) }))
    .filter((entry) => !Number.isNaN(entry.ms));

  if (parsed.length === 0) {
    return null;
  }

  const latest = parsed.reduce((best, entry) =>
    entry.ms > best.ms ? entry : best,
  );

  return new Date(latest.ms).toISOString();
};

export default aggregateAdminUserActivityAt;
