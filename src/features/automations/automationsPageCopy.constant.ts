export const AUTOMATIONS_PAGE_COPY = {
  title: "Automations",
  description:
    "Scheduled workflows run on your Mac via Agent Witch. Webhooks run through the server when your Mac is online.",
  createTitle: "New automation",
  createIntro:
    "Automations run a saved workflow on a schedule or when a webhook fires. Pick a workflow from your Library, name the automation, then choose when it runs on your Mac.",
  empty:
    "No automations yet. Schedule a workflow from Library or create one here.",
  runNow: "Run now",
  delete: "Delete",
  enable: "Enabled",
  disable: "Paused",
  webhookSecretTitle: "Webhook secret (copy now)",
  webhookUrlTitle: "Webhook URL",
  syncFailed:
    "Saved in Agent Witch, but could not sync to this Mac. Re-run Agent Witch install or open Automations again.",
  loadFailedTitle: "Could not load automations",
  loadFailedBody:
    "Something went wrong while fetching your scheduled workflows. Try again in a moment.",
  loadFailedRetry: "Try again",
} as const;
