import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

export const HOME_MARKETING_HERO_COPY = {
  eyebrow: "For you and your team",
  title: "Set up once. Your Mac does the work.",
  description: `${AGENT_WITCH_PRODUCT_NAME} is your control panel: pick a job, choose who it runs for, and when. Managers can approve sensitive runs. Everyone sees the results.`,
  cta: "Create a free account →",
  steps: [
    "Pick a ready-made workflow—or make your own",
    "Connect your Mac in a few minutes",
    "Run it for yourself, your group, or on a schedule",
  ],
} as const;

export const HOME_MARKETING_AUTH_COPY = {
  title: "Create your free account",
  description:
    "Sign in with Google or email. Then connect your Mac—it only takes a few minutes.",
} as const;

export const HOME_MARKETING_POPULAR_PRESETS_COPY = {
  eyebrow: "Examples you can try",
  title: "Pick a workflow to start",
  description:
    "Free templates for everyday jobs—email replies, lesson plans, shop support, and more. Sign in to save one and run it on your Mac.",
  footerPrefix: "Want more? After sign-in, browse the full",
  footerLink: "marketplace",
} as const;

export const HOME_MARKETING_POPULAR_PRESET_DIALOG_COPY = {
  title: "Sign in first",
  bodyPrefix: "To use",
  bodySuffix:
    ", create a free account or sign in. Then connect your Mac and you are ready.",
  signIn: "Sign in",
  register: "Create account here",
  dismiss: "Not now",
} as const;

export const HOME_MARKETING_FEATURES_COPY = {
  eyebrow: "Why it helps",
  title: "Simple to set up, easy to trust",
  description:
    "You always know what ran, who approved it, and what came back—whether it is just for you or for the whole team.",
  footerPrefix: "Ready to try it?",
  footerLink: "Sign in and connect your Mac",
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
      title: "Connect your Mac",
      body: "Copy one install command into Terminal.",
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
