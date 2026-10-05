/**
 * Versions to drop so at most `keep` remain: oldest first, never the live
 * published version.
 */
export const selectProjectSkillVersionsToPrune = (input: {
  readonly versions: readonly number[];
  readonly keep: number;
  readonly protectedVersion: number | null;
}): readonly number[] => {
  const excess = input.versions.length - input.keep;
  if (excess <= 0) {
    return [];
  }
  return [...input.versions]
    .sort((a, b) => a - b)
    .filter((version) => version !== input.protectedVersion)
    .slice(0, excess);
};
