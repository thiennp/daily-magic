/** Layout v2 L5 Members rail — EN from ARTIFACT-STRINGS (this computer glossary). */
export const PROJECT_PAGE_MEMBERS_COPY = {
  columnLabel: "Members",
  /** DF-036 D1: you + joined people + assistants (no computers). */
  railMenuLabel: "Members menu",
  railMenuInvite: "Invite people or add an assistant",
  railMenuAccessLog: "Access log",
  columnLabelCount: (n: number) => `Members · ${n}`,
  memberSingular: "member",
  memberPlural: "members",
  /** DF-036 F5: header pill (hidden at 0). */
  waitingPill: (k: number) => `${k} waiting`,
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
  /** DF-036 D4: say what the invite is. */
  inviteBotHeading: "Invite an assistant",
  inviteBotIntro:
    "Make a one-time invite and paste it into the assistant you want to add. When it is used, the assistant appears under Pending for you to approve. Grok Bot sets up its wake link after it joins.",
  peopleHint: "People who accepted and can open this project.",
  wakeIntroTip:
    "In Grok Bot, the assistant posted two links: wake link and key. Copy each one and paste both here, one after the other.",
  invitePrompt: (kind: string | null) =>
    kind === null
      ? "Paste this prompt into your assistant. You can copy it again until it's used."
      : `Prompt for the ${kind} assistant. Paste it into your assistant. You can copy it again until it's used.`,
  /** Unused invite row (replaces "Invite sent / Waiting for assistant"); Cancel only, no Approve. */
  invitePendingTitle: "Assistant invite",
  invitePendingTitleFor: (type: string) => `Invite for ${type}`,
  invitePendingSub: (uses: number, expires: string) =>
    `Not used yet · for ${uses === 1 ? "1 assistant" : `${uses} assistants`} · expires ${expires}`,
  invitePendingNotUsed: "Not used yet",
  invitePendingFor: (uses: number) =>
    uses === 1 ? "1 assistant" : `${uses} assistants`,
  invitePendingExpires: (expires: string) => `expires ${expires}`,
  /** State 1b — chip label when auto-approve is on. */
  invitePendingSubOn: "Auto-approve on",
  invitePendingTurnOff: "Turn off",
  /** State 2 — join request subtitle; Approve + Deny. */
  requestWaitingApproval: "Wants to join",
  invitePendingCancel: "Cancel invite",
  inviteCancelConfirmTitle: "Cancel this invite?",
  inviteCancelConfirmBody:
    "The link stops working. Anyone who has it can no longer join with it.",
  inviteCancelKeep: "Keep invite",
  /** DF-014 / 107 — copy the prompt again from an unused invite row (any device). */
  invitePendingCopy: "Copy again",
  invitePendingCopied: "Copied",
  invitePendingCopying: "Copying…",
  invitePendingCopyFailed: "Couldn't copy. Try again.",
  /** 107 — no stored prompt (made before Copy-anywhere): the lost-copy line. */
  invitePendingCopyUnavailable:
    "The invite was shown once. Cancel it and make a new one if you lost it.",
  inviteListNote:
    "When an assistant uses an invite, it appears under Pending for you to approve.",
  inviteEmpty: "No assistant invites yet.",
  /** DF-036 F1: the one (i) tip under the invite list (no "routine"; Muse footnote retired). */
  compatGrok: "Grok Bot sets up its wake link after it joins.",
  helperRemoved: (name: string) => `Removed ${name} from the project`,
  helperRenamed: "Assistant renamed",
  viewerHint: "Only the project owner can invite people and assistants.",
  /** DF-016 rail skeleton status (screen readers). */
  loading: "Loading members…",
} as const;
