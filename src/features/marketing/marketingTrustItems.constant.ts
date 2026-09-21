import type MarketingTrustItem from "@/features/marketing/types/MarketingTrustItem.type";

export const MARKETING_TRUST_ITEMS: readonly MarketingTrustItem[] = [
  {
    metric: "~15 min",
    description: "to connect a Mac and run a first job",
    icon: "mac",
  },
  {
    metric: "100%",
    description: "run history stays in one place your team can audit",
    icon: "shield",
  },
  {
    metric: "1 record",
    description: "per job—who requested it, which Mac ran it, and what shipped",
    icon: "approval",
  },
  {
    metric: "0",
    description:
      "company secrets stored on vendor servers—runs stay on your Macs",
    icon: "connect",
  },
] as const;
