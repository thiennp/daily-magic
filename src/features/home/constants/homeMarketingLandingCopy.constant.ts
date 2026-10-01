import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import {
  homeMarketingSignInCallbackAutomationsHref,
  homeMarketingSignInCallbackHomeHref,
} from "@/features/home/constants/homeMarketingAuthCallbackHrefs.constant";

export const HOME_MARKETING_HERO_COPY = {
  eyebrow: "Harness, memory, and Playbooks",
  title: "Turn agent work on your Mac into scored, reusable Playbooks.",
  description: `${AGENT_WITCH_PRODUCT_NAME} is the playground for multi-bot teams: improve prompts with evaluate scores, Approve who joins a project, and keep Tasks and Runs on Macs you control. Slack and Outlook ops stay with specialist bots.`,
  cta: "Create free account",
  secondaryCta: "See Access and Optimizer",
  secondaryCtaHref: "#features-heading",
  steps: [
    "Open a project and connect your Mac",
    "Approve bots into Project Access—no token sharing",
    "Run Prompt Optimizer until evaluate passes; save a Playbook",
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
  title: "Playground for Macs, Access, and Prompt Optimizer",
  description:
    "Connect Macs, Approve project membership, and harden prompts with evaluate scores—so Tasks and Runs stay governed while Slack and Outlook stay with specialist bots.",
  footerPrefix: "Ready to roll out?",
  footerLink: "Create free account and set up your organization",
} as const;

export const HOME_MARKETING_STEPS_COPY = {
  eyebrow: "How it works",
  title: "Four steps to your first Playbook",
  steps: [
    {
      title: "Sign in",
      body: "Free account with Google or email.",
      href: "#get-started",
    },
    {
      title: "Add your Mac",
      body: "One install command—then your computer runs the Tasks.",
      href: homeMarketingSignInCallbackHomeHref,
    },
    {
      title: "Approve Access",
      body: "Bots request project membership; you Approve, Deny, or Revoke.",
      href: "#features-heading",
    },
    {
      title: "Optimize and reuse",
      body: "Run Prompt Optimizer until evaluate passes; save as a Playbook.",
      href: homeMarketingSignInCallbackAutomationsHref,
    },
  ],
} as const;


/** G3/G4 — keep Lessons and skills-rag off the hero; optional footnote only. */
export const HOME_MARKETING_HONESTY_FOOTNOTE =
  "Lessons memory is evolving (ask for the structured Lessons design if you need it). Skills-rag / feature-knowledge stays in power-user docs — not the landing hero.";
