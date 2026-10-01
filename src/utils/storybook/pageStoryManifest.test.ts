import { describe, expect, it } from "vitest";

import { AWL_STORYBOOK_PAGE_ENTRIES } from "@/utils/storybook/awl/awlStorybookPageCatalog";
import { AWL_STORYBOOK_PAGE_MANIFEST } from "@/utils/storybook/awl/awlStorybookPageManifest.constant";
import { AWC_STORYBOOK_PAGE_ENTRIES } from "@/utils/storybook/awc/awcStorybookPageCatalog";
import { AWC_STORYBOOK_PAGE_MANIFEST } from "@/utils/storybook/awc/awcStorybookPageManifest.constant";

const assertManifestMatchesEntries = (
  manifest: readonly {
    readonly id: string;
    readonly statuses: readonly string[];
  }[],
  entries: readonly {
    readonly id: string;
    readonly statuses: readonly string[];
  }[],
): void => {
  expect(manifest.map((row) => row.id).sort()).toEqual(
    entries.map((row) => row.id).sort(),
  );

  for (const manifestRow of manifest) {
    const entry = entries.find((row) => row.id === manifestRow.id);
    expect(entry?.statuses).toEqual(manifestRow.statuses);
  }
};

describe("pageStoryManifest", () => {
  it("keeps AWC manifest aligned with story catalog entries", () => {
    assertManifestMatchesEntries(
      AWC_STORYBOOK_PAGE_MANIFEST,
      AWC_STORYBOOK_PAGE_ENTRIES,
    );
  });

  it("keeps AWL manifest aligned with story catalog entries", () => {
    assertManifestMatchesEntries(
      AWL_STORYBOOK_PAGE_MANIFEST,
      AWL_STORYBOOK_PAGE_ENTRIES,
    );
  });
});
