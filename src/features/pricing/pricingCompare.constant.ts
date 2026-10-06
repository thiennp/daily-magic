import { PRICING_CONFIG } from "@/features/pricing/pricingConfig.constant";
import { formatUsd } from "@/features/pricing/formatUsd";

export type CompareCell = boolean | string | null;

export interface PricingCompareRow {
  readonly feature: string;
  readonly trial: CompareCell;
  readonly pro: CompareCell;
  readonly team: CompareCell;
  readonly tip?: string;
}

export interface PricingCompareSection {
  readonly heading: string;
  readonly rows: readonly PricingCompareRow[];
}

const { trial, pro, team } = PRICING_CONFIG;

export const PRICING_COMPARE_SECTIONS: readonly PricingCompareSection[] = [
  {
    heading: "Access",
    rows: [
      {
        feature: "Every AgentWitch feature",
        trial: true,
        pro: true,
        team: true,
      },
      {
        feature: "Length",
        trial: "1 month",
        pro: "Ongoing",
        team: "Ongoing",
      },
      {
        feature: "Assistants you can connect",
        trial: String(trial.assistantsConnect),
        pro: String(pro.assistantsConnect),
        team: String(team.assistantsConnect),
        tip: "How many assistants can be connected at once. Each API key you add counts as 1 assistant.",
      },
      {
        feature: "Computers",
        trial: `Up to ${trial.maxComputers}`,
        pro: `Up to ${pro.maxComputers}`,
        team: `Up to ${team.maxComputers}`,
        tip: "The same limit of 2 computers applies to every plan.",
      },
      {
        feature: "Projects",
        trial: "Unlimited",
        pro: "Unlimited",
        team: "Unlimited",
      },
    ],
  },
  {
    heading: "Saving tokens",
    rows: [
      { feature: "Local LLM", trial: true, pro: true, team: true },
      {
        feature: "Token savings with auto skill build",
        trial: true,
        pro: true,
        team: true,
        tip: "AgentWitch builds a skill from work you repeat, so the same task uses fewer tokens next time. Works with your own AI accounts or AI credit you buy.",
      },
      {
        feature: "Skill from repeated work runs on",
        trial: "Your own AI or an AgentWitch AI pack",
        pro: "Your own AI or an AgentWitch AI pack",
        team: "Your own AI or an AgentWitch AI pack",
        tip: "When you create a skill from work you repeat, you choose: use your own tokens or AI account, or buy an AgentWitch AI pack.",
      },
      {
        feature: "Prompt Optimizer runs on",
        trial: "Your CLI, an assistant or tokens you buy",
        pro: "Your CLI, an assistant or tokens you buy",
        team: "Your CLI, an assistant or tokens you buy",
        tip: "You can also add your own API key. Each API key counts as 1 assistant toward your limit.",
      },
      {
        feature: "Team token savings on repeated work",
        trial: null,
        pro: null,
        team: true,
        tip: "When the same work repeats across your team, you share the savings instead of paying again.",
      },
      {
        feature: "Share harness across your team",
        trial: null,
        pro: null,
        team: true,
        tip: "Your team shares one harness setup across all seats.",
      },
    ],
  },
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

export const PRICING_COMPARE_COLUMN_LABELS = {
  trial: `${trial.name} (${formatUsd(trial.pricePerSeatMonth)} for 1 month)`,
  pro: `${pro.name} (${formatUsd(pro.pricePerSeatMonth)} / seat)`,
  team: `${team.name} (${formatUsd(team.pricePerSeatMonth)} / seat)`,
} as const;
