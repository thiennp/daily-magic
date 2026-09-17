import type {
  HarnessInstallBundle,
  HarnessInstallBundleItem,
  HarnessInstallItemKind,
} from "./harnessInstallBundle.types";

const sanitizeHarnessSlug = (value: string): string => {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized.length > 0 ? normalized : "harness-set";
};

const toFileStem = (title: string): string => {
  const stem = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return stem.length > 0 ? stem : "item";
};

const resolveHarnessItemPath = (
  kind: HarnessInstallItemKind,
  title: string,
): string => {
  const stem = toFileStem(title);
  const slug = sanitizeHarnessSlug(title);

  if (kind === "rule") {
    return `rules/${stem}.mdc`;
  }

  if (kind === "skill") {
    return `skills/${slug}/SKILL.md`;
  }

  if (kind === "command") {
    return `commands/${stem}.md`;
  }

  if (kind === "agent") {
    return `agents/${stem}.md`;
  }

  return `instructions/${stem}.md`;
};

const resolveHarnessSharedItemPath = (
  itemId: string,
  kind: HarnessInstallItemKind,
  title: string,
): string => {
  const itemPath = resolveHarnessItemPath(kind, title);
  return `shared/items/${itemId}/${itemPath}`;
};

export interface HarnessInstallFileWrite {
  readonly relativePath: string;
  readonly content: string;
}

interface HarnessManifestItem {
  readonly id: string;
  readonly kind: HarnessInstallItemKind;
  readonly title: string;
  readonly path: string;
}

interface HarnessManifestSet {
  readonly slug: string;
  readonly name: string;
  readonly version: number;
  readonly updatedAt: string;
  readonly items: readonly HarnessManifestItem[];
}

interface HarnessManifest {
  readonly version: 1;
  readonly hostname: string;
  readonly updatedAt: string;
  readonly activeSetSlugs: readonly string[];
  readonly sets: Readonly<Record<string, HarnessManifestSet>>;
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

const createEmptyManifest = (
  hostname: string,
  updatedAt: string,
): HarnessManifest => ({
  version: 1,
  hostname,
  updatedAt,
  activeSetSlugs: [],
  sets: {},
});

const upsertManifestItem = (
  items: readonly HarnessManifestItem[],
  nextItem: HarnessManifestItem,
): readonly HarnessManifestItem[] => {
  const withoutExisting = items.filter((item) => item.id !== nextItem.id);
  return [...withoutExisting, nextItem];
};

const ensureSetEntry = (
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

const buildManifestItem = (
  item: HarnessInstallBundleItem,
): HarnessManifestItem => ({
  id: item.id,
  kind: item.kind,
  title: item.title,
  path: resolveHarnessSharedItemPath(item.id, item.kind, item.title),
});

export const planHarnessInstallBundle = (input: {
  readonly bundle: HarnessInstallBundle;
  readonly hostname: string;
  readonly existingManifest: HarnessManifest | null;
}): HarnessInstallPlan => {
  const updatedAt = new Date().toISOString();
  const manifest =
    input.existingManifest ?? createEmptyManifest(input.hostname, updatedAt);
  const slug = sanitizeHarnessSlug(input.bundle.slug);
  const setEntry = ensureSetEntry(
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
    readonly nextItems: readonly HarnessManifestItem[];
  }>(
    (accumulator, item) => {
      const manifestItem = buildManifestItem(item);
      return {
        files: [
          ...accumulator.files,
          {
            relativePath: manifestItem.path,
            content: item.content,
          },
        ],
        nextItems: upsertManifestItem(accumulator.nextItems, manifestItem),
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
