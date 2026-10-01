import type { ReactElement } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";
import { formatStorybookPageStatusLabel } from "@/utils/storybook/storybookPageStatus.constant";

export interface DeployablePageStoryEntry {
  readonly id: string;
  readonly title: string;
  readonly path: string;
  readonly statuses: readonly StorybookPageStatus[];
  readonly parametersForStatus?: (
    status: StorybookPageStatus,
  ) => StoryObj["parameters"];
}

export const buildDeployablePageStories = (
  entries: readonly DeployablePageStoryEntry[],
  renderPage: (
    entry: DeployablePageStoryEntry,
    status: StorybookPageStatus,
  ) => ReactElement,
): Record<string, StoryObj> => {
  const stories: Record<string, StoryObj> = {};

  for (const entry of entries) {
    for (const status of entry.statuses) {
      const exportKey = `${entry.id.replaceAll("-", "_")}_${status}`;
      stories[exportKey] = {
        name: `${entry.title} — ${formatStorybookPageStatusLabel(status)}`,
        parameters: entry.parametersForStatus?.(status),
        render: () => renderPage(entry, status),
      };
    }
  }

  return stories;
};

export const deployablePagesMeta = (deployable: "AWC" | "AWL"): Meta => ({
  title: `${deployable}/Pages`,
  parameters: { layout: "fullscreen" },
});
