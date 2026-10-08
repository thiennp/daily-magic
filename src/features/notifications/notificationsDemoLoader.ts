import type { NotificationItem } from "@/features/notifications/notificationsDemoItems.constant";

/** Demo-only fake loaders. `?demoFail=older|load` forces the error paths. */
const OLDER_DEMO: readonly NotificationItem[] = [
  {
    id: "o1",
    kind: "done",
    title: "Claude Code finished “Tidy release notes”",
    text: "2 files changed. Ready for your review.",
    project: "infusion",
    atLabel: "6 days ago",
    unread: false,
  },
  {
    id: "o2",
    kind: "auto",
    title: "Morning summary finished",
    text: "The summary for 01 Oct is ready in the project.",
    project: "daily-magic",
    atLabel: "7 days ago",
    unread: false,
  },
  {
    id: "o3",
    kind: "bill",
    title: "Invoice INV-1031 is ready",
    text: "$87.00 for the previous month.",
    atLabel: "9 days ago",
    unread: false,
  },
];

export function readDemoFail(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("demoFail");
}

export function loadOlderNotifications(): Promise<NotificationItem[]> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (readDemoFail() === "older") reject(new Error("older failed"));
      else resolve([...OLDER_DEMO]);
    }, 250);
  });
}
