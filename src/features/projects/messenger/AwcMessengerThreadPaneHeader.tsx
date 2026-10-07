"use client";

import AwcMessengerStatusDot from "@/features/projects/messenger/AwcMessengerStatusDot";
import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import { ACTIVITY_LINK_CLASS } from "@/features/projects/messenger/activityChrome.constant";
import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";
import type { AwcMessengerBotStatus } from "@/features/projects/messenger/types/awcProjectMessenger.type";

interface AwcMessengerThreadPaneHeaderProps {
  readonly title: string;
  readonly kindLabel: string;
  readonly status?: AwcMessengerBotStatus;
  readonly showBack: boolean;
  readonly onBack: () => void;
}

/** Thread pane title bar: back link, title, kind · status, access deep link. */
export default function AwcMessengerThreadPaneHeader({
  title,
  kindLabel,
  status,
  showBack,
  onBack,
}: AwcMessengerThreadPaneHeaderProps) {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  const feed = ONE_WINDOW_FEED_COPY;
  return (
  <div className="flex items-center justify-between gap-3 border-b border-awc-border px-4 py-3 dark:border-gray-800">
    <div className="min-w-0">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className={`mb-1 ${ACTIVITY_LINK_CLASS}`}
          aria-label={copy.a11yBack}
        >
          ← {copy.wholeName}
        </button>
      ) : null}
      <h3 className="truncate text-base font-semibold text-awc-fg dark:text-white">
        {title}
      </h3>
      <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-awc-fg-muted">
        <span>{kindLabel}</span>
        {status !== undefined ? (
          <>
            <span aria-hidden>·</span>
            <AwcMessengerStatusDot status={status} />
          </>
        ) : null}
      </div>
    </div>
    <a
      href="#awc-project-access"
      className="shrink-0 text-[12.5px] font-medium text-awc-blue-700 underline-offset-2 hover:underline"
    >
      {feed.accessDeepLink}
    </a>
  </div>
  );
}
