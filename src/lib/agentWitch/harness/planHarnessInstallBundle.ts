import sanitizeHarnessSlug from "./sanitizeHarnessSlug";
import {
  buildHarnessManifestItem,
  createEmptyHarnessManifest,
  ensureHarnessManifestSetEntry,
  upsertHarnessManifestItem,
} from "./planHarnessInstallBundle.helpers";
import type HarnessInstallBundle from "./types/HarnessInstallBundle.type";
import type HarnessManifest from "./types/HarnessManifest.type";
import type HarnessManifestSet from "./types/HarnessManifestSet.type";

export interface HarnessInstallFileWrite {
  readonly relativePath: string;
  readonly content: string;
}

export interface HarnessInstallPlan {
  readonly manifest: HarnessManifest;
  readonly directories: readonly string[];
  readonly files: readonly HarnessInstallFileWrite[];
}

const HARNESS_SET_SUBDIRS = [
  "rules",
  "skills",
  "commands",
  "instructions",
  "agents",
] as const;

export const planHarnessInstallBundle = (input: {
  readonly bundle: HarnessInstallBundle;
  readonly hostname: string;
  readonly existingManifest: HarnessManifest | null;
}): HarnessInstallPlan => {
  const updatedAt = new Date().toISOString();
  const manifest =
    input.existingManifest ??
    createEmptyHarnessManifest(input.hostname, updatedAt);
  const slug = sanitizeHarnessSlug(input.bundle.slug);
  const setEntry = ensureHarnessManifestSetEntry(
    manifest,
    { ...input.bundle, slug },
    updatedAt,
  );
  const directories = [
    `sets/${slug}`,
    ...HARNESS_SET_SUBDIRS.map((subdir) => `sets/${slug}/${subdir}`),
    "shared/items",
  ];
  const { files, nextItems } = input.bundle.items.reduce<{
    readonly files: readonly HarnessInstallFileWrite[];
    readonly nextItems: HarnessManifestSet["items"];
  }>(
    (accumulator, item) => {
      const manifestItem = buildHarnessManifestItem(item);
      return {
        files: [
          ...accumulator.files,
          {
            relativePath: manifestItem.path,
            content: item.content,
          },
        ],
        nextItems: upsertHarnessManifestItem(
          accumulator.nextItems,
          manifestItem,
        ),
      };
    },
    { files: [], nextItems: setEntry.items },
  );
  const activeSetSlugs = manifest.activeSetSlugs.includes(slug)
    ? manifest.activeSetSlugs
    : [...manifest.activeSetSlugs, slug];

  return {
    manifest: {
      version: 1,
      hostname: input.hostname,
      updatedAt,
      activeSetSlugs,
      sets: {
        ...manifest.sets,
        [slug]: {
          ...setEntry,
          items: nextItems,
        },
      },
    },
    directories,
    files,
  };
};
