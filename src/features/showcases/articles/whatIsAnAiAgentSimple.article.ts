import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const whatIsAnAiAgentSimple: ShowcaseArticle = {
  slug: "what-is-an-ai-agent-simple",
  title: '"AI agent" sounds complicated. Here\'s the simple version.',
  subtitle: "Your computer + a saved way of working + you stay in control.",
  category: "Start here",
  supportLevel: "full",
  readMinutes: 3,
  whatYouNeed: ["Nothing to install for this article — just read"],
  tryNext: { label: "See real examples", href: "/showcases" },
  sections: [
    {
      paragraphs: [
        "An agent is not magic and not a replacement for your judgment. In Agent Witch it means: AI runs on a real Mac, with a prompt or workflow you chose, and a log of what happened.",
      ],
    },
    {
      heading: "Three parts",
      bullets: [
        "Executor — usually someone's Mac with files and tools",
        "Playbook — the prompt or form you saved in the library",
        "Dispatch — you (or a teammate) asked for the job from the browser",
      ],
    },
    {
      heading: "Not the same as chat",
      paragraphs: [
        "Chat answers in a window. An agent task is work dispatched to a machine — summarize this folder, draft from these inputs, research with my local notes. History matters because work repeats.",
      ],
    },
  ],
};

export default whatIsAnAiAgentSimple;
