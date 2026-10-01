import type { AwcStorybookShellVariant } from "@/utils/storybook/AwcStorybookChrome";
import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";

export interface AwcStorybookPageEntry {
  readonly id: string;
  readonly title: string;
  readonly path: string;
  readonly shell: AwcStorybookShellVariant;
  readonly statuses: readonly StorybookPageStatus[];
  readonly renderBody: (status: StorybookPageStatus) => React.ReactElement;
}
