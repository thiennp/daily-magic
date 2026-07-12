import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const worksWithoutN8n: ShowcaseArticle = {
  slug: "works-without-n8n",
  title: "You do not need n8n to start",
  subtitle:
    "Workflows here are forms → prompt → your Mac. No node editor required.",
  category: "Common questions",
  supportLevel: "partial",
  readMinutes: 4,
  whatYouNeed: [
    "A paired Mac with Agent Witch",
    "A published workflow capability (form fields + assembled prompt)",
    "No n8n account or webhook setup",
  ],
  tryNext: { label: "Try a workflow in demo", href: "/demo/library" },
  sections: [
    {
      paragraphs: [
        "n8n is excellent for connecting APIs, cron jobs, and multi-step automations across cloud services. Agent Witch targets a different job: repeatable AI tasks on a real Mac, with teammates who can request runs from the browser.",
      ],
    },
    {
      heading: "What a workflow means here",
      bullets: [
        "Form fields you fill in (client name, week, folder)",
        "Those values assemble into a prompt template",
        "Agent Witch runs Claude on the executor Mac",
      ],
    },
    {
      heading: "What we do not do yet",
      paragraphs: [
        "There is no drag-and-drop canvas like n8n. The library page has a simple workflow form (fields → prompt). There is no n8n webhook runner. If you need Zapier-style glue between SaaS tools, n8n may still be the right tool alongside Agent Witch for Mac-side AI work.",
      ],
    },
    {
      heading: "Good starting point",
      paragraphs: [
        "Pick one recurring task, publish it as a workflow, save it to the library. You get structure without learning a node canvas. Add n8n later only if you need cross-service automation Agent Witch does not cover.",
      ],
    },
  ],
};

export default worksWithoutN8n;
