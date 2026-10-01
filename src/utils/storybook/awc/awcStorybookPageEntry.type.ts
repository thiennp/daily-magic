import type { AwcStorybookShellVariant } from "@/utils/storybook/AwcStorybookChrome";
import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";

export interface AwcStorybookPageEntry {
  readonly id: string;
  readonly title: string;
  readonly path: string;
  readonly shell: AwcStorybookShellVariant;
  /** Match production AppShell when primary nav lives in page body (e.g. home dashboard). */
  readonly renderPrimaryNav?: boolean;
  readonly statuses: readonly StorybookPageStatus[];
  readonly renderBody: (status: StorybookPageStatus) => React.ReactElement;
}
