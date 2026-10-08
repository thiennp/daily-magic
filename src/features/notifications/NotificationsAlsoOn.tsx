import Link from "next/link";

import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";
import type { NotificationItem } from "@/features/notifications/notificationsDemoItems.constant";
import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface NotificationsAlsoOnProps {
  readonly item: Extract<NotificationItem, { kind: "join" | "run" }>;
}

export default function NotificationsAlsoOn({
  item,
}: NotificationsAlsoOnProps) {
  const isRun = item.kind === "run";
  const template = isRun
    ? NOTIFICATIONS_COPY.alsoOn
    : NOTIFICATIONS_COPY.alsoIn;
  const [before, after] = template.split("{link}");
  const href = isRun
    ? NOTIFICATIONS_COPY.computersHref
    : NOTIFICATIONS_COPY.projectsHref;
  const label = isRun
    ? item.computerLabel
    : `${item.project}${NOTIFICATIONS_COPY.accessSuffix}`;
  return (
    <span
      className="text-[length:var(--awc-fs-sm)] text-awc-fg-muted dark:text-gray-400"
      data-testid="notifications-also-on"
    >
      {before}
      <Link href={href} className={APP_SURFACE_TEXT_LINK_CLASS}>
        {label}
      </Link>
      {after}
    </span>
  );
}
