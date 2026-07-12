import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const stopMemorizingPrompts: ShowcaseArticle = {
  slug: "stop-memorizing-prompts",
  title: "You don't need to remember prompts anymore",
  subtitle: "Save once in your library. Use or copy every time.",
  category: "Library",
  supportLevel: "full",
  readMinutes: 3,
  whatYouNeed: [
    "A signed-in account",
    "At least one saved playbook (or save one from Marketplace)",
  ],
  tryNext: { label: "Open your library", href: "/demo/library" },
  sections: [
    {
      paragraphs: [
        "The best prompt you wrote last month is probably buried in a chat thread. The library is your team's prompt memory — names, examples, and workflow fields in one place.",
      ],
    },
    {
      heading: "What you can do today",
      bullets: [
        "Use playbook — opens the task composer with the template ready",
        "Copy prompt — paste into ChatGPT or Gemini on your phone",
        "Save from Marketplace — fork a teammate's workflow into your account",
      ],
    },
    {
      heading: "Why it beats bookmarks",
      paragraphs: [
        "Bookmarks are static. A playbook can be a workflow with fields (week of, client name, highlights) so you fill blanks instead of rewriting the whole instruction.",
      ],
    },
  ],
};

export default stopMemorizingPrompts;
