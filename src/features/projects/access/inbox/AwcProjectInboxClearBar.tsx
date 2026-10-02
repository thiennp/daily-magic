"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";

interface AwcProjectInboxClearBarProps {
  readonly clearing: boolean;
  readonly toast: string | null;
  readonly onRequestClear: () => void;
}

/** Owner Clear all — enabled even when empty; disabled while in flight. */
export default function AwcProjectInboxClearBar({
  clearing,
  toast,
  onRequestClear,
}: AwcProjectInboxClearBarProps) {
  const copy = AWC_PROJECT_INBOX_COPY;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <button
        type="button"
        className={AWC_PROJECT_ACCESS_CTA.danger}
        disabled={clearing}
        onClick={onRequestClear}
      >
        {copy.clearAll}
      </button>
      {toast ? (
        <p className="text-[11px] font-medium text-gray-700 dark:text-gray-200">
          {toast}
        </p>
      ) : null}
    </div>
  );
}
