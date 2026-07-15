import type MarketingTrustItem from "@/features/marketing/types/MarketingTrustItem.type";

export const MARKETING_TRUST_ITEMS: readonly MarketingTrustItem[] = [
  { label: "Runs on your Mac", icon: "mac" },
  { label: "Your company sets the rules", icon: "shield", emphasized: true },
  { label: "Manager can approve first", icon: "approval", emphasized: true },
  { label: "Every run is saved", icon: "history" },
] as const;
