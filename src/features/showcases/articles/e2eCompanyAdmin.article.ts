import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const e2eCompanyAdmin: ShowcaseArticle = {
  slug: "e2e-company-admin",
  title: "E2E: Create company and dispatch rules",
  subtitle: "Cold-start a company group, invite members, set dispatch policy.",
  category: "E2E verified",
  supportLevel: "full",
  readMinutes: 4,
  whatYouNeed: ["Fresh test-admin-*@agentwitch.com account"],
  tryNext: { label: "Open Companies & rules", href: "/admin/groups" },
  sections: [
    {
      bullets: [
        "Create company from empty state",
        "Invite test-member-* colleagues",
        "Set Open vs Approval dispatch policy",
      ],
      image: {
        src: "/showcases/e2e/07-admin-companies.png",
        alt: "Companies and rules admin page",
        caption: "Company creation and rules E2E scenario.",
      },
    },
  ],
};

export default e2eCompanyAdmin;
