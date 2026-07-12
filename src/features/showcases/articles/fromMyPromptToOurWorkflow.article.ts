import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const fromMyPromptToOurWorkflow: ShowcaseArticle = {
  slug: "from-my-prompt-to-our-workflow",
  title: 'From "my prompt" to "our workflow"',
  subtitle: "How champions turn a personal win into a team playbook.",
  category: "For teams",
  supportLevel: "partial",
  readMinutes: 4,
  whatYouNeed: [
    "A prompt that already works for you personally",
    "Willingness to publish a capability for your group",
    "Workflow fields if the task has repeatable inputs",
  ],
  tryNext: { label: "View what teammates can request", href: "/demo/home" },
  sections: [
    {
      paragraphs: [
        "You cracked a great research or reporting prompt. The next step is not posting it in Slack — it is publishing so others pick your assistant from the directory or fork it to their library.",
      ],
    },
    {
      heading: "The champion path",
      bullets: [
        "Start solo in library — prove the prompt on your Mac",
        "Add structure — workflow fields for dates, names, scope",
        "Publish with group visibility",
        "Teammates use or save a copy; you keep improving from feedback",
      ],
    },
    {
      heading: "Reality check",
      paragraphs: [
        "Publishing UI for complex workflows is still maturing. Champions may need admin help for first publish — but consuming and forking is easy for everyone else.",
      ],
    },
  ],
};

export default fromMyPromptToOurWorkflow;
