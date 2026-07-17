import { AUTOMATION_SHOWCASE_SCREEN } from "@/features/showcases/automationShowcaseScreens.constant";
import { buildShowcaseAutomationArticleImage } from "@/features/showcases/buildShowcaseAutomationArticleImage";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const automateForYourselfOrYourTeam: ShowcaseArticle = {
  slug: "automate-for-yourself-or-your-team",
  title: "Automate for yourself—or your whole team",
  subtitle:
    "Pick a preset, save it, schedule it on your Mac, and share the same workflow with colleagues.",
  category: "Automations",
  supportLevel: "full",
  readMinutes: 5,
  whatYouNeed: [
    "A free account and a Mac with Agent Witch installed",
    "One workflow saved to Library (start from a marketplace preset)",
    "A few minutes to create your first automation in /automations",
  ],
  tryNext: {
    label: "Open Automations",
    href: "/login?callbackUrl=%2Fautomations",
  },
  relatedShowcases: [
    {
      slug: "schedule-workflow-on-your-mac",
      label: "How the Mac scheduler runs jobs on time",
    },
    {
      slug: "company-workflows-setup-once",
      label: "Set up workflows once for the whole company",
    },
    {
      slug: "manager-approves-before-run",
      label: "Manager approval before a sensitive run",
    },
  ],
  sections: [
    {
      paragraphs: [
        "Automations are the payoff after you pick a workflow: your Mac runs the job on a schedule or when a webhook fires—for you alone or as a shared playbook the team reuses.",
      ],
    },
    {
      heading: "1. Start from a preset on the home page",
      bullets: [
        "Before sign-in, browse Popular workflows on the marketing home page",
        "Click a card (email reply, lesson plan, shop support, etc.)",
        "Sign in or create a free account, then save the preset to Library",
      ],
      image: buildShowcaseAutomationArticleImage(
        AUTOMATION_SHOWCASE_SCREEN.HOME_POPULAR_PRESETS,
        {
          alt: "Sample home page with popular workflow presets",
          caption: "Popular workflow presets on the home page before sign-in.",
        },
      ),
    },
    {
      heading: "2. Create the automation",
      bullets: [
        "Open Automations → New automation",
        "Choose the saved workflow and fill its fields once",
        "Pick Schedule (hourly, daily, weekdays) or Webhook for external triggers",
        "Daily Magic syncs the job to your Mac; the local scheduler runs it",
      ],
      image: buildShowcaseAutomationArticleImage(
        AUTOMATION_SHOWCASE_SCREEN.NEW_AUTOMATION,
        {
          alt: "Sample new automation form with schedule trigger",
          caption:
            "New automation form with workflow, weekday schedule, and field values.",
        },
      ),
    },
    {
      heading: "3. Your Mac runs it; the team can reuse it",
      bullets: [
        "Enabled automations show next run time and last status",
        "Results land in Job history like any manual send",
        "Publish the same workflow to Marketplace so teammates save and automate their own copy",
        "Company rules can require manager approval before someone else's Mac runs a sensitive job",
      ],
      image: buildShowcaseAutomationArticleImage(
        AUTOMATION_SHOWCASE_SCREEN.AUTOMATIONS_LIST,
        {
          alt: "Sample automations list with a scheduled workflow enabled",
          caption: "Friday team status enabled with the next run scheduled.",
        },
      ),
    },
    {
      heading: "Honest limits",
      bullets: [
        "Schedules run on your Mac—not in the cloud—so a sleeping Mac waits until it wakes",
        "Webhook triggers hit the server, but execution still needs your Mac online",
        "Re-open Automations after an Agent Witch update if sync to the Mac failed",
      ],
    },
  ],
};

export default automateForYourselfOrYourTeam;
