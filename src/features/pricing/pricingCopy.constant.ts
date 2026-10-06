import { PRICING_CONFIG } from "@/features/pricing/pricingConfig.constant";
import { formatUsd } from "@/features/pricing/formatUsd";

const { pro, team, aiCreditPacksUsd, cloudStorageUsdPerGbMonth } = PRICING_CONFIG;

export const PRICING_HERO_COPY = {
  title: "Simple pricing",
  lead:
    "Assistants on your projects. Start with a free month, then pay per seat. Cancel anytime. Prices in USD, excl. tax",
  tipTitle: "About prices",
  tipBody:
    "Sales tax is added at checkout where it applies. All prices are per seat per month unless said otherwise.",
} as const;

export const PRICING_TRUST_ITEMS = [
  { title: "1 month free", body: "No card needed" },
  { title: "Cancel anytime", body: "No fees, no calls" },
  { title: "Seats are access only", body: "AI and storage are optional" },
] as const;

export const PRICING_CANCEL_NOTE = "Cancel anytime." as const;

export const PRICING_TEAM_VOLUME_NOTE =
  "10 or more seats? Ask us about a volume discount." as const;

export const PRICING_BRING_YOUR_OWN = {
  title: "Bring your own",
  sub: "AI and storage are not part of a seat. Use your own, free, or add ours only when you need it.",
  cards: [
    {
      title: "Your own AI accounts",
      price: "Free to connect",
      body: "Connect the AI accounts you already pay for. Assistants use them directly. Your provider bills you, AgentWitch does not.",
    },
    {
      title: "Your own S3",
      price: "Free to connect",
      body: "Keep messages in your own bucket, or leave them on this computer. You never have to buy AgentWitch storage.",
    },
  ],
} as const;

const packList = aiCreditPacksUsd.map((n) => formatUsd(n)).join(", ");

export const PRICING_ON_DEMAND = {
  title: "On demand, only if you need it",
  sub: "Need AgentWitch to run the AI or keep your messages? Add it when you want, cancel anytime.",
  addons: [
    {
      title: "AI credit",
      price: `${formatUsd(aiCreditPacksUsd[0])} / pack of ${formatUsd(aiCreditPacksUsd[0])} credit`,
      body: `For skills from repeated work and the Prompt Optimizer, when you do not want to use your own AI. Packs of ${packList}.`,
    },
    {
      title: "Cloud storage",
      price: `${formatUsd(cloudStorageUsdPerGbMonth)} / GB / month`,
      body: "Only if you do not want to keep messages on this computer or in your own S3. Starts when paid billing starts, not during the free month.",
    },
  ],
  controlNote:
    "You stay in control of spend. AI you run through AgentWitch is billed as you use it. Set a monthly limit; we email you at 80%.",
} as const;

export const PRICING_HOW_AI_NOTES = {
  skillTitle: "Create a skill from repeated work",
  skillIntro: "Pick what pays for the AI that builds the skill.",
  skillOptions: [
    "Use my own tokens or AI — Free from AgentWitch. Your provider bills you.",
    `Buy an AgentWitch AI pack — Packs of ${packList}.`,
  ],
  optimizerTitle: "Prompt Optimizer",
  optimizerIntro: "Pick how the Prompt Optimizer runs.",
  optimizerOptions: [
    "My CLI",
    "An assistant",
    "Tokens I buy",
  ],
  optimizerHelp:
    "You can also add your own API key. Each API key counts as 1 assistant toward your limit.",
} as const;

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

export const PRICING_COMPARE_CAPTION = "Compare Trial, Pro and Team" as const;
