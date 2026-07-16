export const SCHEMA_SQL_SNAPSHOT_CUTOFF_MIGRATION =
  "018-onboarding-setup-acknowledged.sql";

export function sortMigrationFilenames(
  filenames: readonly string[],
): readonly string[] {
  return [...filenames]
    .filter((filename) => filename.endsWith(".sql"))
    .sort((left, right) => left.localeCompare(right));
}

export function listPendingMigrationFilenames(
  allFilenames: readonly string[],
  appliedFilenames: ReadonlySet<string>,
): readonly string[] {
  return sortMigrationFilenames(allFilenames).filter(
    (filename) => !appliedFilenames.has(filename),
  );
}

export function listLegacySchemaSqlMigrationFilenames(
  allFilenames: readonly string[],
  appliedFilenames: ReadonlySet<string>,
  hasSchemaSqlSnapshot: boolean,
): readonly string[] {
  if (!hasSchemaSqlSnapshot) {
    return [];
  }

  const sorted = sortMigrationFilenames(allFilenames);
  const cutoffIndex = sorted.indexOf(SCHEMA_SQL_SNAPSHOT_CUTOFF_MIGRATION);

  if (cutoffIndex === -1) {
    return [];
  }

  return sorted
    .slice(0, cutoffIndex + 1)
    .filter((filename) => !appliedFilenames.has(filename));
}
