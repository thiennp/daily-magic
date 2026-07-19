import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const weeklyReportInFiveMinutes: ShowcaseArticle = {
  slug: "weekly-report-in-five-minutes",
  title: "Weekly report in five minutes: fill the form, send the job",
  subtitle: "A structured workflow beats a blank prompt box.",
  category: "Workflows",
  supportLevel: "full",
  readMinutes: 3,
  whatYouNeed: [
    'Library playbook "Weekly status update" (seeded after sign-in)',
    "Mac agent online to send, or copy the assembled prompt elsewhere",
  ],
  tryNext: {
    label: "Open Library (weekly status workflow)",
    href: "/library",
  },
  relatedShowcases: [
    {
      slug: "stop-copy-paste-every-monday",
      label: "Stop copy-pasting the same Monday prompt",
    },
    {
      slug: "standup-from-local-branch",
      label: "Standup notes from your local branch",
    },
    {
      slug: "schedule-workflow-on-your-mac",
      label: "Schedule the same workflow on your Mac",
    },
  ],
  sections: [
    {
      paragraphs: [
        'Instead of writing a novel each Friday, you fill "Week of" and "Highlights". The app assembles the full instruction and sends it to a Mac — yours or a teammate\'s.',
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
        "Job history in each person's browser shows their recent runs",
      ],
    },
  ],
};

export default weeklyReportInFiveMinutes;
