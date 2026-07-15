import type HarnessItemWriteSpec from "./types/HarnessItemWriteSpec.type";
import type HarnessManifestItem from "./types/HarnessManifestItem.type";
import type HarnessManifestSet from "./types/HarnessManifestSet.type";
import type HarnessManifest from "./types/HarnessManifest.type";
import type HarnessInstallBundle from "./types/HarnessInstallBundle.type";

import resolveHarnessSharedItemPath from "./resolveHarnessSharedItemPath";

export const upsertHarnessManifestItem = (
  items: readonly HarnessManifestItem[],
  nextItem: HarnessManifestItem,
): readonly HarnessManifestItem[] => {
  const withoutExisting = items.filter((item) => item.id !== nextItem.id);
  return [...withoutExisting, nextItem];
};

export const ensureHarnessManifestSetEntry = (
  manifest: HarnessManifest,
  bundle: HarnessInstallBundle,
  updatedAt: string,
): HarnessManifestSet => {
  const existing = manifest.sets[bundle.slug];
  if (existing !== undefined) {
    return {
      ...existing,
      name: bundle.name,
      version: existing.version + 1,
      updatedAt,
    };
  }

  return {
    slug: bundle.slug,
    name: bundle.name,
    version: 1,
    updatedAt,
    items: [],
  };
};

export const buildHarnessManifestItem = (
  item: HarnessItemWriteSpec,
): HarnessManifestItem => ({
  id: item.id,
  kind: item.kind,
  title: item.title,
  path: resolveHarnessSharedItemPath(item.id, item.kind, item.title),
});

export const createEmptyHarnessManifest = (
  hostname: string,
  updatedAt: string,
): HarnessManifest => ({
  version: 1,
  hostname,
  updatedAt,
  activeSetSlugs: [],
  sets: {},
});
