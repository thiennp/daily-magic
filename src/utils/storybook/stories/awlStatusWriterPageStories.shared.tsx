import { AWL_STATUS_WRITER_PAGE_ENTRIES } from "@/utils/storybook/awl/entries/awlStatusWriterPages";
import { buildAwlPageStoriesFromEntries } from "@/utils/storybook/stories/buildAwlPageStoriesFromEntries";

export const awlStatusWriterPageStories = buildAwlPageStoriesFromEntries(
  AWL_STATUS_WRITER_PAGE_ENTRIES,
);
