import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const firstAgentTaskIn5Minutes: ShowcaseArticle = {
  slug: "first-agent-task-in-5-minutes",
  title: "Your first agent task in 5 minutes",
  subtitle: "Connect your Mac, send one job, and see it in history.",
  category: "Start here",
  supportLevel: "partial",
  readMinutes: 3,
  whatYouNeed: [
    "A Mac with Agent Witch installed and connected",
    "The app on a server that can talk to your Mac live (not plain serverless)",
    "A short task description — one sentence is enough",
  ],
  tryNext: { label: "Try the demo task composer", href: "/agent" },
  sections: [
    {
      paragraphs: [
        "Your first win is small: describe a task, send it to your Mac, see a record of the job. No workflow builder, no marketplace — just proof that the loop works.",
      ],
    },
    {
      heading: "Step by step",
      bullets: [
        "Sign in and open Home → Your Devices to connect your Mac",
        "Go to Send a task and write what you want done",
        "Press send — your Mac runs Claude with your local context",
        "Open Job history to see status and output",
      ],
    },
    {
      heading: "If send is disabled",
      paragraphs: [
        "The button stays off until this page is connected to the app and your Mac is online. That is intentional: we run on real machines, not a faceless cloud tab.",
      ],
    },
  ],
};

export default firstAgentTaskIn5Minutes;
