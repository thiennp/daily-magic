/** Layout v2 L5 Members rail — EN from ARTIFACT-STRINGS (this computer glossary). */
export const PROJECT_PAGE_MEMBERS_COPY = {
  columnLabel: "Members",
  peopleHeading: "People",
  peopleInvite: "Invite people",
  peopleYouSuffix: "(you)",
  peopleRoleOwner: "Owner",
  peoplePendingEmpty: "No pending invites or access requests.",
  helpersHeading: "Assistants",
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
  invitePrompt: (kind: string | null) =>
    kind === null
      ? "Paste this prompt into your assistant. You can copy it again until it's used."
      : `Prompt for the ${kind} assistant. Paste it into your assistant. You can copy it again until it's used.`,
  /** State 1 — invite out; Cancel only (no Approve). */
  invitePendingTitle: "Invite sent",
  invitePendingSubOff: "Waiting for assistant",
  /** State 1b — chip label when auto-approve is on. */
  invitePendingSubOn: "Auto-approve on",
  invitePendingTurnOff: "Turn off",
  /** State 2 — join request subtitle; Approve + Deny. */
  requestWaitingApproval: "Wants to join",
  invitePendingCancel: "Cancel",
  /** DF-014 / 107 — copy the prompt again from an Invite sent row (any device). */
  invitePendingCopy: "Copy",
  invitePendingCopied: "Copied",
  invitePendingCopying: "Copying…",
  invitePendingCopyFailed: "Couldn't copy. Try again.",
  /** 107 — invite made before Copy-anywhere: no stored prompt. */
  invitePendingCopyUnavailable: "Make a new invite to copy a prompt.",
  inviteEmpty: "No assistant invites yet.",
  compatGrok:
    "Grok Bot joins with the prompt and wakes up through its own routine.",
  compatOther:
    "Other assistants, such as Muse, can join with the same invite prompt.",
  helperRemoved: (name: string) => `Removed ${name} from the project`,
  helperRenamed: "Assistant renamed",
  viewerHint: "Only the project owner can invite people and assistants.",
  loading: "Loading…",
} as const;
