import type MarketingTrustItem from "@/features/marketing/types/MarketingTrustItem.type";

export const MARKETING_TRUST_ITEMS: readonly MarketingTrustItem[] = [
  { label: "Runs on your Mac", icon: "mac" },
  {
    label: "Your company sets the security rules",
    icon: "shield",
    emphasized: true,
  },
  { label: "Built for agent teamwork", icon: "approval", emphasized: true },
  { label: "Connect workflows and agents", icon: "connect" },
] as const;
