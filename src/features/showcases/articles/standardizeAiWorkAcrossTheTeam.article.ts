import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const standardizeAiWorkAcrossTheTeam: ShowcaseArticle = {
  slug: "standardize-ai-work-across-the-team",
  title: "One playbook for the team—with approval when it matters",
  subtitle:
    "Shared workflows, manager sign-off on sensitive runs, and a catalog new hires can trust on day one.",
  category: "For leadership",
  supportLevel: "partial",
  readMinutes: 5,
  whatYouNeed: [
    "An admin who can set group rules and publish at least three playbooks",
    "A clear policy: open dispatch vs approval-required for client or repo work",
    "Champions with Macs already connected (see onboard in 15 minutes)",
  ],
  tryNext: {
    label: "Open Companies & rules",
    href: "/admin/groups",
  },
  relatedShowcases: [
    {
      slug: "manager-approves-before-run",
      label: "Manager approval before a sensitive Mac run",
    },
    {
      slug: "company-workflows-setup-once",
      label: "Set up workflows once for the whole company",
    },
    {
      slug: "request-sensitive-work-with-approval",
      label: "Request sensitive work with approval first",
    },
  ],
  sections: [
    {
      paragraphs: [
        "Letting everyone freestyle in separate chat tabs does not scale. Leadership needs the same prompt structure for weekly reports, the same checkpoints before code touches a repo, and a visible catalog so new hires do not invent prompts from scratch. Agent Witch is built for that pattern—not for replacing Slack or building a custom AI platform.",
      ],
    },
    {
      heading: "Governance without a six-month IT project",
      bullets: [
        "Company groups set who can run on whose Mac",
        "Approval policy pauses sensitive jobs until a manager says yes",
        "Published playbooks show up in Marketplace and team directories",
        "Job history in each browser shows prompts and results for that person's runs",
      ],
    },
    {
      heading: "Rollout order that builds trust",
      bullets: [
        "Seed three recognizable playbooks before the wide invite",
        "Run one approved sample end-to-end with two champions",
        "Share onboard in 15 minutes with everyone else—not a blank catalog",
      ],
    },
    {
      heading: "Honest limits to say in the kickoff email",
      paragraphs: [
        "There is no remote MDM to install agents on every laptop, and job history is not yet a cross-device compliance archive. What you get today is standardized work, visible offerings, and approval gates—enough for most SMEs to move faster without overselling a fleet console.",
      ],
    },
  ],
};

export default standardizeAiWorkAcrossTheTeam;
