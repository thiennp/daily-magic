/** Header-bell inbox EN — Notifications EN-PASS + CLAUDE-BRIEF (2026-10-07). UI-only Soft claim. */
export const NOTIFICATIONS_FILTERS = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "approvals", label: "Approvals" },
] as const;

export type NotificationsFilterId =
  (typeof NOTIFICATIONS_FILTERS)[number]["id"];

export const NOTIFICATIONS_COPY = {
  breadcrumbRoot: "Inbox",
  h1: "Notifications",
  tip: "Updates from your projects and anything that needs your OK. What reaches you by email is set on your Account page.",
  accessOrientation:
    "Join requests also stay in each project's Access panel. Approving in either place does the same thing.",
  safetyOrientation:
    "Why a task asks first is set by the safety rules inside each project.",
  markAllRead: "Mark all read",
  settingsLink: "Notification settings",
  settingsSr: "on your Account page",
  settingsHref: "/account?tab=notify",
  seeAll: "See all notifications",
  seeAllHref: "/notifications",
  loading: "Loading notifications…",
  tryAgain: "Try again",
  loadError: "Could not load notifications",
  showOlder: "Show older",
  olderDone: "That is everything from the last 30 days.",
  olderError: "Could not load older notifications",
  approve: "Approve",
  deny: "Deny",
  approving: "Approving…",
  denying: "Denying…",
  cancel: "Cancel",
  waitingForYou: "Waiting for you",
  waitingMins: "Waiting for you · {mins} min left",
  approved: "Approved",
  denied: "Denied",
  timedOut: "Timed out",
  approvedByYou: "Approved by you {when}",
  deniedByYou: "Denied by you {when}",
  timedOutLine:
    "No reply before the wait ended, so it stopped at {when}. Nothing ran.",
  checksOnDemand: "Checks in only when asked",
  thisComputer: "This computer",
  alsoOn: "Also on {computer}",
  denyJoinTitle: "Deny {who}?",
  denyJoinBody:
    "{who} will not get access to {project}. They can ask again later.",
  denyRunTitle: "Deny this task?",
  denyRunBody: "{who} will not run “{task}” on {computer}.",
  markRead: "Mark as read",
  unreadSr: "Unread.",
  signedOut: {
    title: "Sign in to see your notifications",
    body: "Updates from your projects and anything waiting for your approval show up here.",
    signIn: "Sign in",
  },
  empty: {
    all: {
      title: "No notifications yet",
      body: "When an assistant finishes work or someone asks to join, it shows up here.",
    },
    unread: {
      title: "You are all caught up",
      body: "Nothing new since you last looked.",
    },
    approvals: {
      title: "Nothing is waiting for you",
      body: "Join requests and tasks that need your OK show up here.",
    },
  },
  popoverTitle: "Notifications",
} as const;
