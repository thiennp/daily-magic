import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import {
  homeMarketingSignInCallbackAutomationsHref,
  homeMarketingSignInCallbackHomeHref,
} from "@/features/home/constants/homeMarketingAuthCallbackHrefs.constant";

export const HOME_MARKETING_HERO_COPY = {
  eyebrow: "Agent operations, for the whole company",
  title: "Delegate AI work to Macs your organization controls.",
  description: `${AGENT_WITCH_PRODUCT_NAME} routes tasks from a shared dashboard to Mac runners your team already owns, applies your approval policy before anything sensitive ships, and keeps a full record of every run.`,
  cta: "Create free account",
  secondaryCta: "Review security model",
  secondaryCtaHref: "#features-heading",
  steps: [
    "Pick a ready-made workflow—or make your own",
    "Add your Mac as the worker—it runs the jobs you set up",
    "Run your agents—or your whole company's—from your phone, from anywhere, with automation or a schedule",
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
  eyebrow: "Built for organizations",
  title: "Free company setup that is fast, governed, and effective",
  description:
    "Most teams connect their first Macs and delegate agent work in about 15 minutes—with security rules, approvals, and shared visibility built in.",
  footerPrefix: "Ready to roll out?",
  footerLink: "Create free account and set up your organization",
} as const;

export const HOME_MARKETING_STEPS_COPY = {
  eyebrow: "How it works",
  title: "Four steps to your first automation",
  steps: [
    {
      title: "Sign in",
      body: "Free account with Google or email.",
      href: "#get-started",
    },
    {
      title: "Add your Mac",
      body: "One install command—then your computer runs the jobs.",
      href: homeMarketingSignInCallbackHomeHref,
    },
    {
      title: "Pick a workflow",
      body: "Start from a template below or build your own.",
      href: "#popular-presets-heading",
    },
    {
      title: "Run or automate",
      body: "Run once, on a schedule, or share with your team.",
      href: homeMarketingSignInCallbackAutomationsHref,
    },
  ],
} as const;
