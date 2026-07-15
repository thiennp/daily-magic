import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const whereToStartWithAiAgents: ShowcaseArticle = {
  slug: "where-to-start-with-ai-agents",
  title: "You love AI. You're not sure where to start.",
  subtitle:
    "A plain map from ChatGPT tabs to saved playbooks and real tasks on your Mac.",
  category: "Start here",
  supportLevel: "full",
  readMinutes: 4,
  whatYouNeed: [
    "Curiosity — no technical background required",
    "A free account when you are ready to try",
    "A Mac with Agent Witch when you want to run real jobs",
  ],
  tryNext: {
    label: "Follow the honest 15-minute onboard",
    href: "/showcases/onboard-in-15-minutes",
  },
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
        "Job history — a run log in this browser for who asked and what came back",
      ],
    },
  ],
};

export default whereToStartWithAiAgents;
