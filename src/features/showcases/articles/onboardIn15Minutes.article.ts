import { buildShowcaseOnboardingArticleImage } from "@/features/showcases/buildShowcaseOnboardingArticleImage";
import { ONBOARDING_SHOWCASE_SCREEN } from "@/features/showcases/onboardingShowcaseScreens.constant";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const onboardIn15Minutes: ShowcaseArticle = {
  slug: "onboard-in-15-minutes",
  title: "Onboard in 15 minutes — walk through with real screens",
  subtitle:
    "Sign in, set up your Mac to run jobs, run the seeded weekly status workflow, open Job history.",
  category: "Start here",
  supportLevel: "full",
  readMinutes: 5,
  whatYouNeed: [
    "About 15 minutes and a Mac you control",
    "Agent Witch install command from Home → Your setup",
    'Seeded Library playbook: "Weekly status update"',
  ],
  tryNext: { label: "Sign in and open Home", href: "/login" },
  sections: [
    {
      paragraphs: [
        "This is the path we use ourselves. Each step names the real screen and what you should see.",
      ],
    },
    {
      heading: "1. Sign in",
      bullets: [
        "Open /login — use Google or email",
        "What you should see: Home with an onboarding checklist (Add Mac as worker → Create workflow → Send first task)",
      ],
      image: buildShowcaseOnboardingArticleImage(
        ONBOARDING_SHOWCASE_SCREEN.HOME_CHECKLIST,
        {
          alt: "Home onboarding checklist before a Mac is connected",
          caption:
            "Onboarding checklist with Add your Mac as a worker still open.",
        },
      ),
    },
    {
      heading: "2. Set up your Mac to run workflows",
      bullets: [
        "Home → Your setup — copy the install command and run it on the Mac",
        "What you should see: Your Devices lists the Mac as ready to run jobs",
        "If send stays disabled later, check that the Mac is awake and the browser is connected",
      ],
      image: buildShowcaseOnboardingArticleImage(
        ONBOARDING_SHOWCASE_SCREEN.MAC_CONNECTED,
        {
          alt: "Your Devices panel with a connected Mac",
          caption: "Jamie's MacBook Pro connected and ready to run jobs.",
        },
      ),
    },
    {
      heading: "3. Open the weekly status workflow",
      bullets: [
        'Open Library — look for "Weekly status update"',
        "What you should see: fields Week of, Highlights, Blockers (optional)",
      ],
      image: buildShowcaseOnboardingArticleImage(
        ONBOARDING_SHOWCASE_SCREEN.SAMPLE_WORKFLOW,
        {
          alt: "Weekly status workflow form with practice details filled in",
          caption:
            "Weekly status update with week of Jul 7, highlights, and blockers filled.",
        },
      ),
    },
    {
      heading: "4. Fill practice details (safe to paste)",
      bullets: [
        "Week of: Jul 7",
        "Highlights: Shipped the library weekly status workflow and onboarding guide.",
        "Blockers: Waiting on design review for the hero copy.",
        "Use playbook → send to your Mac (or Copy prompt if you only want to inspect the assembled text)",
      ],
    },
    {
      heading: "5. Confirm in Job history",
      bullets: [
        "Open Job history — find the run you just sent",
        "What you should see: prompt, status, and output when the Mac finishes",
        "Tip: history stays in this browser — use the same browser next Monday for Run again",
      ],
      image: buildShowcaseOnboardingArticleImage(
        ONBOARDING_SHOWCASE_SCREEN.JOB_HISTORY,
        {
          alt: "Job history card for a completed weekly status run",
          caption: "Completed weekly status run in Job history.",
        },
      ),
    },
    {
      heading: "Done when",
      paragraphs: [
        "Checklist shows Mac worker setup and Send first task complete, Library still has the weekly status playbook (or your renamed copy), and Job history shows one completed run. That is enough trust proof before inviting teammates.",
      ],
    },
  ],
};

export default onboardIn15Minutes;
