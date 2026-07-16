import type MarketingTrustItem from "@/features/marketing/types/MarketingTrustItem.type";

export const MARKETING_TRUST_ITEMS: readonly MarketingTrustItem[] = [
  { label: "Runs on your Mac", icon: "mac" },
  { label: "Organization security controls", icon: "shield" },
  { label: "Built for agent teams", icon: "approval" },
  { label: "Connected workflows and agents", icon: "connect" },
] as const;
