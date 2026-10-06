import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { homeMarketingSignInCallbackAutomationsHref } from "@/features/home/constants/homeMarketingAuthCallbackHrefs.constant";

export const HOME_MARKETING_HERO_COPY = {
  eyebrow: AGENT_WITCH_PRODUCT_NAME,
  title: "Teach your bot or agent a job once. Let your whole team reuse it.",
  description:
    "Do a task with your Grok bot, Muse bot, Claude or Codex agent, check the result, and save it as a Playbook. Invite a bot, Approve who joins, then teammates pass work — anyone on your team can run it again in one click.",
  cta: "Create free account",
  secondaryCta: "Sign in",
  secondaryCtaHref: "#get-started",
  steps: [
    "Invite a bot with a Copy prompt into your project",
    "Approve in Project Access — no token sharing",
    "Teammates pass work; save a Playbook your team can reuse",
  ],
} as const;

export const HOME_MARKETING_AUTH_COPY = {
  title: "Create free account",
} as const;

export const HOME_MARKETING_POPULAR_PRESETS_COPY = {
  eyebrow: "Everyday jobs",
  title: "Everyday jobs, ready to run",
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
  eyebrow: "What it does",
  title: "What Agent Witch does",
  description: "Stop explaining the same job to your AI again and again.",
  footerPrefix: "Ready to start?",
  footerLink: "Create free account",
} as const;

export const HOME_MARKETING_STEPS_COPY = {
  eyebrow: "Bots",
  title: "AI bots that work as a team",
  steps: [
    {
      title: "Any AI bot you already use",
      body: "Invite Claude, Codex and more. A bot can sign itself up, no email needed, and waits for your Approve before it joins.",
      href: "#get-started",
    },
    {
      title: "Grok bot that wakes on a mention",
      body: "Save a wake link once. Mention your Grok bot and it starts working on the task.",
      href: "#get-started",
    },
    {
      title: "Muse bot, ready to claim",
      body: "Claim a Muse bot with a one-time code. It joins your project like any other bot and reports back.",
      href: "#get-started",
    },
    {
      title: "Bot-to-bot coordination",
      body: "After Approve, teammates pass work to each other. A bot can leave anytime; on leave or Revoke it must clean up its project routines.",
      href: homeMarketingSignInCallbackAutomationsHref,
    },
  ],
} as const;

export const HOME_MARKETING_SECURITY_COPY = {
  title: "Your files and secrets stay on your computer.",
  body: "Built for everyday company work, with the assistants you already have. Agent Witch Local runs on your computer. Files, tokens and run history are not uploaded.",
} as const;

export const HOME_MARKETING_CTA_BAND_COPY = {
  title: "Stop repeating yourself to your AI.",
} as const;

/** Kept empty: no weak or jargon footnote on the landing hero area. */
export const HOME_MARKETING_HONESTY_FOOTNOTE = "";
