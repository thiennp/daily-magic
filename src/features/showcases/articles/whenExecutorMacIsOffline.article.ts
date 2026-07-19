import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const whenExecutorMacIsOffline: ShowcaseArticle = {
  slug: "when-executor-mac-is-offline",
  title: "What happens when the Mac is asleep",
  subtitle:
    "Work runs on a real Mac you trust—here is how to keep jobs moving while it rests.",
  category: "Common questions",
  supportLevel: "partial",
  readMinutes: 3,
  whatYouNeed: [
    "A Mac connected with Agent Witch",
    "Browser tab connected to the app to send a job",
  ],
  tryNext: {
    label: "Read team dispatch story",
    href: "/showcases/phone-asks-coworker-mac-runs",
  },
  sections: [
    {
      paragraphs: [
        "Agent Witch runs on a real Mac, not a shared server farm. That keeps local files and trust close to you—and jobs start when the executor Mac is awake and connected.",
      ],
    },
    {
      heading: "What you will see",
      bullets: [
        "Send waits until your browser is connected",
        "Jobs need Agent Witch running on the target Mac",
        "Approval flows continue once an approver and executor are available",
      ],
    },
    {
      heading: "Keep work moving",
      bullets: [
        "Copy prompt from library — run later on any machine with Claude",
        "Pick another teammate as executor via team dispatch",
        "Run again from history once the Mac is back online",
      ],
    },
    {
      heading: "Always-on setups",
      paragraphs: [
        "For recurring jobs, keep a Mac awake or schedule automations on a dedicated machine. Check Job history when you want the finished output.",
      ],
    },
    {
      heading: "What you can do now",
      bullets: [
        "Queue a task from the agent page when disconnected",
        "Queued tasks send automatically when your browser reconnects",
        "Copy prompt remains available for ChatGPT or Gemini",
      ],
    },
  ],
};

export default whenExecutorMacIsOffline;
