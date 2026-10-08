import { PRICING_CONFIG } from "@/features/pricing/pricingConfig.constant";
import { formatUsd } from "@/features/pricing/formatUsd";
import { PRICING_COMPARE_ACCESS_SECTIONS } from "@/features/pricing/pricingCompareAccess.constant";
import { PRICING_COMPARE_ADDON_SECTIONS } from "@/features/pricing/pricingCompareAddon.constant";

export type {
  CompareCell,
  PricingCompareRow,
  PricingCompareSection,
} from "@/features/pricing/pricingCompareTypes";

const { trial, pro, team } = PRICING_CONFIG;

export const PRICING_COMPARE_SECTIONS = [
  ...PRICING_COMPARE_ACCESS_SECTIONS,
  ...PRICING_COMPARE_ADDON_SECTIONS,
] as const;

export const PRICING_COMPARE_COLUMN_LABELS = {
  trial: {
    name: trial.name,
    sub: `${formatUsd(trial.pricePerSeatMonth)} for 1 month`,
  },
  pro: { name: pro.name, sub: `${formatUsd(pro.pricePerSeatMonth)} / seat` },
  team: { name: team.name, sub: `${formatUsd(team.pricePerSeatMonth)} / seat` },
} as const;
