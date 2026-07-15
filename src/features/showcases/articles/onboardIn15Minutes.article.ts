import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const onboardIn15Minutes: ShowcaseArticle = {
  slug: "onboard-in-15-minutes",
  title: "Onboard in 15 minutes — real screens, sample data",
  subtitle:
    "Sign in, connect a Mac, run the seeded weekly status workflow, open Job history. No fake product tour.",
  category: "Start here",
  supportLevel: "full",
  readMinutes: 5,
  whatYouNeed: [
    "About 15 minutes and a Mac you control",
    "Agent Witch install command from Home → Your setup",
    'Seeded Library playbook: "Sample: Weekly status update"',
  ],
  tryNext: { label: "Sign in and open Home", href: "/login" },
  sections: [
    {
      paragraphs: [
        "This is the path we use ourselves. Each step names the real screen and what you should see. The sample UI images below use the same dummy field values as the seeded workflow — replace them with live screenshots from your account when you write an internal wiki.",
      ],
    },
    {
      heading: "1. Sign in",
      bullets: [
        "Open /login — use Google or email",
        "What you should see: Home with an onboarding checklist (Connect Mac → Create workflow → Send first task)",
      ],
      image: {
        src: "/showcases/onboarding/01-home-checklist.svg",
        alt: "Sample Home onboarding checklist before a Mac is connected",
        caption:
          "Sample UI: checklist with Connect your Mac still open. Capture your live Home after sign-in for the wiki.",
      },
    },
    {
      heading: "2. Connect your Mac",
      bullets: [
        "Home → Your setup — copy the install command and run it on the Mac",
        "What you should see: Your Devices lists the Mac as connected",
        "If send stays disabled later, the Mac is offline or the browser is not connected — that is expected",
      ],
      image: {
        src: "/showcases/onboarding/02-mac-connected.svg",
        alt: "Sample Your Devices panel with a connected Mac",
        caption:
          "Sample UI: connected device row. Prefer a screenshot of your real Mac name once paired.",
      },
    },
    {
      heading: "3. Open the sample workflow",
      bullets: [
        'Open Library — look for "Sample: Weekly status update"',
        "What you should see: fields Week of, Highlights, Blockers (optional)",
      ],
      image: {
        src: "/showcases/onboarding/03-sample-workflow.svg",
        alt: "Sample weekly status workflow form filled with dummy data",
        caption:
          "Sample UI with pasteable dummy data: Week of Jul 7, highlights, and blockers from the seeded preview values.",
      },
    },
    {
      heading: "4. Fill dummy data (safe to paste)",
      bullets: [
        "Week of: Jul 7",
        "Highlights: Shipped the library sample workflow and onboarding guide.",
        "Blockers: Waiting on design review for the hero copy.",
        "Use playbook → send to your Mac (or Copy prompt if you only want to inspect the assembled text)",
      ],
    },
    {
      heading: "5. Confirm in Job history",
      bullets: [
        "Open Job history — find the run you just sent",
        "What you should see: prompt, status, and output when the Mac finishes",
        "Honest limit: history is local-first in this browser — use the same browser next Monday for Run again",
      ],
      image: {
        src: "/showcases/onboarding/04-job-history.svg",
        alt: "Sample Job history card for a completed weekly status run",
        caption:
          "Sample UI: completed run card. Live history is stored local-first in this browser.",
      },
    },
    {
      heading: "Done when",
      paragraphs: [
        "Checklist shows Connect Mac and Send first task complete, Library still has the sample (or your renamed copy), and Job history shows one completed run. That is enough trust proof before inviting teammates.",
      ],
    },
  ],
};

export default onboardIn15Minutes;
