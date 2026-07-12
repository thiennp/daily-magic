import type MarketingTrustItem from "@/features/marketing/types/MarketingTrustItem.type";

export const MARKETING_TRUST_ITEMS: readonly MarketingTrustItem[] = [
  { label: "Runs on your Mac", icon: "mac" },
  { label: "Company approval rules", icon: "shield", emphasized: true },
  { label: "Manager approvals", icon: "approval", emphasized: true },
  { label: "Saved job history", icon: "history" },
] as const;
