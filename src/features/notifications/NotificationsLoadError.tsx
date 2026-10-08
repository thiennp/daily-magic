"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";

interface NotificationsLoadErrorProps {
  readonly onRetry: () => void;
  readonly message?: string;
  readonly showHint?: boolean;
}

export default function NotificationsLoadError({
  onRetry,
  message,
  showHint = true,
}: NotificationsLoadErrorProps) {
  return (
    <AppPanel padding="compact" className="w-full">
      <div className="flex flex-col gap-3" role="alert">
        <p className="text-sm font-medium text-awc-fg dark:text-white">
          {message ?? NOTIFICATIONS_COPY.loadError}
        </p>
        {showHint ? (
          <p className="text-sm text-awc-fg-muted dark:text-gray-400">
            {NOTIFICATIONS_COPY.loadErrorHint}
          </p>
        ) : null}
        <div>
          <button
            type="button"
            className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
            onClick={onRetry}
          >
            {NOTIFICATIONS_COPY.tryAgain}
          </button>
        </div>
      </div>
    </AppPanel>
  );
}
