import { buildShowcaseOnboardingArticleImage } from "@/features/showcases/buildShowcaseOnboardingArticleImage";
import { ONBOARDING_SHOWCASE_SCREEN } from "@/features/showcases/onboardingShowcaseScreens.constant";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const companyOnboardIn30Minutes: ShowcaseArticle = {
  slug: "company-onboard-in-30-minutes",
  title: "Company rollout in 30 minutes — seed before you invite",
  subtitle:
    "Create a group, set approval policy, publish 3 playbooks, run one approved job. Invite after the catalog is ready.",
  category: "For teams",
  supportLevel: "partial",
  readMinutes: 6,
  whatYouNeed: [
    "Admin access to Companies & rules",
    "2–3 champion Macs already connected (see onboard in 15 minutes)",
    "Willingness to publish at least one workflow before a wide invite",
  ],
  tryNext: {
    label: "Open Companies & rules",
    href: "/admin/groups",
  },
  sections: [
    {
      paragraphs: [
        "An empty Marketplace slows adoption. Roll out by seeding work people recognize — then invite.",
      ],
    },
    {
      heading: "1. Create the company group",
      bullets: [
        "Open Companies & rules (/admin/groups)",
        "What you should see: group name, members, dispatch policy",
      ],
      image: buildShowcaseOnboardingArticleImage(
        ONBOARDING_SHOWCASE_SCREEN.COMPANY_RULES,
        {
          alt: "Companies and rules screen with approval policy and seeded playbooks",
          caption:
            "Acme Product group with approval policy and three seeded playbooks.",
        },
      ),
    },
    {
      heading: "2. Choose dispatch policy",
      bullets: [
        "Open — teammates can run on each other's Macs without a pause",
        "Approval — request waits until a manager says yes (best for client or repo-sensitive work)",
      ],
    },
    {
      heading: "3. Seed three playbooks (minimum)",
      bullets: [
        "Start from Library — keep or rename Weekly status update",
        "Add one research / summary playbook your team already uses in chat",
        "Add one low-risk internal task (standup notes, changelog draft)",
        "Publish with group visibility so Home → What teammates can request is ready",
      ],
    },
    {
      heading: "4. Run one approved job end-to-end",
      bullets: [
        "Champion A sends a task to Champion B's Mac",
        "Approver says yes — run starts only after approval",
        "Both open Job history in their browsers and confirm the prompt + result",
      ],
      image: buildShowcaseOnboardingArticleImage(
        ONBOARDING_SHOWCASE_SCREEN.JOB_HISTORY,
        {
          alt: "Completed job history card after an approved run",
          caption: "Completed run after manager approval in Job history.",
        },
      ),
    },
    {
      heading: "5. Invite everyone else",
      bullets: [
        "Share /showcases/onboard-in-15-minutes as the employee day-one page",
        "Tell new hires: pair Mac → save 2–3 company playbooks → one low-risk run",
        "Invite once the catalog has playbooks people recognize",
      ],
    },
    {
      heading: "What success looks like on day one",
      paragraphs: [
        "Groups, dispatch policy, shared playbooks, and visible offerings—champions pair their Macs and everyone starts from the same catalog. Say that clearly in your launch note and people know exactly what to expect.",
      ],
    },
  ],
};

export default companyOnboardIn30Minutes;
