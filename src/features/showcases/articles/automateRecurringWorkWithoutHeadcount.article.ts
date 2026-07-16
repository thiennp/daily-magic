import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const automateRecurringWorkWithoutHeadcount: ShowcaseArticle = {
  slug: "automate-recurring-work-without-headcount",
  title: "Automate recurring work without hiring another coordinator",
  subtitle:
    "Weekly reports, standups, and repeat research on Macs you already own—less copy-paste, fewer chat threads to chase.",
  category: "For leadership",
  supportLevel: "full",
  readMinutes: 4,
  whatYouNeed: [
    "One repeating job your team already does in chat (status, triage, research)",
    "A champion who can save it as a playbook and optional schedule",
    "Honest expectation: this augments people; it does not replace judgment calls",
  ],
  tryNext: {
    label: "See how automations work",
    href: "/showcases/automate-for-yourself-or-your-team",
  },
  relatedShowcases: [
    {
      slug: "stop-copy-paste-every-monday",
      label: "Why saved playbooks beat another ChatGPT thread",
    },
    {
      slug: "weekly-report-in-five-minutes",
      label: "Weekly report from a form, not a blank prompt",
    },
    {
      slug: "company-onboard-in-30-minutes",
      label: "Roll out playbooks before a company-wide invite",
    },
  ],
  sections: [
    {
      paragraphs: [
        "Most teams already pay for AI in tabs and subscriptions. The hidden cost is coordination: someone retypes context every Monday, hunts last week's chat, and forwards screenshots. Agent Witch turns repeat work into saved playbooks your Mac runs on a schedule—so the same job costs minutes, not another headcount line item.",
      ],
    },
    {
      heading: "What changes for the business",
      bullets: [
        "Repeat outputs use the same fields every time—quality and compliance improve",
        "Champions publish once; requesters fill a short form instead of writing novels",
        "Runs stay in job history so you can spot what was sent and what came back",
        "Work stays on company Macs you control—not another opaque cloud black box",
      ],
    },
    {
      heading: "A realistic first win",
      paragraphs: [
        "Pick one low-risk weekly ritual (team status, changelog draft, competitor scan). Save it as a playbook, run it once manually, then schedule it. If it saves even two hours a month across the team, you have a story for the next budget conversation.",
      ],
    },
    {
      heading: "What to tell your champion",
      bullets: [
        "Start from onboard in 15 minutes—pair one Mac, run the sample workflow",
        "Then open Automations and schedule the same playbook",
        "Share the automate guide with ops leads—not the WebSocket install doc",
      ],
    },
  ],
};

export default automateRecurringWorkWithoutHeadcount;
