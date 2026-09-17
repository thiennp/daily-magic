export type HarnessCatalogSetSummary = {
  readonly slug: string;
  readonly name: string;
  readonly version: number;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const extractHarnessSetsFromCatalogManifest = (
  manifestJson: unknown,
): readonly HarnessCatalogSetSummary[] => {
  if (!isRecord(manifestJson) || !isRecord(manifestJson.sets)) {
    return [];
  }

  return Object.entries(manifestJson.sets).flatMap(([slug, entry]) => {
    if (!isRecord(entry)) {
      return [];
    }

    const name =
      typeof entry.name === "string" && entry.name.trim().length > 0
        ? entry.name.trim()
        : slug;
    const version =
      typeof entry.version === "number" && Number.isFinite(entry.version)
        ? entry.version
        : 1;

    return [{ slug, name, version }];
  });
};

export default extractHarnessSetsFromCatalogManifest;
