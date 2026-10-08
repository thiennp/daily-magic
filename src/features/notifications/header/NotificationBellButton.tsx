import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";

interface NotificationBellButtonProps {
  readonly unreadCount: number;
  readonly pendingCount: number;
  readonly isOpen: boolean;
  readonly onClick: () => void;
}

export function formatBellBadge(count: number): string {
  return count > 9 ? "9+" : String(count);
}

export default function NotificationBellButton({
  unreadCount,
  pendingCount,
  isOpen,
  onClick,
}: NotificationBellButtonProps) {
  return (
    <button
      type="button"
      aria-label={NOTIFICATIONS_COPY.bellLabel
        .replace("{n}", String(unreadCount))
        .replace("{m}", String(pendingCount))}
      aria-expanded={isOpen}
      aria-haspopup="true"
      className="relative dropdown-toggle flex items-center justify-center text-awc-fg-muted transition-colors bg-white border border-awc-border rounded-full hover:text-awc-fg h-11 w-11 hover:bg-awc-tile dark:border-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      onClick={onClick}
    >
      {unreadCount > 0 ? (
        <span
          aria-hidden="true"
          data-testid="notification-bell-badge"
          className="absolute -right-1 -top-1 z-10 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-400 px-1 text-[length:var(--awc-fs-chip)] font-semibold leading-none text-white"
        >
          {formatBellBadge(unreadCount)}
        </span>
      ) : null}
      <svg
        className="fill-current"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
