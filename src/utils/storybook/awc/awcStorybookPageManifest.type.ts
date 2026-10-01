import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";

export interface AwcStorybookPageManifestEntry {
  readonly id: string;
  readonly title: string;
  readonly path: string;
  readonly statuses: readonly StorybookPageStatus[];
}
