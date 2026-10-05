/**
 * Product strings from human-member-invites/spec.md.
 * Lead GO: Remove/Revoke = one-click + 10s Undo (not confirm modal).
 * Copy link only after POST create success (GET list has no token).
 */
export const HUMAN_INVITE_UI_COPY = {
  invitePersonTitle: "Invite person",
  invitePersonIntro:
    "Invite someone to {projectName} — share a link. Two people's bot teams can share one project, or one family can plan together.",
  roleMember: "Member",
  roleViewer: "Viewer",
  roleMemberOneLiner:
    "Can open the project, use messages and skills, and connect their own bots.",
  roleViewerOneLiner:
    "Can open the project and read skills, but can't invite bots or send messages.",
  emailLabel: "Email",
  emailPlaceholder: "friend@example.com",
  copyLink: "Copy link",
  sendEmail: "Send email",
  sendEmailLaterBadge: "Later",
  linkCopiedToast: "Link copied — send it however you like.",
  cancel: "Cancel",
  peopleHeading: "People",
  peopleHint:
    "Pending invites and people who joined. Bot members stay under Bot invites.",
  botsPeopleTitle: "Bots & people",
  botsPeopleIntro:
    "People and bots in this project. Pending invites, then who's joined.",
  pendingSubhead: "Pending",
  joinedSubhead: "Joined",
  pendingEmpty: "No pending people invites.",
  joinedEmpty:
    "No one else has joined yet. Invite a person to share this project.",
  joinedOwnerOnly:
    "Just you so far. Invite a person to share this project.",
  youOwner: "You (owner)",
  revoke: "Revoke",
  remove: "Remove",
  undo: "Undo",
  revokeScheduled: "Invite revoked — Undo for 10s.",
  removeScheduled: "Person removed — Undo for 10s.",
  acceptEyebrow: "Project invite",
  acceptJoinTitle: "Join {projectName}",
  acceptSignedOutHint:
    "Sign up or log in to join. After that you'll land on the project.",
  signUp: "Sign up",
  logIn: "Log in",
  joinProject: "Join project",
  joining: "Joining…",
  /** Nickname copy reuses bot redeem / rename patterns (awcProjectAccessCopy). */
  nicknameLabel: "Project nickname",
  nicknameHint: "Unique per project. 2–32 letters, single spaces OK.",
  acceptSignedInHint:
    "One click — no Approve wait when the owner already invited you.",
  expiredTitle: "This invite expired",
  usedTitle: "This invite was already used",
  revokedTitle: "This invite was revoked",
  alreadyMemberTitle: "You're already on {projectName}",
  openProject: "Open project",
  badgeExpired: "Expired",
  badgeUsed: "Already used",
  badgeRevoked: "Revoked",
  createdBannerTitle: "Invite link ready — copy it now. Shown once.",
  createFailed: "Could not create invite. Try again.",
  copyFailed: "Could not copy link. Try again.",
  revokeFailed: "Could not revoke invite. Try again.",
  removeFailed: "Could not remove member. Try again.",
  loadFailed: "Could not load people invites.",
  ownerOnlyInvite: "Only the project owner can invite people.",
  viewerMessagesHint: "Viewers can't send messages.",
  viewerConnectHint:
    "Viewers can't invite bots. Ask the owner for Member access if you need that.",
  roleChipMember: "Your role · Member",
  roleChipViewer: "Your role · Viewer",
  emailLockCheckbox: "Only this email can join",
  emailRequiredForLock: "Enter an email to lock this invite to one person.",
  pendingEmailLocked: "Only this email",
  emailMismatchTitle: "Wrong account for this invite",
  emailMismatchBody:
    "This invite is locked to {masked}. You're signed in as a different account. Sign out and switch to that email — the invite still works.",
  emailUnverifiedTitle: "Verify your email to join",
  emailUnverifiedBody:
    "This invite is locked to {masked}. Verify that email on your account, then try again. The invite still works.",
  switchAccount: "Switch account",
  signOutCta: "Sign out",
  emailLockSignedOutHint:
    "This invite is locked to {masked}. Sign in with that email to join.",
  invalidInviteTitle: "This invite link is not valid",
  invalidInviteBody: "Ask for a fresh invite link from the project owner.",
} as const;

export const withProjectName = (template: string, projectName: string): string =>
  template.replaceAll("{projectName}", projectName);

export const withMaskedEmail = (template: string, masked: string): string =>
  template.replaceAll("{masked}", masked);
