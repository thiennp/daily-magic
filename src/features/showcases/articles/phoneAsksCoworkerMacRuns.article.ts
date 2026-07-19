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
  tryNext: { label: "Open Send a task", href: "/?sendTask=1" },
  relatedShowcases: [
    {
      slug: "control-mac-from-phone",
      label: "Control AI on your Mac from your phone",
    },
    {
      slug: "what-phone-can-do-alone",
      label: "What your phone can do when your Mac is away",
    },
  ],
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
      heading: "What makes the send smooth",
      paragraphs: [
        "Keep your browser connected while you send. Their Mac should be awake to start the job. Prefer Copy prompt when you only need text, not local files on their machine.",
      ],
    },
  ],
};

export default phoneAsksCoworkerMacRuns;
