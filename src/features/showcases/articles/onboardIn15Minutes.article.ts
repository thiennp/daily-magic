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
        "This is the path we use ourselves. Each step names the real screen and what you should see. Screenshot those screens for your company wiki — they match the live app after sign-in, including dummy field values below.",
      ],
    },
    {
      heading: "1. Sign in",
      bullets: [
        "Open /login — use Google or email",
        "What you should see: Home with an onboarding checklist (Connect Mac → Create workflow → Send first task)",
        "Screenshot tip: checklist with step 1 incomplete",
      ],
    },
    {
      heading: "2. Connect your Mac",
      bullets: [
        "Home → Your setup — copy the install command and run it on the Mac",
        "What you should see: Your Devices lists the Mac as connected",
        "Screenshot tip: connected device row, not the empty state",
        "If send stays disabled later, the Mac is offline or the browser is not connected — that is expected",
      ],
    },
    {
      heading: "3. Open the sample workflow",
      bullets: [
        'Open Library — look for "Sample: Weekly status update"',
        "What you should see: fields Week of, Highlights, Blockers (optional)",
        "Screenshot tip: form with sample values filled in",
      ],
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
        "Screenshot tip: completed card with requester = you",
        "Honest limit: history is local-first in this browser — use the same browser next Monday for Run again",
      ],
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
