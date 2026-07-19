import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const manageCompanyAgents: ShowcaseArticle = {
  slug: "manage-company-agents",
  title: "Manage company agents in one place",
  subtitle:
    "Groups, offerings, and visibility—clear ownership without a heavy console.",
  category: "For teams",
  supportLevel: "partial",
  readMinutes: 3,
  whatYouNeed: [
    "Admin access to company groups and members",
    "Teammates who publish capabilities",
    "Champions who connect their own Macs",
  ],
  tryNext: { label: "Open Companies & rules", href: "/admin/groups" },
  sections: [
    {
      paragraphs: [
        "You need to know who can request what, whether approval is required, and which assistants are published — without a spreadsheet of who has Claude on their laptop.",
      ],
    },
    {
      heading: "What admins can do",
      bullets: [
        "Company groups and membership",
        "Dispatch policy: open vs approval required",
        "See published offerings per teammate on Home",
      ],
    },
    {
      heading: "How ownership works",
      paragraphs: [
        "Each person connects their own Mac. Admins set rules, visibility, and the shared catalog so everyone knows who can run what—and who owns the machine that does the work.",
      ],
    },
  ],
};

export default manageCompanyAgents;
