/**
 * Product strings for human invites — Claude Invite HTML + live controls.
 * Lead GO: Remove/Revoke = one-click + 10s Undo (not confirm modal).
 * Copy link only after POST create success (GET list has no token).
 */
export const HUMAN_INVITE_UI_COPY = {
  invitePersonTitle: "Invite person",
  invitePersonIntro: "To {projectName}",
  roleMember: "Member",
  roleViewer: "Viewer",
  roleMemberOneLiner: "Can chat, give tasks and connect their own assistants.",
  roleViewerOneLiner:
    "Can read the project. Cannot give tasks or add assistants.",
  emailLabel: "Email",
  emailPlaceholder: "name@company.com",
  copyLink: "Copy link",
  sendEmail: "Send invite",
  sendEmailLaterBadge: "Later",
  linkCopiedToast: "Link copied — send it however you like.",
  cancel: "Cancel",
  peopleHeading: "People",
  peopleHint: "People who accepted and can open this project.",
  botsPeopleTitle: "Assistants & people",
  botsPeopleIntro:
    "People and assistants in this project. Pending invites, then who joined.",
  /** DF-036 F5: waiting person invites get their own count (hidden at 0). */
  pendingSubhead: (n: number) => `Waiting · ${n}`,
  joinedSubhead: "In the project",
  joinedEmpty:
    "No one else has joined yet. Invite a person to share this project.",
  joinedOwnerOnly: "Just you so far. Invite a person to share this project.",
  /** DF-036: assistants, requests or invites exist, but no other person joined. */
  joinedNoOtherPeople: "No other people have joined yet.",
  youOwner: "You (owner)",
  revoke: "Cancel",
  remove: "Remove",
  undo: "Undo",
  revokeScheduled: "Invite cancelled — Undo for 10s.",
  removeScheduled: "Person removed — Undo for 10s.",
  acceptEyebrow: "Project invite",
  acceptJoinTitle: "Join {projectName}",
  acceptSignedOutHint: "No account yet? Signing in makes one for you.",
  signUp: "Sign up",
  logIn: "Log in",
  joinProject: "Join project",
  joining: "Joining…",
  nicknameLabel: "Project nickname",
  nicknameHint: "Unique per project. 2–32 letters, single spaces OK.",
  acceptSignedInHint:
    "One click — no Approve wait when the owner already invited you.",
  expiredTitle: "This invite expired",
  usedTitle: "This invite was already used",
  revokedTitle: "This invite was cancelled",
  alreadyMemberTitle: "You are already in this project",
  alreadyMemberBody: "{projectName} is in your list.",
  goHome: "Go to Home",
  joinFailedTitle: "Could not join.",
  joinFailedBody: "Nothing changed. Try again.",
  joiningAs: "Joining as",
  notYou: "Not you?",
  invitedYou: "invited you",
  signInToJoin: "Sign in to join",
  openProject: "Open project",
  badgeExpired: "Expired",
  badgeUsed: "Already used",
  badgeRevoked: "Cancelled",
  createdBannerTitle: "Invite link ready — copy it now. Shown once.",
  createFailed: "Could not create invite. Try again.",
  copyFailed: "Could not copy link. Try again.",
  revokeFailed: "Could not cancel invite. Try again.",
  removeFailed: "Could not remove member. Try again.",
  loadFailed: "Could not load people invites.",
  ownerOnlyInvite: "Only the project owner can invite people.",
  viewerMessagesHint: "Viewers can't send messages.",
  viewerConnectHint:
    "Viewers can't invite assistants. Ask the owner for Member access if you need that.",
  roleChipMember: "Your role · Member",
  roleChipViewer: "Your role · Viewer",
  emailLockCheckbox: "Only this email can join",
  emailRequiredForLock: "Enter an email to lock this invite to one person.",
  pendingEmailLocked: "Only this email",
  emailMismatchTitle: "Wrong account",
  emailMismatchBody: "This invite is for {masked}.",
  emailMismatchSignedIn: "You are signed in as {email}.",
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

export const withProjectName = (
  template: string,
  projectName: string,
): string => template.replaceAll("{projectName}", projectName);

export const withMaskedEmail = (template: string, masked: string): string =>
  template.replaceAll("{masked}", masked);
