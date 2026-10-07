"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import type { AwcProjectInboxToast } from "@/features/projects/access/inbox/hooks/useAwcProjectInboxToast";

interface AwcProjectInboxClearBarProps {
  readonly clearing: boolean;
  readonly restoring: boolean;
  readonly toast: AwcProjectInboxToast | null;
  readonly onRequestClear: () => void;
  readonly onUndo: (archiveBatch: string) => void;
}

/**
 * Owner Clear all → archive. Enabled even when empty; disabled while in
 * flight. The toast after Clear all carries Undo for 6s (restores that batch).
 */
export default function AwcProjectInboxClearBar({
  clearing,
  restoring,
  toast,
  onRequestClear,
  onUndo,
}: AwcProjectInboxClearBarProps) {
  const copy = AWC_PROJECT_INBOX_COPY;
  const undoBatch = toast?.undoBatch ?? null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <button
        type="button"
        className={AWC_PROJECT_ACCESS_CTA.danger}
        disabled={clearing}
        onClick={onRequestClear}
      >
        {copy.clearAll.button}
      </button>
      {toast ? (
        <p
          role="status"
          className="flex items-center gap-2 text-[11px] font-medium text-awc-fg dark:text-gray-200"
        >
          <span>{toast.text}</span>
          {undoBatch !== null ? (
            <button
              type="button"
              className="font-semibold underline underline-offset-2"
              disabled={restoring}
              onClick={() => onUndo(undoBatch)}
            >
              {copy.clearAll.undo}
            </button>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
