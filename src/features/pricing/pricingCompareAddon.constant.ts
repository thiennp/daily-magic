import { PRICING_CONFIG } from "@/features/pricing/pricingConfig.constant";
import type { PricingCompareSection } from "@/features/pricing/pricingCompareTypes";

const { trial, pro, team } = PRICING_CONFIG;

export const PRICING_COMPARE_ADDON_SECTIONS: readonly PricingCompareSection[] =
  [
    {
      heading: "AI and storage, all optional",
      rows: [
        {
          feature: "Your own AI accounts",
          trial: "Free",
          pro: "Free",
          team: "Free",
          tip: "Connect AI accounts you already have. They bill you directly. AgentWitch charges nothing for that.",
        },
        {
          feature: "Your own S3 for messages",
          trial: "Free",
          pro: "Free",
          team: "Free",
          tip: "Keep messages in your own bucket, or on this computer. You do not need to buy AgentWitch storage.",
        },
        {
          feature: "AgentWitch AI credit",
          trial: "On demand",
          pro: "On demand",
          team: "On demand",
          tip: "Only if you want AgentWitch to bill the AI. Never part of a seat.",
        },
        {
          feature: "AgentWitch cloud message storage",
          trial: "Not in the trial",
          pro: "Optional add-on",
          team: "Optional add-on",
          tip: "Cloud message storage starts when paid billing starts. It is not available during the free month. Your own S3 works any time.",
        },
      ],
    },
    {
      heading: "Team",
      rows: [
        {
          feature: "Seat management and roles",
          trial: null,
          pro: null,
          team: true,
        },
        { feature: "Pay by invoice", trial: null, pro: null, team: true },
        {
          feature: "Minimum seats",
          trial: String(trial.minSeats),
          pro: String(pro.minSeats),
          team: String(team.minSeats),
        },
        {
          feature: "Support",
          trial: "Email",
          pro: "Email",
          team: "Priority email",
        },
        { feature: "Cancel anytime", trial: true, pro: true, team: true },
      ],
    },
  ] as const;
