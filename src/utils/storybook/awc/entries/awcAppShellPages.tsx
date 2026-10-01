import { AWC_CORE_APP_PAGE_ENTRIES } from "@/utils/storybook/awc/entries/awcCoreAppPages";
import { AWC_SECONDARY_APP_PAGE_ENTRIES } from "@/utils/storybook/awc/entries/awcSecondaryAppPages";
import type { AwcStorybookPageEntry } from "@/utils/storybook/awc/awcStorybookPageEntry.type";

export const AWC_APP_SHELL_PAGE_ENTRIES: readonly AwcStorybookPageEntry[] = [
  ...AWC_CORE_APP_PAGE_ENTRIES,
  ...AWC_SECONDARY_APP_PAGE_ENTRIES,
];
