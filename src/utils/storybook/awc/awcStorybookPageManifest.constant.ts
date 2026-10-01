import { AWC_STORYBOOK_PAGE_MANIFEST_PART1 } from "@/utils/storybook/awc/awcStorybookPageManifest.part1.constant";
import { AWC_STORYBOOK_PAGE_MANIFEST_PART2 } from "@/utils/storybook/awc/awcStorybookPageManifest.part2.constant";
import type { AwcStorybookPageManifestEntry } from "@/utils/storybook/awc/awcStorybookPageManifest.type";

export type { AwcStorybookPageManifestEntry } from "@/utils/storybook/awc/awcStorybookPageManifest.type";

export const AWC_STORYBOOK_PAGE_MANIFEST: readonly AwcStorybookPageManifestEntry[] =
  [...AWC_STORYBOOK_PAGE_MANIFEST_PART1, ...AWC_STORYBOOK_PAGE_MANIFEST_PART2];
