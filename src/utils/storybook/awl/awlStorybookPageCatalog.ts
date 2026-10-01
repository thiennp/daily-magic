import { AWL_STORYBOOK_CORE_PAGE_ENTRIES } from "@/utils/storybook/awl/awlStorybookEntryGroups";
import { AWL_STORYBOOK_PROMPT_OPTIMIZER_PAGE_ENTRIES } from "@/utils/storybook/awl/awlStorybookPromptOptimizerPageCatalog";
import type { AwlStorybookPageEntry } from "@/utils/storybook/awl/awlStorybookPageEntry.type";

export { AWL_STORYBOOK_CORE_PAGE_ENTRIES };

export const AWL_STORYBOOK_PAGE_ENTRIES: readonly AwlStorybookPageEntry[] = [
  ...AWL_STORYBOOK_CORE_PAGE_ENTRIES,
  ...AWL_STORYBOOK_PROMPT_OPTIMIZER_PAGE_ENTRIES,
];
