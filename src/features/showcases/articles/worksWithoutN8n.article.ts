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
    "A connected Mac with Agent Witch",
    "A published workflow capability (form fields + assembled prompt)",
    "No n8n account or webhook setup",
  ],
  tryNext: { label: "Open Library", href: "/library" },
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
      heading: "How Agent Witch stays simple",
      paragraphs: [
        "Library workflows are a clear form: fields assemble into a prompt, then your Mac runs the job. Keep n8n or Zapier for SaaS glue when you need it—use Agent Witch for Mac-side AI work your team can request from the browser.",
      ],
    },
    {
      heading: "Good starting point",
      paragraphs: [
        "Pick one recurring task, publish it as a workflow, save it to the library. You get structure without learning a node canvas. Pair with n8n later only if you need cross-service automation beyond Mac-side AI work.",
      ],
    },
  ],
};

export default worksWithoutN8n;
