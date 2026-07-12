import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const whenExecutorMacIsOffline: ShowcaseArticle = {
  slug: "when-executor-mac-is-offline",
  title: "What happens when the Mac is asleep",
  subtitle: "No magic cloud runner — and no notification when it wakes up yet.",
  category: "Common questions",
  supportLevel: "partial",
  readMinutes: 3,
  whatYouNeed: [
    "An executor Mac paired with Agent Witch",
    "Browser tab connected (WebSocket) to send a job",
  ],
  tryNext: {
    label: "Read team dispatch story",
    href: "/showcases/phone-asks-coworker-mac-runs",
  },
  sections: [
    {
      paragraphs: [
        "Agent Witch runs on a real Mac, not a shared server farm. That is a feature for local files and trust — and it means send fails or waits when the executor is offline, closed, or asleep.",
      ],
    },
    {
      heading: "What you will see",
      bullets: [
        "Send disabled or blocked when your browser is not connected",
        "Jobs need the target Mac's agent client running",
        "Approval flows pause until an approver and executor are available",
      ],
    },
    {
      heading: "Workarounds today",
      bullets: [
        "Copy prompt from library — run later on any machine with Claude",
        "Pick another teammate as executor via team dispatch",
        "Run again from history once the Mac is back online",
      ],
    },
    {
      heading: "What is not built yet",
      paragraphs: [
        "There is no push notification when a run completes. If you need always-on automation, pair Agent Witch with tooling that keeps a machine awake or use scheduled jobs on a dedicated Mac.",
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
