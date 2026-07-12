import type HarnessManifest from "./types/HarnessManifest.type";

export interface HarnessManifestSetSummary {
  readonly slug: string;
  readonly name: string;
}

const listHarnessManifestSets = (
  manifest: HarnessManifest | null,
): readonly HarnessManifestSetSummary[] => {
  if (manifest === null) {
    return [];
  }

  return Object.values(manifest.sets).map((set) => ({
    slug: set.slug,
    name: set.name,
  }));
};

export default listHarnessManifestSets;
