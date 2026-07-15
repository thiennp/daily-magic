import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const findBestPromptInCompany: ShowcaseArticle = {
  slug: "find-best-prompt-in-company",
  title: "Find the best prompt in your company",
  subtitle: "Browse teammates' playbooks instead of asking in Slack.",
  category: "Marketplace",
  supportLevel: "partial",
  readMinutes: 3,
  whatYouNeed: [
    "Teammates who published capabilities to the marketplace",
    "Company visibility (group or public) on their listings",
    "Note: many listings today link a rules bundle — the catalog grows as teams publish",
  ],
  tryNext: { label: "Browse the demo marketplace", href: "/marketplace" },
  sections: [
    {
      paragraphs: [
        "The best prompt in your company often lives in one person's chat history. Marketplace makes shared playbooks discoverable — name, description, example request, and workflow fields before you commit.",
      ],
    },
    {
      heading: "How to use it",
      bullets: [
        "Open Marketplace and preview a listing",
        "Save to my library — copies the workflow into your account",
        "Install bundle (optional) — imports their rules to your Mac",
        "Use the saved copy from your library",
      ],
    },
    {
      heading: "Empty marketplace?",
      paragraphs: [
        "Someone on your team needs to publish first. Start with one weekly report or research playbook — one good listing is enough for others to fork.",
      ],
    },
  ],
};

export default findBestPromptInCompany;
