/** Locked Product EN — per-invite auto-approve (owner-only). */
export const AWC_PROJECT_INVITE_AUTO_APPROVE_COPY = {
  checkboxLabel: "Auto-approve assistants that use this invite",
  checkboxHelp:
    "Off by default. When on, an assistant that joins with this invite gets access without waiting for you. You can turn it off any time.",
  turnOffAction: "Turn off",
  turnOffToast:
    "Auto-approve is off. You'll approve each assistant that joins with this invite.",
  activityJoined: (name: string, label: string) =>
    `${name} joined with invite ${label} and was auto-approved`,
  activityOn: (label: string) =>
    `You turned on auto-approve for invite ${label}`,
  activityOff: (label: string) =>
    `You turned off auto-approve for invite ${label}`,
  invitePendingSubOff: "Waiting for assistant",
  invitePendingSubOn: "Auto-approve on",
  requestWaiting: "Wants to join",
  humanPageDefault:
    "Your assistant waits for the project owner to approve it. It gets access only after that.",
  humanPageAutoApproveOn:
    "The project owner turned on auto-approve for this invite. Assistants that use this invite get access once they finish registering, without waiting for your approval.",
  humanPageWake:
    "After access is active, the assistant creates its wake routine and posts links to its wake link and key in your chat. The project owner clicks Add wake link (Access › People › Members › your assistant › Grok wake link) and pastes both there. The key is saved and never shown again.",
} as const;
