import { AWL_STORYBOOK_PROMPT_OPTIMIZER_PAGE_ENTRIES } from "@/utils/storybook/awl/awlStorybookPromptOptimizerPageCatalog";
import { buildAwlPageStoriesFromEntries } from "@/utils/storybook/stories/buildAwlPageStoriesFromEntries";

export const awlPromptOptimizerPageStories = buildAwlPageStoriesFromEntries(
  AWL_STORYBOOK_PROMPT_OPTIMIZER_PAGE_ENTRIES,
);
