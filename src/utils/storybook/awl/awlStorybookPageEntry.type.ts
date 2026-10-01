import type { AgentWitchLocalAppNavPath } from "@agent-witch/live-shell/presentation";

import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";

export interface AwlStorybookPageEntry {
  readonly id: string;
  readonly title: string;
  readonly path: string;
  readonly activePath: AgentWitchLocalAppNavPath;
  readonly statuses: readonly StorybookPageStatus[];
  readonly renderHtml: (status: StorybookPageStatus) => string;
}
