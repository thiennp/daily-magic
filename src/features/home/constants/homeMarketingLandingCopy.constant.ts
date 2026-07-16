import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

export const HOME_MARKETING_HERO_COPY = {
  eyebrow: "For you and your team",
  title: "An agent assistant for you and your organization.",
  description: `${AGENT_WITCH_PRODUCT_NAME} helps you deploy agents across your organization in as little as 15 minutes. Delegate work to dedicated Mac agents, keep coordination in one workspace, and maintain manager approvals with full visibility into outcomes.`,
  cta: "Create a free account →",
  steps: [
    "Pick a ready-made workflow—or make your own",
    "Add your Mac as the worker—it runs the jobs you set up",
    "Run your agents—or your whole company's—from your phone, from anywhere, with automation or a schedule",
  ],
} as const;

export const HOME_MARKETING_AUTH_COPY = {
  title: "Create your free account",
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
    ", create a free account or sign in. You will be ready to run it in minutes.",
  signIn: "Sign in",
  register: "Create account here",
  dismiss: "Not now",
} as const;

export const HOME_MARKETING_FEATURES_COPY = {
  eyebrow: "Why it helps",
  title: "Simple to set up, easy to trust",
  description:
    "You always know what ran, who approved it, and what came back. Human-only steps stay in your browser checklist; your Mac runs the rest.",
  footerPrefix: "Ready to try it?",
  footerLink: "Create a free account and try a workflow",
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
      href: "/login",
    },
    {
      title: "Pick a workflow",
      body: "Start from a template below or build your own.",
      href: "#popular-presets-heading",
    },
    {
      title: "Run or automate",
      body: "Run once, on a schedule, or share with your team.",
      href: "/login?callbackUrl=%2Fautomations",
    },
  ],
} as const;
