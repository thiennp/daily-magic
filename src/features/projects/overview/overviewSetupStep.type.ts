import type { ProjectPageTabId } from "@/features/projects/projectPageTabs.constant";

export type OverviewSetupAction =
  | { readonly kind: "tab"; readonly tab: ProjectPageTabId; readonly label: string }
  | { readonly kind: "mac"; readonly label: string }
  | { readonly kind: "none"; readonly label: string };

export type OverviewSetupStep = {
  readonly id: string;
  readonly title: string;
  readonly hint: string | null;
  readonly done: boolean;
  readonly optional?: boolean;
  readonly action: OverviewSetupAction;
};
