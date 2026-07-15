export const AUTOMATIONS_PAGE_COPY = {
  title: "Automations",
  description:
    "Scheduled workflows run on your Mac via Agent Witch. Webhooks run through the server when your Mac is online.",
  createTitle: "New automation",
  empty:
    "No automations yet. Schedule a workflow from Library or create one here.",
  runNow: "Run now",
  delete: "Delete",
  enable: "Enabled",
  disable: "Paused",
  webhookSecretTitle: "Webhook secret (copy now)",
  webhookUrlTitle: "Webhook URL",
  syncFailed:
    "Saved in Daily Magic, but could not sync to this Mac. Re-run Agent Witch install or open Automations again.",
} as const;
