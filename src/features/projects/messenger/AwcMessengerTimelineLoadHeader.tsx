"use client";

import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import { ACTIVITY_CTA_PRIMARY_CLASS } from "@/features/projects/messenger/activityChrome.constant";

interface AwcMessengerTimelineLoadHeaderProps {
  readonly loadingOlder: boolean;
  readonly canLoadOlder: boolean;
  readonly reachedStart: boolean;
  readonly projectComputerOffline: boolean;
  readonly onLoadOlder: () => void;
}

/**
 * Top-of-timeline chrome: spinner, Load older fallback, start marker, or
 * lost project-computer connection (Dispatch project_computer_offline).
 */
export default function AwcMessengerTimelineLoadHeader({
  loadingOlder,
  canLoadOlder,
  reachedStart,
  projectComputerOffline,
  onLoadOlder,
}: AwcMessengerTimelineLoadHeaderProps) {
  const copy = AWC_PROJECT_MESSENGER_COPY;

  if (projectComputerOffline) {
    return (
      <div
        className="flex flex-col items-center gap-2 px-3 py-3 text-center"
        role="alert"
      >
        <p className="max-w-sm text-xs text-gray-600 dark:text-gray-300">
          {copy.projectComputerOffline}
        </p>
        <button
          type="button"
          onClick={onLoadOlder}
          disabled={loadingOlder}
          className={ACTIVITY_CTA_PRIMARY_CLASS}
        >
          {copy.projectComputerOfflineRetry}
        </button>
      </div>
    );
  }

  if (loadingOlder) {
    return (
      <div
        className="flex items-center justify-center gap-2 px-3 py-2 text-xs text-gray-500"
        role="status"
        aria-live="polite"
      >
        <span
          className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700 dark:border-gray-600 dark:border-t-gray-200"
          aria-hidden
        />
        <span>{copy.loadingOlder}</span>
      </div>
    );
  }

  if (reachedStart) {
    return (
      <p className="px-3 py-2 text-center text-[11px] font-medium uppercase tracking-wide text-gray-400">
        {copy.startOfConversation}
      </p>
    );
  }

  if (canLoadOlder) {
    return (
      <div className="flex justify-center px-3 py-2">
        <button
          type="button"
          onClick={onLoadOlder}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-white/[0.04]"
        >
          {copy.loadOlder}
        </button>
      </div>
    );
  }

  return null;
}
