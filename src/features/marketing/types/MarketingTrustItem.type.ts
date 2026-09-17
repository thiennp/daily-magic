export type MarketingTrustIconKey = "mac" | "shield" | "approval" | "connect";

export default interface MarketingTrustItem {
  readonly metric: string;
  readonly description: string;
  readonly icon: MarketingTrustIconKey;
}
