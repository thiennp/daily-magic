export const AUTOMATIONS_PAGE_COPY = {
  title: "Automations",
  description:
    "Scheduled workflows run on your computer via AgentWitch. Webhooks run through the server when your computer is online.",
  createTitle: "New automation",
  createIntro:
    "Automations run a saved workflow on a schedule or when a webhook fires. Pick a workflow from your Library, name the automation, then choose when it runs on your computer.",
  emptyTitle: "No automations yet",
  empty:
    "Pick the steps and when they run. An assistant does the rest on your computer.",
  runNow: "Run now",
  delete: "Delete",
  enable: "Enabled",
  disable: "Paused",
  webhookSecretTitle: "Webhook secret (copy now)",
  webhookUrlTitle: "Webhook URL",
  copySecret: "Copy secret",
  copyUrl: "Copy URL",
  copied: "Copied",
  syncFailed:
    "Saved in AgentWitch, but could not sync to this computer. Re-run AgentWitch install or open Automations again.",
  loadFailedTitle: "Could not load automations",
  loadFailedBody: "Check your connection and try again.",
  loadFailedRetry: "Try again",
  triggerSchedule: "Recurring schedule",
  triggerWebhook: "Webhook (HTTP POST)",
  timezone: "Timezone",
} as const;
