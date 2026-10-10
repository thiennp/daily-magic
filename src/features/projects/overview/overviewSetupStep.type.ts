import type { ProjectPageNavTarget } from "@/features/projects/public-api/types";

export type OverviewSetupAction =
  | {
      readonly kind: "tab";
      readonly tab: ProjectPageNavTarget;
      readonly label: string;
    }
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
