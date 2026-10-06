/** Layout v2 L5 Members rail — EN from ARTIFACT-STRINGS (this computer glossary). */
export const PROJECT_PAGE_MEMBERS_COPY = {
  columnLabel: "Members",
  peopleHeading: "People",
  peopleInvite: "Invite people",
  peopleYouSuffix: "(you)",
  peopleRoleOwner: "Owner",
  peoplePendingEmpty: "No pending invites or access requests.",
  helpersHeading: "Assistants in the project",
  helpersEmpty: "No assistants yet. Invite an assistant below.",
  helpersReady: "Ready",
  helpersWorking: "Working",
  helpersNote:
    "Remove takes the assistant out of the project. If it leaves on its own, you don't need to approve.",
  menuChat: "Message privately",
  menuRename: "Rename",
  menuWebhook: "Grok wake link",
  menuRemove: "Remove",
  renameAria: "New name",
  renameSave: "Save",
  renameCancel: "Cancel",
  revokeText: (name: string) => `${name} will no longer see this project.`,
  revokeConfirm: (name: string) => `Remove ${name}`,
  revokeCancel: "Cancel",
  inviteBotHeading: "Invite a new assistant",
  inviteGrok: "Invite Grok assistant",
  inviteMuse: "Invite Muse assistant",
  invitePrompt: (kind: string) =>
    `Prompt for the ${kind} assistant. Paste it into your assistant. The prompt shows once, so copy it now.`,
  invitePendingSubOff:
    "Waiting to join · you approve each assistant before it gets access",
  invitePendingSubOn: "Waiting to join · auto-approve is on",
  requestWaitingApproval: "Asked to join · waiting for your approval",
  invitePendingCancel: "Cancel",
  inviteEmpty:
    "No assistant invites yet. The prompt shows only once when you create it.",
  compatGrok:
    "Grok Bot joins with the prompt and wakes up through its own routine.",
  compatOther:
    "Other assistants, such as Muse, can join with the same invite prompt.",
  helperRemoved: (name: string) => `Removed ${name} from the project`,
  helperRenamed: "Assistant renamed",
  viewerHint: "Only the project owner can invite people and assistants.",
  loading: "Loading…",
} as const;
