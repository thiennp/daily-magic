import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const e2eSelfDelegate: ShowcaseArticle = {
  slug: "e2e-self-delegate",
  title: "E2E: Give a task from a project",
  subtitle:
    "Pair once, open a project, give a task to a bot, and find the result in Reports.",
  category: "E2E verified",
  supportLevel: "full",
  readMinutes: 3,
  whatYouNeed: [
    "Signed-in test*@agentwitch.com account",
    "agent-witch profile for that email on ws://localhost:3000",
    "Production custom server (`npm run start`) so WebSocket upgrades work",
  ],
  tryNext: { label: "Open projects", href: "/projects?intent=new-task" },
  sections: [
    {
      bullets: [
        "Home auto-links the local AgentWitch profile to Your Devices",
        "Custom task + Claude opens a live terminal on your computer",
        "Send feedback dispatches a real agent run (wait for /api/agent-runs/dispatch)",
        "The same prompt appears in Reports for that browser session",
      ],
      image: {
        src: "/showcases/e2e/self-delegate-live-terminal.png",
        alt: "Project New task flow with a live run on this computer",
        caption: "Self-delegate: Claude running on the paired computer.",
      },
    },
    {
      bullets: [
        "Reports lists requester and executor as the same account",
        "Status moves to completed when the computer finishes the run",
      ],
      image: {
        src: "/showcases/e2e/self-delegate-job-history.png",
        alt: "Reports showing a completed self-delegate run",
        caption: "Completed self-delegate run in Reports.",
      },
    },
  ],
};

export default e2eSelfDelegate;
