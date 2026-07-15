import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const saveTeammateWorkflowOneTap: ShowcaseArticle = {
  slug: "save-teammate-workflow-one-tap",
  title: "Save a teammate's workflow in one tap",
  subtitle:
    "Fork their playbook into your library — webhook and secrets stay separate.",
  category: "Marketplace",
  supportLevel: "full",
  readMinutes: 3,
  whatYouNeed: [
    "Access to a published listing you can view (group or public)",
    "Your own account — saved copy is private draft by default",
  ],
  tryNext: { label: "Open Marketplace", href: "/marketplace" },
  sections: [
    {
      paragraphs: [
        "You liked Jordan's competitor scan or Sam's weekly report workflow. Save to my library copies the name, description, example request, and workflow fields into your account as a private draft.",
      ],
    },
    {
      heading: "What gets copied",
      bullets: [
        "Playbook title (with “copy” suffix)",
        "Workflow field definitions",
        "Example request text",
        "Provenance — marked as saved from teammate",
      ],
    },
    {
      heading: "What does not",
      paragraphs: [
        "Their Mac, their rules bundle, and their private setup. You get the recipe; you run it on your machine or edit before publishing to your team.",
      ],
    },
  ],
};

export default saveTeammateWorkflowOneTap;
