export type MarketingTrustIconKey = "mac" | "shield" | "approval" | "history";

export default interface MarketingTrustItem {
  readonly label: string;
  readonly icon: MarketingTrustIconKey;
  readonly emphasized?: boolean;
}
