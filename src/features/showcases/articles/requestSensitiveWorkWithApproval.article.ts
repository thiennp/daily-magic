import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const requestSensitiveWorkWithApproval: ShowcaseArticle = {
  slug: "request-sensitive-work-with-approval",
  title: "Request sensitive work on a teammate's Mac — with approval first",
  subtitle:
    "Client drafts, private repos, and finance checks pause until a manager says yes.",
  category: "For teams",
  supportLevel: "full",
  readMinutes: 4,
  whatYouNeed: [
    "Company group with dispatch policy set to approval",
    "Requester and executor both signed in",
    "Executor Mac online after approval",
  ],
  tryNext: {
    label: "Open Companies & rules",
    href: "/admin/groups",
  },
  relatedShowcases: [
    {
      slug: "manager-approves-before-run",
      label: "How manager approval works in practice",
    },
    {
      slug: "human-checkpoints-before-mac-runs",
      label: "Human steps you do before the Mac runs",
    },
  ],
  sections: [
    {
      paragraphs: [
        "You need research on a repo that lives on a senior engineer's laptop — not in a shared cloud drive. Agent Witch lets you request the job from the browser, but your company can require approval before anything runs on someone else's Mac.",
      ],
    },
    {
      heading: "Example scenario",
      bullets: [
        "Junior PM requests: summarize open PRs in ~/projects/client-app",
        "Job sits pending — approver sees the full prompt in Job history",
        "Manager approves → executor's Mac runs Claude locally",
        "Both sides keep a run log in their browsers",
      ],
    },
    {
      heading: "Why teams use this",
      bullets: [
        "Governance without banning self-serve playbooks in Library",
        "Clear executor — not a mystery cloud VM",
        "Works for client-facing drafts and internal repo access",
      ],
    },
    {
      heading: "Honest limits",
      paragraphs: [
        "Approval needs an approver and an online executor Mac. Job history is local-first per browser today — not a company-wide compliance archive yet.",
      ],
    },
  ],
};

export default requestSensitiveWorkWithApproval;
