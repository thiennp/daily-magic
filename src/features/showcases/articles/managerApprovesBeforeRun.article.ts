import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const managerApprovesBeforeRun: ShowcaseArticle = {
  slug: "manager-approves-before-run",
  title: "Your manager can say yes before anything runs",
  subtitle: "Approval dispatch for sensitive AI tasks on a teammate's Mac.",
  category: "For teams",
  supportLevel: "full",
  readMinutes: 3,
  whatYouNeed: [
    "Company group with dispatch policy set to approval",
    "An executor Mac online after approval",
    "Requester sends through team dispatch — not ad-hoc chat",
  ],
  tryNext: {
    label: "Open Job history",
    href: "/reports",
  },
  relatedShowcases: [
    {
      slug: "request-sensitive-work-with-approval",
      label: "Request sensitive work with approval first",
    },
    {
      slug: "human-checkpoints-before-mac-runs",
      label: "Human checkpoints in the browser checklist",
    },
  ],
  sections: [
    {
      paragraphs: [
        "Client-facing drafts, finance checks, and anything that touches private repos benefit from a pause: request logged, approver notified, run starts only after yes.",
      ],
    },
    {
      heading: "How it works",
      bullets: [
        "Admin sets group policy to approval",
        "Requester sends task to teammate's capability",
        "Job sits in pending until approved or denied",
        "Completed jobs stay in Job history for review in the browsers that watched the run",
      ],
    },
    {
      heading: "Good fit when",
      paragraphs: [
        "You trust your team with AI but want a yes/no gate before work hits someone else's machine. It is governance without blocking self-serve playbooks in the library.",
      ],
    },
  ],
};

export default managerApprovesBeforeRun;
