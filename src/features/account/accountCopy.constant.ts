import { ACCOUNT_NOTIFY_COPY } from "@/features/account/accountNotifyCopy.constant";
import { ACCOUNT_PRIVACY_COPY } from "@/features/account/accountPrivacyCopy.constant";

/** Account page EN — LOCK + COPY.md (EN PASS 2026-10-07). UI-only Soft claim. */
export const ACCOUNT_TABS = [
  { id: "profile", label: "Profile" },
  { id: "notify", label: "Notifications" },
] as const;

export type AccountTabId = (typeof ACCOUNT_TABS)[number]["id"];

export const ACCOUNT_COPY = {
  breadcrumbRoot: "Account",
  h1: "Account",
  tip: "Your name and what we email you. Plans and billing live on the Pricing page.",
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
    nameShort: "Enter at least 2 letters.",
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
    unlinkTitle: "Unlink Google?",
    unlinkBody: "You can still sign in with an email code sent to {email}.",
    signOutHereTitle: "Sign out of this browser?",
    signOutHereBody: "You can sign in again with an email code or Google.",
  },

  notify: ACCOUNT_NOTIFY_COPY,

  privacy: ACCOUNT_PRIVACY_COPY,

  signedOut: {
    title: "Sign in to see your account",
    body: "Your profile, sign-in methods and notifications belong to your account.",
    signIn: "Sign in",
  },
  loading: "Loading…",
  loadFail: "Could not load your account",
  offline:
    "No internet. You can read everything. Changes wait for the connection.",
  tryAgain: "Try again",
} as const;

export const ACCOUNT_AVATAR_COLORS = [
  { id: "sky", label: "Sky", className: "bg-sky-500" },
  { id: "blue", label: "Blue", className: "bg-awc-blue-600" },
  { id: "emerald", label: "Emerald", className: "bg-emerald-500" },
  { id: "amber", label: "Amber", className: "bg-amber-500" },
  { id: "rose", label: "Rose", className: "bg-rose-500" },
] as const;
