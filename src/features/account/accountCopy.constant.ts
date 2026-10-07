/** Account page EN — LOCK + COPY.md (EN PASS 2026-10-07). UI-only Soft claim. */
export const ACCOUNT_TABS = [
  { id: "profile", label: "Profile" },
  { id: "security", label: "Sign-in and security" },
  { id: "notify", label: "Notifications" },
  { id: "privacy", label: "Privacy and data" },
] as const;

export type AccountTabId = (typeof ACCOUNT_TABS)[number]["id"];

export const ACCOUNT_COPY = {
  breadcrumbRoot: "Account",
  h1: "Account",
  tip: "Your name, how you sign in, what we email you, and your data. Plans and billing live on the Pricing page.",
  menuItem: "Account",

  profile: {
    h2: "Profile",
    displayName: "Display name",
    displayNameTip: "Shown to people in your projects and companies.",
    email: "Email",
    verified: "Verified",
    timeZone: "Time zone",
    timeZoneHint: "24-hour, like 14:30",
    saveName: "Save name",
    cancel: "Cancel",
    changeEmail: "Change email",
    avatarColor: "Avatar color",
    planH2: "Your plan",
    planPro: "Pro",
    planTeam: "Team",
    planTrial: "Free trial",
    planFree: "Free",
    planNone: "No plan yet",
    ctaStart: "Start your free month",
    ctaManage: "Manage plan and billing",
    planHelp:
      "Plans, seats, invoices and cancelling are on the Pricing page. Cancel anytime. Prices in USD.",
    nameSaved: "Name saved",
    changeEmailNote: "Email change is not available in this preview yet.",
  },

  security: {
    h2SignIn: "How you sign in",
    tipSignIn:
      "You can use an email code or Google. There is no password to remember or leak.",
    emailCode: "We send a 6-digit code to {email} each time you sign in.",
    emailCodeAlways: "Always available",
    googleLinked: "Linked: {email}",
    googleNotLinked: "Not linked. Sign in with one tap.",
    linkGoogle: "Link Google",
    unlinkGoogle: "Unlink",
    h2Sessions: "Where you are signed in",
    tipSessions:
      "Browsers and AgentWitch apps that can use your account. Signing out an app on a computer pauses its assistants until you sign in again.",
    signOutElsewhere: "Sign out everywhere else",
    signOut: "Sign out",
    thisBrowser: "This browser",
    emptyTitle: "No other sessions",
    emptyBody: "You are signed in only on this browser.",
    sessionChrome: "Chrome",
    mockOnlyNote: "Session list is a preview — sign-out elsewhere is not wired yet.",
  },

  notify: {
    h2: "What we tell you",
    tip: "Choose email and in-app notes for each event. Changes save as you go.",
    colEvent: "Event",
    colEmail: "Email",
    colInApp: "In app",
    sendTest: "Send a test email",
    testSent: "Test email sent",
    rowTask: "A task finishes",
    rowTaskHint: "A short note when an assistant finishes a task.",
    rowApproval: "An assistant needs your approval",
    rowApprovalHint: "When a rule or automation says to ask first.",
    rowDigest: "Weekly digest",
    rowDigestHint: "Mondays at 09:00. What your assistants did last week.",
    rowInvites: "Invites and access requests",
    rowInvitesHint: "When someone invites you or asks to join your project.",
    rowBilling: "Billing and trial reminders",
    rowBillingHint: "Receipts, failed payments and when your trial ends.",
    billingLocked: "Billing emails cannot be turned off.",
    quietH2: "Quiet hours",
    quietTip:
      "No emails or in-app notes during these hours. Approvals wait until quiet hours end.",
    quietFrom: "From",
    quietTo: "To",
    quietOn: "Quiet from {from} to {to} ({tz}).",
    quietOff: "Quiet hours are off.",
    prefsLocalNote: "Notification prefs save on this device only for now.",
  },

  privacy: {
    historyH2: "Your history stays on your computers",
    historyTip:
      "Tasks, replies and files are stored on the computer where an assistant ran them. The website only shows a notice.",
    historyBody:
      "AgentWitch does not keep your task history on its servers. Open AgentWitch on this computer to read it. Deleting your account does not touch files on your computers.",
    exportH2: "Export your account data",
    exportBody:
      "We email a download link to {email} within 24 hours. It includes your profile, billing records, and your projects and companies. It does not include history, which stays on your computers.",
    requestExport: "Request export",
    exportRequested: "Export requested",
    deleteH2: "Delete your account",
    deleteTip:
      "Your account is removed after 7 days. You can cancel during that time. This cannot be undone afterwards.",
    blockerPlan: "Cancel paid plan on Pricing first",
    blockerOwner: "You are the sole owner of shared projects",
    blockerManaged: "This account is managed by a company",
    deleteCta: "Delete my account",
    cancelDeletion: "Cancel deletion",
    keepAccount: "Keep my account",
    confirmDelete: "Delete my account",
    deletionScheduled: "Account deletion scheduled — you can cancel within 7 days.",
    exportLocalNote: "Export and delete are preview actions — not sent to the server yet.",
  },

  signedOut: {
    title: "Sign in to see your account",
    body: "Your profile, sign-in methods and notifications belong to your account.",
    signIn: "Sign in",
  },
  loadFail: "Could not load your account",
  offline: "No internet. You can read everything. Changes wait for the connection.",
  tryAgain: "Try again",
} as const;

export const ACCOUNT_AVATAR_COLORS = [
  { id: "sky", label: "Sky", className: "bg-sky-500" },
  { id: "blue", label: "Blue", className: "bg-awc-blue-600" },
  { id: "emerald", label: "Emerald", className: "bg-emerald-500" },
  { id: "amber", label: "Amber", className: "bg-amber-500" },
  { id: "rose", label: "Rose", className: "bg-rose-500" },
] as const;
