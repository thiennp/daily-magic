import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const scheduleWorkflowOnYourMac: ShowcaseArticle = {
  slug: "schedule-workflow-on-your-mac",
  title: "Schedule a workflow on your Mac — not in the cloud",
  subtitle:
    "Daily Magic stores the plan; Agent Witch on your Mac runs it on time.",
  category: "Workflows",
  supportLevel: "full",
  readMinutes: 4,
  whatYouNeed: [
    "A saved workflow in Library with fields filled in",
    "Mac connected with Agent Witch installed (scheduler LaunchAgent)",
    "Browser on the same Mac at least once to sync schedules",
  ],
  tryNext: {
    label: "Open Automations",
    href: "/automations",
  },
  relatedShowcases: [
    {
      slug: "weekly-report-in-five-minutes",
      label: "Friday status from a saved workflow form",
    },
    {
      slug: "stop-copy-paste-every-monday",
      label: "Stop copy-pasting the same Monday prompt",
    },
    {
      slug: "when-executor-mac-is-offline",
      label: "What happens when your Mac is asleep",
    },
    {
      slug: "human-checkpoints-before-mac-runs",
      label: "Human steps you complete in the browser",
    },
  ],
  sections: [
    {
      paragraphs: [
        "Recurring reports and standup prep should not depend on you remembering to open ChatGPT every Monday. Create an automation in Daily Magic, pick hourly/daily/weekday schedule, and your Mac runs Claude on time.",
      ],
    },
    {
      heading: "How it works",
      bullets: [
        "You define name, workflow, field values, and schedule in /automations",
        "Daily Magic syncs the job list to ~/.agent-witch on your Mac",
        "com.agent-witch-automation-scheduler checks every minute and dispatches due runs",
        "Results land in Job history like any manual send",
      ],
    },
    {
      heading: "Webhooks (optional)",
      paragraphs: [
        "You can also create a webhook automation. The server accepts POST /api/automations/{id}/trigger, but execution still needs your Mac online to run Claude on local files.",
      ],
    },
    {
      heading: "Honest limits",
      bullets: [
        "No server cron — if your Mac is off, scheduled runs wait until it wakes",
        "No push notification when a run finishes; check Job history",
        "Re-open Automations on your Mac if sync failed after an install update",
      ],
    },
  ],
};

export default scheduleWorkflowOnYourMac;
