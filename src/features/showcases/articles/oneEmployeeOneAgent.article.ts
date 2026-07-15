import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const oneEmployeeOneAgent: ShowcaseArticle = {
  slug: "one-employee-one-agent",
  title: "One employee, one agent — how that helps your company",
  subtitle:
    "Each person's Mac is their AI workstation. The company shares the recipes.",
  category: "For teams",
  supportLevel: "partial",
  readMinutes: 4,
  whatYouNeed: [
    "Each teammate pairs their own Mac with Agent Witch",
    "Published capabilities per person (assistants or workflows)",
    "Groups so colleagues can find who offers what",
  ],
  tryNext: { label: "Explore demo home dashboard", href: "/" },
  sections: [
    {
      paragraphs: [
        "There is no single company bot running in a mystery cloud. Each employee who connects a Mac has an agent on that machine — with their files, tools, and rules. The company value is shared playbooks, dispatch, and history across people.",
      ],
    },
    {
      heading: "What this model gives you",
      bullets: [
        "Local context — runs where the files already live",
        "Clear ownership — Jordan's research assistant vs Alex's weekly report",
        "Audit trail — requester, executor, prompt, result in job history",
      ],
    },
    {
      heading: "What you still coordinate",
      paragraphs: [
        "Someone must publish playbooks and keep agents online when they are the executor. The system does not replace management — it makes delegation legible.",
      ],
    },
  ],
};

export default oneEmployeeOneAgent;
