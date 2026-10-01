import AwlStorybookPageFrame from "@/utils/storybook/AwlStorybookPageFrame";
import { AWL_STORYBOOK_PAGE_ENTRIES } from "@/utils/storybook/awl/awlStorybookPageCatalog";
import type { AwlStorybookPageEntry } from "@/utils/storybook/awl/awlStorybookPageEntry.type";
import {
  buildDeployablePageStories,
  deployablePagesMeta,
} from "@/utils/storybook/buildDeployablePageStories";
import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";

const entryById = new Map(
  AWL_STORYBOOK_PAGE_ENTRIES.map((entry) => [entry.id, entry]),
);

const renderAwlPage = (
  entry: AwlStorybookPageEntry,
  status: StorybookPageStatus,
) => <AwlStorybookPageFrame html={entry.renderHtml(status)} />;

export const awlPagesMeta = deployablePagesMeta("AWL");

export const awlPageStories = buildDeployablePageStories(
  AWL_STORYBOOK_PAGE_ENTRIES.map((entry) => ({
    id: entry.id,
    title: entry.title,
    path: entry.path,
    statuses: entry.statuses,
  })),
  (metaEntry, status) => {
    const entry = entryById.get(metaEntry.id);
    if (entry === undefined) {
      throw new Error(`Missing AWL story entry: ${metaEntry.id}`);
    }
    return renderAwlPage(entry, status);
  },
);
