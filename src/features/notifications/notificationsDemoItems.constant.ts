/** Presentational demo feed matching AgentWitch-Notifications.html seed (UI-only). */
export type NotificationApprovalState =
  | "pending"
  | "approved"
  | "denied"
  | "timeout";

export type NotificationNoteKind =
  | "auto"
  | "done"
  | "limit"
  | "bill"
  | "billpay"
  | "invite"
  | "fail"
  | "computer";

export type NotificationItem =
  | {
      readonly id: string;
      readonly kind: "join";
      readonly who: string;
      readonly whoKind: "person" | "assistant";
      readonly email?: string;
      readonly runs?: string;
      readonly role: string;
      readonly project: string;
      readonly owner?: string;
      readonly note?: string;
      readonly delivery?: "demand" | "wake";
      readonly atLabel: string;
      readonly unread: boolean;
      readonly state: NotificationApprovalState;
      readonly doneAtLabel?: string;
    }
  | {
      readonly id: string;
      readonly kind: "run";
      readonly who: string;
      readonly task: string;
      readonly project: string;
      readonly computer: string;
      readonly computerLabel: string;
      readonly rule?: string;
      readonly files?: readonly string[];
      readonly atLabel: string;
      readonly unread: boolean;
      readonly state: NotificationApprovalState;
      readonly minsLeft?: number;
      readonly doneAtLabel?: string;
      readonly expiredAtLabel?: string;
    }
  | {
      readonly id: string;
      readonly kind: NotificationNoteKind;
      readonly title: string;
      readonly text: string;
      readonly project?: string;
      readonly atLabel: string;
      readonly unread: boolean;
      readonly href?: string;
      readonly linkLabel?: string;
    };

export const NOTIFICATIONS_DEMO_ITEMS: readonly NotificationItem[] = [
  {
    id: "r1",
    kind: "run",
    who: "Codex",
    task: "Update packages and run the checks",
    project: "daily-magic",
    computer: "here",
    computerLabel: "This computer",
    atLabel: "6 min ago",
    unread: true,
    state: "pending",
    minsLeft: 24,
    rule: "Ask me before changing packages",
    files: ["package.json", "package-lock.json", "scripts/check.sh"],
  },
  {
    id: "j1",
    kind: "join",
    who: "Maya Chen",
    whoKind: "person",
    email: "maya@northwind.dev",
    role: "Member",
    project: "infusion",
    atLabel: "12 min ago",
    unread: true,
    state: "pending",
    note: "I would like to help review the release notes this week.",
  },
  {
    id: "j2",
    kind: "join",
    who: "Release helper",
    whoKind: "assistant",
    runs: "Claude Code",
    role: "Assistant",
    project: "release-train",
    atLabel: "38 min ago",
    unread: true,
    state: "pending",
    delivery: "demand",
  },
  {
    id: "j4",
    kind: "join",
    who: "Sam Ortiz",
    whoKind: "person",
    email: "sam@northwind.dev",
    role: "Viewer",
    project: "northwind-docs",
    owner: "Maya Chen",
    atLabel: "70 min ago",
    unread: false,
    state: "pending",
    note: "I would like to read the docs rules and reports.",
  },
  {
    id: "n8",
    kind: "billpay",
    title: "Payment failed",
    text: "The card ending 4242 was declined. Update it to keep your plan active.",
    atLabel: "5 min ago",
    unread: true,
    href: "/pricing",
    linkLabel: "Update payment",
  },
  {
    id: "n1",
    kind: "auto",
    title: "Morning summary finished",
    text: "The summary for 07 Oct is ready in the project.",
    project: "daily-magic",
    atLabel: "95 min ago",
    unread: true,
    href: "/automations",
    linkLabel: "Open Automations",
  },
  {
    id: "n2",
    kind: "done",
    title: "Claude Code finished “Fix sign-in copy”",
    text: "3 files changed. Ready for your review.",
    project: "infusion",
    atLabel: "2 hr ago",
    unread: false,
    href: "/projects",
    linkLabel: "Open project",
  },
  {
    id: "r2",
    kind: "run",
    who: "Cursor",
    task: "Nightly cleanup of old builds",
    project: "release-train",
    computer: "linux",
    computerLabel: "Linux device",
    atLabel: "9 hr ago",
    unread: false,
    state: "timeout",
    rule: "Ask me before deleting files",
    expiredAtLabel: "earlier today",
  },
  {
    id: "n3",
    kind: "limit",
    title: "All 3 assistant spots on Pro are in use",
    text: "To connect another assistant, remove one or move to Team.",
    atLabel: "20 hr ago",
    unread: true,
    href: "/pricing",
    linkLabel: "See plans",
  },
  {
    id: "j3",
    kind: "join",
    who: "Jonas Weber",
    whoKind: "person",
    email: "jonas@infusionlabs.io",
    role: "Member",
    project: "infusion",
    atLabel: "26 hr ago",
    unread: false,
    state: "approved",
    doneAtLabel: "25 hr ago",
  },
  {
    id: "n4",
    kind: "invite",
    title: "Jonas Weber accepted your invite",
    text: "He can now open infusion as a member.",
    project: "infusion",
    atLabel: "25 hr ago",
    unread: false,
    href: "/projects",
    linkLabel: "Open project",
  },
  {
    id: "n5",
    kind: "bill",
    title: "Your trial ends in 5 days",
    text: "Pick Pro or Team to keep your projects running. Billing emails are always on.",
    atLabel: "2 days ago",
    unread: false,
    href: "/pricing",
    linkLabel: "Choose a plan",
  },
  {
    id: "n6",
    kind: "fail",
    title: "Weekly report did not run",
    text: "Linux device was offline at 06:00. It runs again next Monday.",
    project: "release-train",
    atLabel: "3 days ago",
    unread: false,
    href: "/automations",
    linkLabel: "Open Automations",
  },
  {
    id: "n9",
    kind: "bill",
    title: "Invoice INV-1043 is ready",
    text: "$87.00 for the last month.",
    atLabel: "3 days ago",
    unread: false,
    href: "/pricing",
    linkLabel: "View invoice",
  },
  {
    id: "n7",
    kind: "computer",
    title: "Grey - Study needs an update",
    text: "Open AgentWitch Local on that computer to update it.",
    atLabel: "4 days ago",
    unread: false,
    href: "/device",
    linkLabel: "Open computers",
  },
];

export function isApprovalItem(
  item: NotificationItem,
): item is Extract<NotificationItem, { kind: "join" | "run" }> {
  return item.kind === "join" || item.kind === "run";
}

export function filterNotificationItems(
  items: readonly NotificationItem[],
  filter: "all" | "unread" | "approvals",
): NotificationItem[] {
  if (filter === "unread") {
    return items.filter((item) => item.unread);
  }
  if (filter === "approvals") {
    return items.filter(isApprovalItem);
  }
  return [...items];
}

export function countUnread(items: readonly NotificationItem[]): number {
  return items.filter((item) => item.unread).length;
}
