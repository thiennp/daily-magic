import fs from "node:fs";
import path from "node:path";

const CONFIG_DIR = path.join(process.env.HOME ?? "", ".agent-witch");
const HARNESS_ROOT_DIR = path.join(CONFIG_DIR, "harness");
const HARNESS_MANIFEST_PATH = path.join(HARNESS_ROOT_DIR, "manifest.json");
const HARNESS_SETS_DIR = path.join(HARNESS_ROOT_DIR, "sets");

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readHarnessManifest = (): Record<string, unknown> | null => {
  if (!fs.existsSync(HARNESS_MANIFEST_PATH)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(HARNESS_MANIFEST_PATH, "utf8"),
    );
    if (isRecord(parsed)) {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
};

export interface HarnessExportSetSpec {
  readonly name: string;
  readonly slug: string;
  readonly items: readonly {
    readonly id: string;
    readonly kind: string;
    readonly title: string;
    readonly content: string;
  }[];
}

export const readHarnessExportSets = (
  setSlugs: readonly string[],
): readonly HarnessExportSetSpec[] => {
  const manifest = readHarnessManifest();
  if (manifest === null) {
    return [];
  }

  const sets = isRecord(manifest.sets) ? manifest.sets : {};
  const exported: HarnessExportSetSpec[] = [];

  for (const slug of setSlugs) {
    const setEntry = sets[slug];
    if (!isRecord(setEntry) || typeof setEntry.name !== "string") {
      continue;
    }

    const items = Array.isArray(setEntry.items) ? setEntry.items : [];
    const exportedItems: HarnessExportSetSpec["items"][number][] = [];

    for (const item of items) {
      if (!isRecord(item)) {
        continue;
      }

      const relativePath =
        typeof item.path === "string" ? item.path : undefined;
      const id = typeof item.id === "string" ? item.id : "";
      const kind = typeof item.kind === "string" ? item.kind : "";
      const title = typeof item.title === "string" ? item.title : "";

      if (
        relativePath === undefined ||
        id.length === 0 ||
        kind.length === 0 ||
        title.length === 0
      ) {
        continue;
      }

      const absolutePath = path.join(HARNESS_SETS_DIR, slug, relativePath);
      if (!fs.existsSync(absolutePath)) {
        continue;
      }

      exportedItems.push({
        id,
        kind,
        title,
        content: fs.readFileSync(absolutePath, "utf8"),
      });
    }

    if (exportedItems.length > 0) {
      exported.push({
        name: setEntry.name,
        slug,
        items: exportedItems,
      });
    }
  }

  return exported;
};
