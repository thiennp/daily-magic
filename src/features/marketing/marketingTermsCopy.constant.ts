import type { MarketingLegalDoc } from "@/features/marketing/marketingLegalDoc.type";

export const MARKETING_TERMS_DOC: MarketingLegalDoc = {
  key: "terms",
  path: "/terms",
  title: "Terms",
  lead: "The simple rules for using AgentWitch.",
  sections: [
    {
      heading: "Using AgentWitch",
      body: "You can use AgentWitch if you are old enough to enter a contract where you live. Keep your sign-in details safe. You are responsible for what happens under your account.",
    },
    {
      heading: "Your work",
      body: "What you create is yours. You give us only the permission needed to run the service for you and to show what you choose to publish.",
    },
    {
      heading: "Be a good neighbour",
      items: [
        "No spam, scams or asking people for passwords.",
        "No harmful or illegal content.",
        "No copying other people’s listings as your own.",
        "No attempts to break or overload the service.",
      ],
    },
    {
      heading: "Marketplace and Showcases",
      body: "Items are reviewed before they appear. We may remove items that break these terms. You can unpublish your own items at any time.",
    },
    {
      heading: "Bots and tasks",
      body: "Bots work on your computers with the permissions you give them. Review what a bot can do before you allow it. You are responsible for tasks you start.",
    },
    {
      heading: "Plans and billing",
      body: "Free plans stay free. Paid plans renew until you cancel, and you keep access until the end of the period you paid for.",
    },
    {
      heading: "Suspension",
      body: "We may suspend an account that breaks these terms. We tell you why and how to appeal.",
    },
    {
      heading: "Changes",
      body: "If we change these terms in a way that matters, we tell you before it applies.",
    },
    {
      heading: "Contact",
      body: "Questions? Write to",
      mailto: "legal@agentwitch.com",
    },
  ],
};
