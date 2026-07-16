export type MarketingFeaturePreviewKey = "dispatch" | "approve" | "report";

export default interface MarketingFeatureItem {
  readonly title: string;
  readonly body: string;
  readonly preview: MarketingFeaturePreviewKey;
  readonly emphasized?: boolean;
}

export const MARKETING_FEATURE_ITEMS: readonly MarketingFeatureItem[] = [
  {
    title: "Automate repeat work",
    body: "Turn weekly reports and standups into scheduled playbooks on Macs you already own—less copy-paste, fewer chat threads.",
    preview: "dispatch",
    emphasized: true,
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
