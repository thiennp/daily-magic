import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const phoneAsksCoworkerMacRuns: ShowcaseArticle = {
  slug: "phone-asks-coworker-mac-runs",
  title: "Your phone asks. Your coworker's Mac runs it.",
  subtitle: "The best mobile story: you request, they execute.",
  category: "Team dispatch",
  supportLevel: "partial",
  readMinutes: 4,
  whatYouNeed: [
    "A group with teammates and published capabilities",
    "Their Mac agent online — not yours",
    "Approval policy if your company requires it",
  ],
  tryNext: { label: "Try team dispatch in demo", href: "/demo/agent" },
  sections: [
    {
      paragraphs: [
        "You do not always have the files. Your coworker does. Team dispatch lets you pick a group, a person, and their assistant or workflow — from your phone — while Claude runs on their Mac.",
      ],
    },
    {
      heading: "Why this fits mobile",
      bullets: [
        "You are the requester — quick form, clear prompt",
        "They are the executor — machine with context",
        "History shows both sides for accountability",
      ],
    },
    {
      heading: "Caveats",
      paragraphs: [
        "Send still needs your browser connected to the app server. If their Mac is asleep, the job waits. Copy prompt remains an option when you only need text, not local files.",
      ],
    },
  ],
};

export default phoneAsksCoworkerMacRuns;
