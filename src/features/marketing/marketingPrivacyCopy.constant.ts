import type { MarketingLegalDoc } from "@/features/marketing/marketingLegalDoc.type";

export const MARKETING_PRIVACY_DOC: MarketingLegalDoc = {
  key: "privacy",
  path: "/privacy",
  title: "Privacy",
  lead: "What AgentWitch keeps, what stays on your computer, and the choices you have.",
  sections: [
    {
      heading: "Your work stays with you",
      body: "Task history, files and results live on your own computers. AgentWitch does not store them on its servers, and the web app only shows a notice where history would appear.",
    },
    {
      heading: "What we keep",
      items: [
        "Your account: name, email and sign-in details.",
        "Your projects: names, members and which computers are connected.",
        "Items you publish to the Marketplace or Showcases.",
        "Basic usage counts so we can keep the service running.",
      ],
    },
    {
      heading: "What we never do",
      items: [
        "We do not sell your data.",
        "We do not read your task history.",
        "We do not use your work to train models.",
      ],
    },
    {
      heading: "Who can see what",
      body: "People in a project see its name, members and bots. Anything you publish is public. Admins see account details only to keep people safe and the service healthy, and every admin change is logged.",
    },
    {
      heading: "Your choices",
      items: [
        "Download your account details at any time.",
        "Leave a project whenever you like.",
        "Delete your account and everything we keep about it.",
      ],
    },
    {
      heading: "Deleting your account",
      body: "Deleting removes your account, projects you own and published items. Files on your computers are not touched. This cannot be undone.",
    },
    {
      heading: "Contact",
      body: "Questions about privacy? Write to",
      mailto: "privacy@agentwitch.com",
    },
  ],
};
