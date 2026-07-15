import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const firstAgentTaskIn5Minutes: ShowcaseArticle = {
  slug: "first-agent-task-in-5-minutes",
  title: "Your first agent task in 5 minutes",
  subtitle: "Set up your Mac, send one job, and see it in history.",
  category: "Start here",
  supportLevel: "full",
  readMinutes: 3,
  whatYouNeed: [
    "A Mac with Agent Witch set up and ready to run jobs",
    "Sign-in so the browser can send work to your Mac live",
    "A short task description — one sentence is enough",
  ],
  tryNext: { label: "Open Send a task", href: "/?sendTask=1" },
  sections: [
    {
      paragraphs: [
        "Your first win is small: describe a task, send it to your Mac, see a record of the job. No marketplace tour required — just proof that the loop works.",
      ],
    },
    {
      heading: "Step by step",
      bullets: [
        "Sign in and open Home → Your setup to add your Mac as a worker",
        "Go to Send a task and write what you want done",
        "Press send — your Mac runs the agent with your local context",
        "Open Job history in this browser to see status and output",
      ],
    },
    {
      heading: "If send is disabled",
      paragraphs: [
        "The button stays off until this page is connected and your Mac is online. That is intentional: we run on real machines, not a faceless cloud tab.",
      ],
    },
  ],
};

export default firstAgentTaskIn5Minutes;
