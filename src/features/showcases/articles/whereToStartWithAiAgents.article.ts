import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const whereToStartWithAiAgents: ShowcaseArticle = {
  slug: "where-to-start-with-ai-agents",
  title: "You love AI. You're not sure where to start.",
  subtitle:
    "A plain map from ChatGPT tabs to saved playbooks and real tasks on your Mac.",
  category: "Start here",
  supportLevel: "partial",
  readMinutes: 4,
  whatYouNeed: [
    "Curiosity — no technical background required",
    "A free account to explore the demo",
    "A Mac with Agent Witch when you're ready to run real jobs",
  ],
  tryNext: { label: "Browse the demo library", href: "/demo/library" },
  sections: [
    {
      paragraphs: [
        "You have used ChatGPT. You have bookmarked prompts. Someone said agents are the future, and you nodded — then went back to copy-pasting the same message on Monday.",
        "That gap is normal. Chat is easy. Repeatable work on a real computer, with your team, is harder — and that is exactly what Agent Witch is for.",
      ],
    },
    {
      heading: "What most people try first",
      bullets: [
        "One long ChatGPT thread per project",
        "Prompts saved in Notes or Slack",
        "Asking a coworker: can you run this on your machine?",
      ],
    },
    {
      heading: "A simpler mental model",
      paragraphs: [
        "Think in three layers: save how you ask (library), send the job (to your Mac or a teammate), and see what happened (job history). You do not need to memorize prompts or lose work in chat scrollback.",
      ],
    },
    {
      heading: "How we help",
      bullets: [
        "My library — store playbooks and tap Use instead of retyping",
        "Send a task — dispatch to your Mac or someone on your team",
        "Job history — every run logged with who asked and what came back",
      ],
    },
  ],
};

export default whereToStartWithAiAgents;
