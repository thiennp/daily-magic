import { agentDelegatesInsideYourCompanySections } from "@/features/showcases/articles/agentDelegatesInsideYourCompany.sections";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const agentDelegatesInsideYourCompany: ShowcaseArticle = {
  slug: "agent-delegates-inside-your-company",
  title: "Agent to agent inside your company",
  subtitle:
    "You send the task from the browser. Your teammate's Mac runs Claude on their files.",
  category: "Team dispatch",
  supportLevel: "full",
  readMinutes: 6,
  whatYouNeed: [
    "Shared company group with at least one teammate",
    "Teammate published a workflow or assistant in Library",
    "Their Mac agent online when the job runs (or after approval)",
  ],
  tryNext: { label: "Open Send a task", href: "/?sendTask=1" },
  relatedShowcases: [
    {
      slug: "phone-asks-coworker-mac-runs",
      label: "Mobile: your phone asks, their Mac runs",
    },
    {
      slug: "manager-approves-before-run",
      label: "When your company requires approval first",
    },
    {
      slug: "request-sensitive-work-with-approval",
      label: "Sensitive work on a teammate's Mac",
    },
  ],
  sections: agentDelegatesInsideYourCompanySections,
};

export default agentDelegatesInsideYourCompany;
