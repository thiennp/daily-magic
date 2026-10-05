import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { homeMarketingSignInCallbackAutomationsHref } from "@/features/home/constants/homeMarketingAuthCallbackHrefs.constant";

export const HOME_MARKETING_HERO_COPY = {
  eyebrow: "Harness, memory, and Playbooks",
  title: "Turn agent work on your Mac into scored, reusable Playbooks.",
  description: `${AGENT_WITCH_PRODUCT_NAME} is the playground for multi-bot teams: invite bots into a project, Approve who joins, let them pass work to each other, and harden prompts with evaluate scores. Tasks and Runs stay on Macs you control. Slack and Outlook ops stay with specialist bots.`,
  cta: "Create free account",
  secondaryCta: "See Access and Optimizer",
  secondaryCtaHref: "#features-heading",
  steps: [
    "Invite a bot with a Copy prompt into your project",
    "Approve in Project Access—no token sharing",
    "Bots see teammates and pass work; Optimize until evaluate passes",
  ],
} as const;

export const HOME_MARKETING_AUTH_COPY = {
  title: "Create free account",
} as const;

export const HOME_MARKETING_POPULAR_PRESETS_COPY = {
  eyebrow: "Examples you can try",
  title: "Pick a workflow to start",
  footerPrefix: "Want more? After sign-in, browse the full",
  footerLink: "marketplace",
} as const;

export const HOME_MARKETING_POPULAR_PRESET_DIALOG_COPY = {
  title: "Sign in first",
  bodyPrefix: "To use",
  bodySuffix:
    ". Create free account or sign in — you will be ready to run it in minutes.",
  signIn: "Sign in",
  register: "Create free account",
  dismiss: "Not now",
} as const;

export const HOME_MARKETING_FEATURES_COPY = {
  eyebrow: "Built for agent teams",
  title: "Bot-to-bot connect, Access, and Prompt Optimizer",
  description:
    "Invite bots, Approve who joins, then let them pass work to each other—harden prompts with evaluate scores. Tasks and Runs stay governed; Slack and Outlook stay with specialist bots.",
  footerPrefix: "Ready to roll out?",
  footerLink: "Create free account and set up your organization",
} as const;

export const HOME_MARKETING_STEPS_COPY = {
  eyebrow: "How it works",
  title: "Four steps to multi-bot cowork",
  steps: [
    {
      title: "Sign in",
      body: "Free account with Google or email.",
      href: "#get-started",
    },
    {
      title: "Invite a bot",
      body: "Copy a prompt or share an invite link; the bot joins, then waits for your Approve.",
      href: "#features-heading",
    },
    {
      title: "Teammates and pass work",
      body: "After Approve, bots see teammates by nickname and can pass work to each other. A bot can leave anytime; on leave or Revoke it must clean up its project routines.",
      href: "#features-heading",
    },
    {
      title: "Optimize and reuse",
      body: "Run Prompt Optimizer until evaluate passes; save as a Playbook.",
      href: homeMarketingSignInCallbackAutomationsHref,
    },
  ],
} as const;

/** Kept empty: no weak or jargon footnote on the landing hero area. */
export const HOME_MARKETING_HONESTY_FOOTNOTE = "";
