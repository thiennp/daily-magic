import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const notASlackReplacement: ShowcaseArticle = {
  slug: "not-a-slack-replacement",
  title: "Agent Witch is not a Slack replacement",
  subtitle: "Keep Slack for chat. Use Agent Witch for repeat AI work.",
  category: "Common questions",
  supportLevel: "full",
  readMinutes: 3,
  whatYouNeed: ["Nothing — this clarifies where Agent Witch fits"],
  tryNext: { label: "See what it does instead", href: "/showcases" },
  sections: [
    {
      paragraphs: [
        "If you are looking for fewer channels, better threads, or async standups, keep Slack. Agent Witch is for when the same AI task happens every week — research briefs, report drafts, folder summaries — and prompts keep getting lost in chat.",
      ],
    },
    {
      heading: "What Slack is great at",
      bullets: [
        "Fast human conversation and decisions",
        "Links, reactions, and informal knowledge",
        "Notifications when people need to respond now",
      ],
    },
    {
      heading: "What Agent Witch adds",
      bullets: [
        "Saved playbooks in a library — not buried in #random",
        "Dispatch to a real Mac with files and tools",
        "Job history — who asked, who ran it, what came back",
      ],
    },
    {
      heading: "Use both",
      paragraphs: [
        'Slack for "can you take this?" Agent Witch for "run the weekly client summary again." Many teams keep Slack and add a playbook layer so AI work is repeatable, not another scrollback search.',
      ],
    },
  ],
};

export default notASlackReplacement;
