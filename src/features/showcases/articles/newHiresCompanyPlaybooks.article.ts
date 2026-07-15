import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const newHiresCompanyPlaybooks: ShowcaseArticle = {
  slug: "new-hires-company-playbooks",
  title: "New on the team? Start with company playbooks",
  subtitle: "Onboarding with saved workflows, not tribal chat history.",
  category: "For teams",
  supportLevel: "partial",
  readMinutes: 3,
  whatYouNeed: [
    "Marketplace or group listings with at least a few published playbooks",
    "Permission to save copies to your library",
    "Your own Mac connected when you need to run locally",
  ],
  tryNext: {
    label: "Follow the 15-minute onboard",
    href: "/showcases/onboard-in-15-minutes",
  },
  sections: [
    {
      paragraphs: [
        "New hires should not reverse-engineer prompts from a senior engineer's ChatGPT sidebar. They should open Marketplace or the team directory, fork a playbook, and run the same shaped work on day one.",
      ],
    },
    {
      heading: "Day-one checklist",
      bullets: [
        "Pair your Mac from Home → Your setup",
        "Browse Marketplace — save 2–3 playbooks to library",
        "Run one low-risk task and check Job history",
        "Ask who publishes updates when the process changes",
      ],
    },
    {
      heading: "If the catalog is empty",
      paragraphs: [
        "Ask a champion to finish company-onboard-in-30-minutes first. Even one weekly status and one research template beats blank prompts — an empty Marketplace is worse than no AI tooling at all for trust.",
      ],
    },
  ],
};

export default newHiresCompanyPlaybooks;
