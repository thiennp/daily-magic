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
