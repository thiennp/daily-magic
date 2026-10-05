import {
  ACTIVITY_SELECTED_THREAD_CLASS,
  ACTIVITY_UNREAD_BADGE_CLASS,
} from "@/features/projects/messenger/activityChrome.constant";
import AwcMessengerStatusDot from "@/features/projects/messenger/AwcMessengerStatusDot";
import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import type { AwcMessengerBotStatus } from "@/features/projects/messenger/types/awcProjectMessenger.type";

interface AwcMessengerThreadRowProps {
  readonly name: string;
  readonly subtitle: string;
  readonly status?: AwcMessengerBotStatus;
  readonly unreadCount: number;
  readonly selected: boolean;
  readonly pinned?: boolean;
  readonly onSelect: () => void;
}

export default function AwcMessengerThreadRow({
  name,
  subtitle,
  status,
  unreadCount,
  selected,
  pinned = false,
  onSelect,
}: AwcMessengerThreadRowProps) {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={selected ? "true" : undefined}
      className={`flex w-full items-start gap-2.5 border-l-4 px-3.5 py-2.5 text-left ${
        selected
          ? ACTIVITY_SELECTED_THREAD_CLASS
          : "border-transparent hover:bg-gray-50 dark:hover:bg-white/[0.03]"
      }`}
    >
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white">
          {name}
          {pinned ? (
            <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-200">
              {copy.pinned}
            </span>
          ) : null}
        </span>
        <span className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <span>{subtitle}</span>
          {status !== undefined ? (
            <>
              <span aria-hidden>·</span>
              <AwcMessengerStatusDot status={status} />
            </>
          ) : null}
        </span>
      </span>
      {unreadCount > 0 ? (
        <span
          className={ACTIVITY_UNREAD_BADGE_CLASS}
          aria-label={`${unreadCount} unread`}
        >
          {unreadCount}
        </span>
      ) : null}
    </button>
  );
}
