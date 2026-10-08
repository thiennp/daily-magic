import Link from "next/link";

import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { NOTIFICATIONS_TIP_CLASS } from "@/features/notifications/notificationsClasses.constant";
import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";

export default function NotificationsPageFooter() {
  return (
    <footer className="space-y-1" data-testid="notifications-footer">
      <p className={NOTIFICATIONS_TIP_CLASS}>
        {NOTIFICATIONS_COPY.fewerEmailsPre}
        <Link
          href={NOTIFICATIONS_COPY.settingsHref}
          className={APP_SURFACE_TEXT_LINK_CLASS}
        >
          {NOTIFICATIONS_COPY.settingsLink}
        </Link>
        .
      </p>
      <p className={NOTIFICATIONS_TIP_CLASS}>
        {NOTIFICATIONS_COPY.safetyOrientation}
      </p>
    </footer>
  );
}
