import { AWC_APP_SHELL_PAGE_ENTRIES } from "@/utils/storybook/awc/entries/awcAppShellPages";
import { AWC_MARKETING_AND_AUTH_PAGE_ENTRIES } from "@/utils/storybook/awc/entries/awcMarketingAndAuthPages";
import type { AwcStorybookPageEntry } from "@/utils/storybook/awc/awcStorybookPageEntry.type";

export const AWC_STORYBOOK_PAGE_ENTRIES: readonly AwcStorybookPageEntry[] = [
  ...AWC_MARKETING_AND_AUTH_PAGE_ENTRIES,
  ...AWC_APP_SHELL_PAGE_ENTRIES,
];
