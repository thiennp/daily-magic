import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const whatPhoneCanDoAlone: ShowcaseArticle = {
  slug: "what-phone-can-do-alone",
  title: "What your phone can do without your Mac",
  subtitle: "Library, copy prompt, team dispatch — honest limits included.",
  category: "Common questions",
  supportLevel: "partial",
  readMinutes: 4,
  whatYouNeed: [
    "Mobile browser on the Agent Witch app",
    "To send: browser connected to the app + a Mac online to run the job",
    "For team dispatch: a teammate's Mac as executor",
  ],
  tryNext: { label: "Open library on mobile demo", href: "/demo/library" },
  sections: [
    {
      paragraphs: [
        "Mobile-first does not mean your phone runs Claude on your laptop files while you are on the train. It means the app is usable on a small screen — and you can prep, copy, or ask a teammate's Mac to run work when yours is closed.",
      ],
    },
    {
      heading: "Works well on phone alone",
      bullets: [
        "Browse library and marketplace playbooks",
        "Copy a prompt to paste elsewhere",
        "Save a marketplace capability to your library",
        "Queue a task for when your Mac reconnects",
        "Request a job via team dispatch to someone online",
        "Review history and run again when executor is available",
      ],
    },
    {
      heading: "Needs a Mac online somewhere",
      bullets: [
        "Send to your own Mac — it must be connected and awake",
        "Tasks that read local folders or repos",
        "Live progress while the job runs",
      ],
    },
    {
      heading: "No push notifications yet",
      paragraphs: [
        "Queued tasks send when your browser reconnects — not when your Mac wakes up in your pocket. Copy prompt or draft the form and come back, or use team dispatch when a colleague's Mac is available.",
      ],
    },
  ],
};

export default whatPhoneCanDoAlone;
