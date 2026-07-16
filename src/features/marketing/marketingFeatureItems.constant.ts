export type MarketingFeaturePreviewKey = "dispatch" | "approve" | "report";

export default interface MarketingFeatureItem {
  readonly title: string;
  readonly body: string;
  readonly preview: MarketingFeaturePreviewKey;
  readonly emphasized?: boolean;
}

export const MARKETING_FEATURE_ITEMS: readonly MarketingFeatureItem[] = [
  {
    title: "Live in about 15 minutes",
    body: "Create your free workspace, connect Mac agents, and share workflows—most organizations run their first jobs the same day.",
    preview: "dispatch",
    emphasized: true,
  },
  {
    title: "Security your company controls",
    body: "Set organization-wide rules and require manager approval before sensitive jobs run on a teammate's Mac.",
    preview: "approve",
    emphasized: true,
  },
  {
    title: "Shared visibility across teams",
    body: "Every run is recorded so managers and teammates see what was delegated, approved, and delivered.",
    preview: "report",
  },
] as const;
