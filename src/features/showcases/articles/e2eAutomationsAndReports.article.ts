import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const e2eAutomationsAndReports: ShowcaseArticle = {
  slug: "e2e-automations-and-reports",
  title: "E2E: Automations and Job history",
  subtitle: "Schedule library playbooks and review runs.",
  category: "E2E verified",
  supportLevel: "full",
  readMinutes: 3,
  whatYouNeed: ["Library playbook", "Paired Mac"],
  tryNext: { label: "Open Job history", href: "/reports" },
  sections: [
    {
      heading: "Automations",
      image: {
        src: "/showcases/e2e/05-automations.png",
        alt: "Automations page",
        caption: "Create and list scheduled automations.",
      },
    },
    {
      heading: "Job history",
      image: {
        src: "/showcases/e2e/06-reports.png",
        alt: "Job history page",
        caption: "Past agent runs and status.",
      },
    },
  ],
};

export default e2eAutomationsAndReports;
