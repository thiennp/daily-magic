import AwcStorybookChrome from "@/utils/storybook/AwcStorybookChrome";
import { AWC_STORYBOOK_PAGE_ENTRIES } from "@/utils/storybook/awc/awcStorybookPageCatalog";
import type { AwcStorybookPageEntry } from "@/utils/storybook/awc/awcStorybookPageEntry.type";
import { createAwcStorybookMswHandlers } from "@/utils/storybook/awcStorybookMswHandlers";
import {
  buildDeployablePageStories,
  deployablePagesMeta,
} from "@/utils/storybook/buildDeployablePageStories";
import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";

const entryById = new Map(
  AWC_STORYBOOK_PAGE_ENTRIES.map((entry) => [entry.id, entry]),
);

const renderAwcPage = (
  entry: AwcStorybookPageEntry,
  status: StorybookPageStatus,
) => (
  <AwcStorybookChrome
    status={status}
    shell={entry.shell}
    renderPrimaryNav={entry.renderPrimaryNav ?? true}
  >
    {entry.renderBody(status)}
  </AwcStorybookChrome>
);

export const awcPagesMeta = deployablePagesMeta("AWC");

export const awcPageStories = buildDeployablePageStories(
  AWC_STORYBOOK_PAGE_ENTRIES.map((entry) => ({
    id: entry.id,
    title: entry.title,
    path: entry.path,
    statuses: entry.statuses,
    parametersForStatus: (status) => ({
      msw: {
        handlers: createAwcStorybookMswHandlers(status),
      },
    }),
  })),
  (metaEntry, status) => {
    const entry = entryById.get(metaEntry.id);
    if (entry === undefined) {
      throw new Error(`Missing AWC story entry: ${metaEntry.id}`);
    }
    return renderAwcPage(entry, status);
  },
);
