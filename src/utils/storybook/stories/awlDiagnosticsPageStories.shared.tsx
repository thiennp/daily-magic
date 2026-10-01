import { AWL_DIAGNOSTICS_PAGE_ENTRIES } from "@/utils/storybook/awl/entries/awlDiagnosticsPages";
import { buildAwlPageStoriesFromEntries } from "@/utils/storybook/stories/buildAwlPageStoriesFromEntries";

export const awlDiagnosticsPageStories = buildAwlPageStoriesFromEntries(
  AWL_DIAGNOSTICS_PAGE_ENTRIES,
);
