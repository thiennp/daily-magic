export type MarketingFeaturePreviewKey = "dispatch" | "approve" | "report";

export interface MarketingFeatureItem {
  readonly title: string;
  readonly body: string;
  readonly preview: MarketingFeaturePreviewKey;
}

export const MARKETING_FEATURE_ITEMS: readonly MarketingFeatureItem[] = [
  {
    title: "Dispatch",
    body: "Send tasks to your machine or a teammate in the same group.",
    preview: "dispatch",
  },
  {
    title: "Approve",
    body: "Group admins set open vs approval; users can override in agent setup.",
    preview: "approve",
  },
  {
    title: "Report",
    body: "Every run is recorded with status, policy, and output.",
    preview: "report",
  },
] as const;
