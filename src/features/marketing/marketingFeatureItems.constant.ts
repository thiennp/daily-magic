export type MarketingFeaturePreviewKey = "dispatch" | "approve" | "report";

export interface MarketingFeatureItem {
  readonly title: string;
  readonly body: string;
  readonly preview: MarketingFeaturePreviewKey;
}

export const MARKETING_FEATURE_ITEMS: readonly MarketingFeatureItem[] = [
  {
    title: "Send tasks",
    body: "Ask your Mac to do something from the browser — for yourself or a colleague in your company.",
    preview: "dispatch",
  },
  {
    title: "Ask first",
    body: "Company admins can require approval before someone else's computer is used.",
    preview: "approve",
  },
  {
    title: "See what happened",
    body: "Every job is saved with its status, who sent it, and what came back.",
    preview: "report",
  },
] as const;
