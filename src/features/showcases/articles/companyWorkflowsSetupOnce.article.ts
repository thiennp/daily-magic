import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const companyWorkflowsSetupOnce: ShowcaseArticle = {
  slug: "company-workflows-setup-once",
  title: "Set up AI workflows once for the whole company",
  subtitle: "Standard fields and prompts so everyone runs work the same way.",
  category: "For teams",
  supportLevel: "partial",
  readMinutes: 4,
  whatYouNeed: [
    "A champion who can create a workflow in Library and publish it",
    "Workflow fields defined: labels, types, required flags",
    "Teammates who save or use published playbooks from Marketplace or directory",
  ],
  tryNext: { label: "Open Library", href: "/library" },
  relatedShowcases: [
    {
      slug: "human-checkpoints-before-mac-runs",
      label: "Add human checkpoints to a company workflow",
    },
    {
      slug: "new-hires-company-playbooks",
      label: "Onboard new hires with shared playbooks",
    },
  ],
  sections: [
    {
      paragraphs: [
        "Compliance, quality, and speed all improve when the same weekly report uses the same inputs — not whichever prompt someone remembers from Tuesday's chat.",
      ],
    },
    {
      heading: "The company pattern",
      bullets: [
        "Ops or lead creates a workflow in Library (fields + prompt template)",
        "Publish so the group can see it in Marketplace or the team directory",
        "Requesters fill the form; executor Mac runs the assembled prompt",
      ],
    },
    {
      heading: "Honest limit today",
      paragraphs: [
        "Creating and editing workflows in Library works for the common case. Complex publish and visibility settings may still need a careful first pass — start with one weekly status workflow, then grow the catalog.",
      ],
    },
  ],
};

export default companyWorkflowsSetupOnce;
