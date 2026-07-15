import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const seeWhatTheAgentDid: ShowcaseArticle = {
  slug: "see-what-the-agent-did",
  title: "See what the agent did — not just a chat reply",
  subtitle: "Who asked, who ran it, what came back, and when.",
  category: "Job history",
  supportLevel: "full",
  readMinutes: 3,
  whatYouNeed: [
    "Jobs sent through Agent Witch (demo history works without a Mac)",
  ],
  tryNext: {
    label: "View a sample report",
    href: "/reports",
  },
  sections: [
    {
      paragraphs: [
        "Chat scrolls away. Slack threads sink. Job history is an audit trail for AI delegation — especially when teammates run tasks on each other's Macs.",
      ],
    },
    {
      heading: "Each job records",
      bullets: [
        "Requester and executor",
        "Full prompt that was sent",
        "Status: pending approval, running, completed, failed",
        "Result output when the Mac finishes",
      ],
    },
    {
      heading: "Why teams care",
      paragraphs: [
        "Managers see what was asked before approving. Requesters see whether the job finished. Over time you learn which playbooks are worth saving to the library.",
      ],
    },
  ],
};

export default seeWhatTheAgentDid;
