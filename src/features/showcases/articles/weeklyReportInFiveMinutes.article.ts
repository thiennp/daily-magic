import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const weeklyReportInFiveMinutes: ShowcaseArticle = {
  slug: "weekly-report-in-five-minutes",
  title: "Weekly report in five minutes: fill the form, send the job",
  subtitle: "A structured workflow beats a blank prompt box.",
  category: "Workflows",
  supportLevel: "partial",
  readMinutes: 3,
  whatYouNeed: [
    "A workflow playbook (demo: Weekly report workflow)",
    "Mac agent online to send, or copy assembled prompt elsewhere",
    "Publishing new workflows today is API-first — builder UI coming",
  ],
  tryNext: {
    label: "Try the weekly report demo",
    href: "/agent",
  },
  sections: [
    {
      paragraphs: [
        "Instead of writing a novel each Friday, you fill Week of and Highlights. The app assembles the full instruction and sends it to a Mac — yours or a teammate's.",
      ],
    },
    {
      heading: "On mobile",
      paragraphs: [
        "Library → Use playbook → step through fields one screen at a time → send when connected.",
      ],
    },
    {
      heading: "For your team",
      bullets: [
        "Publish once with standard fields",
        "Everyone gets the same structure",
        "Job history shows who ran which week",
      ],
    },
  ],
};

export default weeklyReportInFiveMinutes;
