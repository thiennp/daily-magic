import type { NotificationItem } from "@/features/notifications/notificationsDemoItems.constant";
import { NOTIFICATIONS_DEMO_FIRST } from "@/features/notifications/notificationsDemoRuns.constant";
import { NOTIFICATIONS_DEMO_REST } from "@/features/notifications/notificationsDemoRest.constant";

export const NOTIFICATIONS_DEMO_ITEMS: readonly NotificationItem[] = [
  ...NOTIFICATIONS_DEMO_FIRST,
  ...NOTIFICATIONS_DEMO_REST,
];
