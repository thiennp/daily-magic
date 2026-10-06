import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const scheduleWorkflowOnYourMac: ShowcaseArticle = {
  slug: "schedule-workflow-on-your-mac",
  title: "Schedule a workflow on your computer — not in the cloud",
  subtitle: "Agent Witch stores the plan; your computer runs it on time.",
  category: "Workflows",
  supportLevel: "full",
  readMinutes: 4,
  whatYouNeed: [
    "A saved workflow in Library with fields filled in",
    "Mac connected with Agent Witch installed (scheduler LaunchAgent)",
    "Browser on the same computer at least once to sync schedules",
  ],
  tryNext: {
    label: "Open Automations",
    href: "/automations",
  },
  relatedShowcases: [
    {
      slug: "automate-for-yourself-or-your-team",
      label: "Full path: preset → save → automate for you or your team",
    },
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
      label: "What happens when your computer is asleep",
    },
    {
      slug: "human-checkpoints-before-mac-runs",
      label: "Human steps you complete in the browser",
    },
  ],
  sections: [
    {
      paragraphs: [
        "Recurring reports and standup prep should not depend on you remembering to open ChatGPT every Monday. Create an automation in Agent Witch, pick hourly/daily/weekday schedule, and your computer runs Claude on time.",
      ],
    },
    {
      heading: "How it works",
      bullets: [
        "You define name, workflow, field values, and schedule in /automations",
        "Agent Witch syncs the job list to ~/.agent-witch on your computer",
        "com.agent-witch-automation-scheduler checks every minute and dispatches due runs",
        "Results land in Reports like any manual send",
      ],
    },
    {
      heading: "Webhooks (optional)",
      paragraphs: [
        "You can also create a webhook automation. The server accepts POST /api/automations/{id}/trigger, but execution still needs your computer online to run Claude on local files.",
      ],
    },
    {
      heading: "Built around your computer",
      bullets: [
        "Your computer runs the schedule so jobs stay close to your local files",
        "When a run finishes, open Reports to review the result",
        "After an Agent Witch update, open Automations once so schedules stay in sync",
      ],
    },
  ],
};

export default scheduleWorkflowOnYourMac;
