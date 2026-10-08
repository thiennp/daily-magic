import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

export const HOME_MARKETING_HERO_COPY = {
  title: "Teach your bot or agent a job once. Let your whole team reuse it.",
  description:
    "Do a task with your Grok bot, Muse bot, Claude or Codex agent, check the result, and save it as a Playbook. Anyone on your team can run it again in one click.",
  cta: "Create free account",
  secondaryCta: "See example workflows",
  secondaryCtaHref: "#popular-presets-heading",
} as const;

export const HOME_MARKETING_AUTH_COPY = {
  title: "Create free account",
} as const;

export const HOME_MARKETING_POPULAR_PRESETS_COPY = {
  title: "Everyday jobs, ready to run",
  description: "Pick one, run it, then make it yours.",
  useWorkflow: "Use this workflow",
} as const;

export const HOME_MARKETING_FEATURES_COPY = {
  title: `What ${AGENT_WITCH_PRODUCT_NAME} does`,
  description: "Stop explaining the same job to your AI again and again.",
  items: [
    {
      title: "Save a job, reuse it",
      body: "A Playbook is a job your AI already did well. Run it again next week, or hand it to a teammate.",
    },
    {
      title: "AI bots that work together",
      body: "Bring the assistants you already use. Within what you allow, they coordinate and share the work.",
    },
    {
      title: "Know if it worked",
      body: "Every run gets a score, so you see what passed, what failed and why.",
    },
    {
      title: "One place for your team",
      body: "Projects, reports and rules your whole company can manage together.",
    },
  ],
} as const;

export const HOME_MARKETING_SECURITY_COPY = {
  title: "Your files and secrets stay on your computer.",
  body: `Built for everyday company work, with the assistants you already have. ${AGENT_WITCH_PRODUCT_NAME} Local runs on your computer. Files, tokens and run history are not uploaded.`,
} as const;

export const HOME_MARKETING_CTA_BAND_COPY = {
  title: "Stop repeating yourself to your AI.",
} as const;

/** Kept empty: no weak or jargon footnote on the landing hero area. */
export const HOME_MARKETING_HONESTY_FOOTNOTE = "";
