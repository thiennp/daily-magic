import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const manageCompanyAgents: ShowcaseArticle = {
  slug: "manage-company-agents",
  title: "Manage company agents in one place",
  subtitle: "Groups, offerings, and visibility — light admin, not a full SOC.",
  category: "For teams",
  supportLevel: "partial",
  readMinutes: 3,
  whatYouNeed: [
    "Admin access to company groups and members",
    "Teammates who publish capabilities",
    "Patience — this is directory + policy, not remote desktop for every Mac",
  ],
  tryNext: { label: "Open demo company rules", href: "/demo/admin/groups" },
  sections: [
    {
      paragraphs: [
        "You need to know who can request what, whether approval is required, and which assistants are published — without a spreadsheet of who has Claude on their laptop.",
      ],
    },
    {
      heading: "What admins can do today",
      bullets: [
        "Company groups and membership",
        "Dispatch policy: open vs approval required",
        "See published offerings per teammate on Home",
      ],
    },
    {
      heading: "What is not a full agent fleet console yet",
      paragraphs: [
        "You cannot remotely install or reboot every Mac from one pane. Each person connects their own Mac. Management is about rules, visibility, and shared catalog — not MDM for AI.",
      ],
    },
  ],
};

export default manageCompanyAgents;
