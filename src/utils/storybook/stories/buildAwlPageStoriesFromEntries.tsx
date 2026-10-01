import AwlStorybookPageFrame from "@/utils/storybook/AwlStorybookPageFrame";
import type { AwlStorybookPageEntry } from "@/utils/storybook/awl/awlStorybookPageEntry.type";
import {
  buildDeployablePageStories,
  type DeployablePageStoryEntry,
} from "@/utils/storybook/buildDeployablePageStories";
import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";

const renderAwlPage = (
  entry: AwlStorybookPageEntry,
  status: StorybookPageStatus,
) => <AwlStorybookPageFrame html={entry.renderHtml(status)} />;

export const buildAwlPageStoriesFromEntries = (
  entries: readonly AwlStorybookPageEntry[],
): Record<string, unknown> => {
  const entryById = new Map(entries.map((entry) => [entry.id, entry]));
  const metaEntries: DeployablePageStoryEntry[] = entries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    path: entry.path,
    statuses: entry.statuses,
  }));

  return buildDeployablePageStories(metaEntries, (metaEntry, status) => {
    const entry = entryById.get(metaEntry.id);
    if (entry === undefined) {
      throw new Error(`Missing AWL story entry: ${metaEntry.id}`);
    }
    return renderAwlPage(entry, status);
  });
};
