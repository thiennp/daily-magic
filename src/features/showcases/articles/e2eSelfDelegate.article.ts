import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const e2eSelfDelegate: ShowcaseArticle = {
  slug: "e2e-self-delegate",
  title: "E2E: Send a task to your own Mac",
  subtitle:
    "Pair once, open Send a task, run Claude on this computer, and find it in Job history.",
  category: "E2E verified",
  supportLevel: "full",
  readMinutes: 3,
  whatYouNeed: [
    "Signed-in test*@agentwitch.com account",
    "agent-witch profile for that email on ws://localhost:3000",
    "Production custom server (`npm run start`) so WebSocket upgrades work",
  ],
  tryNext: { label: "Send a task", href: "/?sendTask=1" },
  sections: [
    {
      bullets: [
        "Home auto-links the local Agent Witch profile to Your Devices",
        "Custom task + Claude opens a live terminal on your Mac",
        "Send feedback dispatches a real agent run (wait for /api/agent-runs/dispatch)",
        "The same prompt appears in Job history for that browser session",
      ],
      image: {
        src: "/showcases/e2e/self-delegate-live-terminal.png",
        alt: "Send a task modal with Claude live terminal running a self-delegate prompt",
        caption: "Self-delegate: Claude running on the paired Mac.",
      },
    },
    {
      bullets: [
        "Job history lists requester and executor as the same account",
        "Status moves to completed when the Mac finishes the run",
      ],
      image: {
        src: "/showcases/e2e/self-delegate-job-history.png",
        alt: "Job history showing a completed self-delegate run",
        caption: "Completed self-delegate run in Job history.",
      },
    },
  ],
};

export default e2eSelfDelegate;
