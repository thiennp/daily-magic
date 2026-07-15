import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const runAgainWithoutRetyping: ShowcaseArticle = {
  slug: "run-again-without-retyping",
  title: "Run the same task again without retyping",
  subtitle: "Job history becomes your weekly habit button.",
  category: "Job history",
  supportLevel: "full",
  readMinutes: 2,
  whatYouNeed: [
    "At least one completed job in history",
    "Mac agent online if you want to send again (not just view)",
  ],
  tryNext: { label: "Open job history demo", href: "/reports" },
  sections: [
    {
      paragraphs: [
        "Weekly reports, client check-ins, and research sweeps are the same shape every time. Run again pulls the original prompt back into the composer so you edit or send immediately.",
      ],
    },
    {
      heading: "How it works",
      bullets: [
        "Open Job history and find a completed job",
        "Tap Run again on the card or detail page",
        "The task composer opens with the prompt prefilled",
      ],
    },
    {
      heading: "Habit, not novelty",
      paragraphs: [
        "Products stick when repetition is easy. One-tap rerun turns Agent Witch from experiment into the place you go every Monday — not another lost chat thread.",
      ],
    },
  ],
};

export default runAgainWithoutRetyping;
