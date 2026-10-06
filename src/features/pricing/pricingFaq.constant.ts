import { PRICING_CONFIG } from "@/features/pricing/pricingConfig.constant";
import { formatUsd } from "@/features/pricing/formatUsd";

const { pro, team, cloudStorageUsdPerGbMonth } = PRICING_CONFIG;

export interface PricingFaqItem {
  readonly question: string;
  readonly answer: string;
}

/** FAQ without sample "viewers are free" claims (EN-PASS / BUILD-NOTES). */
export const PRICING_FAQ_ITEMS: readonly PricingFaqItem[] = [
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Your first month is free, with all Pro features and no card needed. Choose Pro or Team before it ends.",
  },
  {
    question: "What happens after the trial?",
    answer:
      "You pick Pro or Team and pay per seat. If you do nothing, your access ends and you are not charged.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, anytime. Cancel in billing and your plan runs to the end of the period you paid for. No fees, nothing to call about.",
  },
  {
    question: "What counts as a seat?",
    answer:
      "One person who runs assistants in your account. A seat is access to AgentWitch only. It never includes AI or storage.",
  },
  {
    question: "Can I use my own AI accounts?",
    answer:
      "Yes, and it is free. Connect the AI accounts you already have. Your provider bills you, not AgentWitch. AgentWitch AI credit is optional and never part of a seat.",
  },
  {
    question: "Can I use my own S3?",
    answer:
      "Yes. Keep messages in your own S3 bucket or on this computer. You never have to buy AgentWitch storage.",
  },
  {
    question: "When is cloud message storage available?",
    answer: `Only after paid billing starts, not during the free month. It is optional, costs ${formatUsd(cloudStorageUsdPerGbMonth)} per GB per month, and your own S3 works any time.`,
  },
  {
    question: "How is on-demand AI billed?",
    answer:
      "AI you run through AgentWitch is billed as you use it, at list rates, on your next invoice. You choose a monthly limit; assistants pause when you reach it, and we email you at 80%.",
  },
  {
    question: "How does a skill from repeated work get its AI?",
    answer:
      "When you create a skill from work you repeat, you choose: use your own tokens or AI account, or buy an AgentWitch AI pack. Seats never include AI.",
  },
  {
    question: "How does the Prompt Optimizer run?",
    answer: `Pick your CLI, an assistant, or tokens you buy. You can also add your own API key. Each API key counts as 1 assistant toward your limit (${pro.assistantsConnect} on Pro, ${team.assistantsConnect} on Team).`,
  },
  {
    question: "How many computers can I use?",
    answer: `Up to ${PRICING_CONFIG.pro.maxComputers} computers on every plan.`,
  },
  {
    question: "Can I switch plans?",
    answer: "Yes. Switching starts right away and is prorated.",
  },
  {
    question: "Do prices include tax?",
    answer:
      "Prices are in US dollars and exclude sales tax. Tax is added at checkout where it applies.",
  },
] as const;
