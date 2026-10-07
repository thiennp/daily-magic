import { PRICING_CONFIG } from "@/features/pricing/pricingConfig.constant";
import { formatUsd } from "@/features/pricing/formatUsd";

export type PricingPlanCardId = "trial" | "pro" | "team";

export interface PricingPlanCard {
  readonly id: PricingPlanCardId;
  readonly name: string;
  readonly tag: string;
  readonly priceLabel: string;
  readonly priceSuffix: string;
  readonly minLine: string;
  readonly feats: readonly string[];
  readonly ctaLabel: string;
  readonly accentClass: string;
  readonly popular?: boolean;
  readonly contactSales?: boolean;
}

const { trial, pro, team } = PRICING_CONFIG;

export const PRICING_PLAN_CARDS: readonly PricingPlanCard[] = [
  {
    id: "trial",
    name: trial.name,
    tag: "Try everything in Pro for a month.",
    priceLabel: formatUsd(trial.pricePerSeatMonth),
    priceSuffix: "for 1 month",
    minLine: "Then choose Pro or Team",
    feats: [
      "All Pro features for 1 month",
      "No card needed",
      `Connect up to ${trial.assistantsConnect} assistants`,
      `Up to ${trial.maxComputers} computers`,
      "No cloud message storage during the trial",
    ],
    ctaLabel: "Start trial",
    accentClass: "border-awc-border-strong ring-awc-accent-soft",
  },
  {
    id: "pro",
    name: pro.name,
    tag: "Full access for people who use assistants every day.",
    priceLabel: formatUsd(pro.pricePerSeatMonth),
    priceSuffix: "per seat / month",
    minLine: `From ${pro.minSeats} seat`,
    feats: [
      "Every AgentWitch feature for each seat",
      `Connect up to ${pro.assistantsConnect} assistants`,
      "Local LLM",
      "Token savings with auto skill build",
      `Up to ${pro.maxComputers} computers`,
    ],
    ctaLabel: "Subscribe",
    accentClass: "border-blue-600/40 ring-blue-600/20",
    popular: true,
  },
  {
    id: "team",
    name: team.name,
    tag: "For teams that share work and billing.",
    priceLabel: formatUsd(team.pricePerSeatMonth),
    priceSuffix: "per seat / month",
    minLine: `Minimum ${team.minSeats} seats · ${formatUsd(team.pricePerSeatMonth * team.minSeats)} / month`,
    feats: [
      "Everything in Pro",
      `Connect up to ${team.assistantsConnect} assistants`,
      "Share harness across your team",
      "Team token savings on repeated work",
      "Seat management and roles",
      "Pay by invoice",
    ],
    ctaLabel: "Start team",
    accentClass: "border-awc-border-strong ring-awc-accent-soft",
    contactSales: true,
  },
] as const;
