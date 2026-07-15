export type MarketingFeaturePreviewKey = "dispatch" | "approve" | "report";

export default interface MarketingFeatureItem {
  readonly title: string;
  readonly body: string;
  readonly preview: MarketingFeaturePreviewKey;
  readonly emphasized?: boolean;
}

export const MARKETING_FEATURE_ITEMS: readonly MarketingFeatureItem[] = [
  {
    title: "Run on your Mac",
    body: "You click in the browser. The work runs on a real Mac—yours or a teammate's.",
    preview: "dispatch",
  },
  {
    title: "Approvals when needed",
    body: "Your company can require a manager OK before someone else's Mac runs a sensitive job.",
    preview: "approve",
    emphasized: true,
  },
  {
    title: "Clear history",
    body: "Every run is saved: who sent it, whether it was approved, and what came back.",
    preview: "report",
  },
] as const;
