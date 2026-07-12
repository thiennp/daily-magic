import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const stopCopyPasteEveryMonday: ShowcaseArticle = {
  slug: "stop-copy-paste-every-monday",
  title: "ChatGPT is great. So why do you still copy-paste every Monday?",
  subtitle: "When a saved playbook beats another chat thread.",
  category: "Library",
  supportLevel: "full",
  readMinutes: 3,
  whatYouNeed: [
    "One repeating task (report, triage, research)",
    "Two minutes to save it as a playbook or fork from a teammate",
  ],
  tryNext: {
    label: "See the weekly report workflow",
    href: "/demo/agent?libraryCapabilityId=cap-demo-weekly-report",
  },
  sections: [
    {
      paragraphs: [
        "ChatGPT is perfect for one-off questions. It is weak for the fifth time you ask the same shaped question with different names and dates. That is when a library entry pays off.",
      ],
    },
    {
      heading: "The Monday problem",
      bullets: [
        "You hunt for last week's chat",
        "You retype context the model already saw",
        "Teammates cannot reuse your wording",
      ],
    },
    {
      heading: "The playbook fix",
      paragraphs: [
        "Save the prompt or workflow once. Next Monday: Use playbook, fill fields, send or copy. Run again from job history if last week is close enough.",
      ],
    },
  ],
};

export default stopCopyPasteEveryMonday;
