export type MarketingTrustIconKey = "mac" | "shield" | "approval" | "connect";

export default interface MarketingTrustItem {
  readonly label: string;
  readonly icon: MarketingTrustIconKey;
}
