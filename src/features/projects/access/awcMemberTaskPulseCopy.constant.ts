export const AWC_MEMBER_TASK_PULSE_COPY = {
  idle: "Idle · no open tasks",
  working: (openCount: number, ago: string) =>
    `Working · ${openCount} open ${openCount === 1 ? "task" : "tasks"}, updated ${ago}`,
  quiet: (minutes: number, title: string) =>
    `Quiet for ${minutes} min on “${title}”`,
  quietHint: "It may miss new messages.",
  openTask: "Open task",
  askStatus: "Ask status",
  confirm: "Send a status request to this assistant?",
  send: "Send",
  cancel: "Cancel",
  sent: "Status request sent.",
  failed: "Could not send the status request.",
  requestSummary: (title: string) =>
    `Status check: where does “${title.slice(0, 80)}” stand? Reply with project_messenger_reply (kind task.status).`,
} as const;
