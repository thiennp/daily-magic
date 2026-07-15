import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const companyWorkflowsSetupOnce: ShowcaseArticle = {
  slug: "company-workflows-setup-once",
  title: "Set up AI workflows once for the whole company",
  subtitle: "Standard fields and prompts so everyone runs work the same way.",
  category: "For teams",
  supportLevel: "partial",
  readMinutes: 4,
  whatYouNeed: [
    "A champion who publishes capabilities (today often via API — visual builder coming)",
    "Workflow fields defined: labels, types, required flags",
    "Teammates who save or use published playbooks from Marketplace or directory",
  ],
  tryNext: { label: "See a workflow in the demo", href: "/library" },
  sections: [
    {
      paragraphs: [
        "Compliance, quality, and speed all improve when the same weekly report uses the same inputs — not whichever prompt someone remembers from Tuesday's chat.",
      ],
    },
    {
      heading: "The company pattern",
      bullets: [
        "Ops or lead publishes a workflow capability",
        "Fields encode what must be collected every time",
        "Requesters fill the form; executor Mac runs the assembled prompt",
      ],
    },
    {
      heading: "Honest limit today",
      paragraphs: [
        "Creating workflows without code is still limited — power users or admins may publish via API. Reading, forking, and running published workflows is fully supported in the app.",
      ],
    },
  ],
};

export default companyWorkflowsSetupOnce;
