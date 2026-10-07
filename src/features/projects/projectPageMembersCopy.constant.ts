/** Layout v2 L5 Members rail — EN from ARTIFACT-STRINGS (this computer glossary). */
export const PROJECT_PAGE_MEMBERS_COPY = {
  columnLabel: "Members",
  /** DF-036 D1: you + joined people + assistants (no computers). */
  columnLabelCount: (n: number) => `Members · ${n}`,
  peopleHeading: "People",
  peopleInvite: "Invite people",
  peopleYouSuffix: "(you)",
  peopleRoleOwner: "Owner",
  peoplePendingEmpty: "No pending invites or access requests.",
  helpersHeading: "Assistants",
  helpersEmpty: "No assistants yet. Invite an assistant below.",
  /** Assistant row wake chip (DF-036 EN PASS; never a fake Ready). */
  helpersWake: {
    ready: "Wake link ✓",
    checks_on_demand: "Checks in only when asked",
    checking: "Checking…",
    cant_reach: "Wake failed",
    cant_check: "Couldn't check the wake link",
    not_connected: "Not connected",
  },
  helpersWorking: "Working",
  helpersNote:
    "Remove takes the assistant out of the project. If it leaves on its own, you don't need to approve.",
  menuChat: "Message privately",
  menuRename: "Rename",
  /** DF-036: the row's "Wake link" block title (the old "Grok wake link" text link is retired). */
  menuWebhook: "Wake link",
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
  /** DF-036 F1: the one (i) tip under the invite list (no "routine"; Muse footnote retired). */
  compatGrok: "Grok Bot sets up its wake link after it joins.",
  helperRemoved: (name: string) => `Removed ${name} from the project`,
  helperRenamed: "Assistant renamed",
  viewerHint: "Only the project owner can invite people and assistants.",
  loading: "Loading…",
} as const;
