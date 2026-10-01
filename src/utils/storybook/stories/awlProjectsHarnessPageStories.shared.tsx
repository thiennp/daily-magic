import { AWL_PROJECTS_AND_HARNESS_PAGE_ENTRIES } from "@/utils/storybook/awl/entries/awlProjectsAndHarnessPages";
import { buildAwlPageStoriesFromEntries } from "@/utils/storybook/stories/buildAwlPageStoriesFromEntries";

export const awlProjectsHarnessPageStories = buildAwlPageStoriesFromEntries(
  AWL_PROJECTS_AND_HARNESS_PAGE_ENTRIES,
);
