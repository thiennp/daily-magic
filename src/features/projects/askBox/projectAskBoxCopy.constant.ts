/**
 * Project layout v2 L2 ask box — EN values from Product
 * `artifact-strings.json` (ask.* / toast.* / activity.sent.*).
 */
export const PROJECT_ASK_BOX_COPY = {
  formLabel: "Assign work to the assistant",
  label: "What do you want the assistant to do?",
  placeholder: "What do you want the assistant to do?",
  sendTo: "Send to",
  allAssistants: "All assistants",
  allAssistantsInline: "all assistants",
  send: "Send",
  sendOptions: "Send options",
  needsReply: "Needs a reply",
  needsReplyHint: "· wake the assistant now",
  assignAsTask: "Assign as a specific task",
  assignAsTaskHint: "· one assistant only, 200 characters max",
  kindAria: "Kind",
  kindPlaceholder: "Kind (task.assign)",
  prUrl: "PR URL",
  commitSha: "Commit SHA",
  localPath: "Computer path",
  allowClaimId: "Allow claim id",
  counter: (n: number, max: number) => `${n} / ${max}`,
  inviteFirst: "Invite an assistant first",
  taskOneAssistant: "A specific task can only go to one assistant",
  sentTo: (label: string) => `Sent to ${label}`,
  sentQuiet: (label: string) => `Sent. ${label} will see it when they wake up`,
  assignedTo: (label: string) => `You assigned a task to ${label}`,
} as const;
