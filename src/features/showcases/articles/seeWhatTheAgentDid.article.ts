import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const seeWhatTheAgentDid: ShowcaseArticle = {
  slug: "see-what-the-agent-did",
  title: "See what the agent did — not just a chat reply",
  subtitle:
    "Who asked, who ran it, what came back, and when — in this browser.",
  category: "Job history",
  supportLevel: "partial",
  readMinutes: 3,
  whatYouNeed: [
    "At least one job sent through Agent Witch",
    "The same browser where you sent or watched the run",
  ],
  tryNext: {
    label: "Open Job history",
    href: "/reports",
  },
  sections: [
    {
      paragraphs: [
        "Chat scrolls away. Slack threads sink. Job history keeps a run log for work you dispatch — especially useful when a teammate runs a task on their Mac and you both need the same record of what was asked.",
      ],
    },
    {
      heading: "Each job records",
      bullets: [
        "Requester and executor when the run was dispatched",
        "Full prompt that was sent",
        "Status: pending approval, running, completed, failed",
        "Result output when the Mac finishes",
      ],
    },
    {
      heading: "How Job history helps you",
      paragraphs: [
        "Job history lives in your browser with live session data—a practical ops log for this machine. Use it to rerun work and review what happened on your sessions.",
      ],
    },
  ],
};

export default seeWhatTheAgentDid;
