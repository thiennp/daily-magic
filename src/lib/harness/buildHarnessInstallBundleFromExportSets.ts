import type { BorrowedHarnessExportSet } from "@/lib/harness/types/HarnessExportResult.type";
import type HarnessInstallBundle from "@/lib/agentWitch/harness/types/HarnessInstallBundle.type";
import type HarnessItemWriteSpec from "@/lib/agentWitch/harness/types/HarnessItemWriteSpec.type";

const mergeExportSetItems = (
  sets: readonly BorrowedHarnessExportSet[],
): readonly HarnessItemWriteSpec[] => {
  const merged = new Map<string, HarnessItemWriteSpec>();

  for (const set of sets) {
    for (const item of set.items) {
      const existing = merged.get(item.id);
      const nextSetSlugs = existing
        ? [...new Set([...existing.setSlugs, set.slug])]
        : [set.slug];

      merged.set(item.id, {
        id: item.id,
        kind: item.kind,
        title: item.title,
        content: item.content,
        setSlugs: nextSetSlugs,
      });
    }
  }

  return [...merged.values()];
};

const buildHarnessInstallBundleFromExportSets = (
  sets: readonly BorrowedHarnessExportSet[],
): HarnessInstallBundle | null => {
  const primary = sets[0];

  if (primary === undefined) {
    return null;
  }

  const items = mergeExportSetItems(sets);

  if (items.length === 0) {
    return null;
  }

  return {
    name: primary.name,
    slug: primary.slug,
    items,
  };
};

export default buildHarnessInstallBundleFromExportSets;
