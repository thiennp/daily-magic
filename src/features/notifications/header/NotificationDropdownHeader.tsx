import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";

interface NotificationDropdownHeaderProps {
  readonly canMarkAll: boolean;
  readonly onMarkAllRead: () => void;
  readonly onToggle: () => void;
}

export default function NotificationDropdownHeader({
  canMarkAll,
  onMarkAllRead,
  onToggle,
}: NotificationDropdownHeaderProps) {
  return (
    <div className="mb-3 flex items-center justify-between border-b border-awc-border pb-3 dark:border-gray-700">
      <h5 className="text-lg font-semibold text-awc-fg dark:text-gray-200">
        {NOTIFICATIONS_COPY.popoverTitle}
      </h5>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
          disabled={!canMarkAll}
          onClick={onMarkAllRead}
        >
          {NOTIFICATIONS_COPY.markAllRead}
        </button>
        <button
          type="button"
          aria-label="Close notifications"
          onClick={onToggle}
          className="text-awc-fg-muted transition dark:text-gray-400 hover:text-awc-fg dark:hover:text-gray-200"
        >
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
