import { AWL_HOME_AND_TASK_PAGE_ENTRIES } from "@/utils/storybook/awl/entries/awlHomeAndTaskPages";
import { buildAwlPageStoriesFromEntries } from "@/utils/storybook/stories/buildAwlPageStoriesFromEntries";

export const awlHomeTaskPageStories = buildAwlPageStoriesFromEntries(
  AWL_HOME_AND_TASK_PAGE_ENTRIES,
);
