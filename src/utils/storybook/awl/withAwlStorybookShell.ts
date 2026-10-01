import type { AgentWitchLocalAppNavPath } from "@agent-witch/live-shell/presentation";

import type { AwlStorybookPageEntry } from "@/utils/storybook/awl/awlStorybookPageEntry.type";
import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";
import { renderAwlStorybookDocument } from "@/utils/storybook/renderAwlStorybookDocument";

export const withAwlStorybookShell = (entry: {
  readonly id: string;
  readonly title: string;
  readonly path: string;
  readonly activePath: AgentWitchLocalAppNavPath;
  readonly statuses: readonly StorybookPageStatus[];
  readonly buildBody: (status: StorybookPageStatus) => string;
}): AwlStorybookPageEntry => ({
  ...entry,
  renderHtml: (status) =>
    renderAwlStorybookDocument({
      title: entry.title,
      activePath: entry.activePath,
      body: entry.buildBody(status),
    }),
});
