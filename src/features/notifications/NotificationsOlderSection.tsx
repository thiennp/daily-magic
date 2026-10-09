"use client";

import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";
import NotificationsLoadError from "@/features/notifications/NotificationsLoadError";

export type OlderState = "idle" | "loading" | "error" | "done";

interface NotificationsOlderSectionProps {
  readonly state: OlderState;
  readonly onLoad: () => void;
}

export default function NotificationsOlderSection({
  state,
  onLoad,
}: NotificationsOlderSectionProps) {
  if (state === "loading") {
    return (
      <p
        className="text-center text-sm text-awc-fg-muted dark:text-gray-400"
        role="status"
      >
        {NOTIFICATIONS_COPY.loadingOlder}
      </p>
    );
  }
  if (state === "error") {
    return (
      <NotificationsLoadError
        message={NOTIFICATIONS_COPY.olderError}
        showHint={false}
        onRetry={onLoad}
      />
    );
  }
  if (state === "done") {
    return (
      <p className="text-center text-sm text-awc-fg-muted dark:text-gray-400">
        {NOTIFICATIONS_COPY.olderDone}
      </p>
    );
  }
  return (
    <div className="flex justify-center">
      <button
        type="button"
        className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
        onClick={onLoad}
      >
        {NOTIFICATIONS_COPY.showOlder}
      </button>
    </div>
  );
}
