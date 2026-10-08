"use client";

import {
  PANEL_BUTTON_PRIMARY_CLASS,
  PANEL_BUTTON_SECONDARY_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

interface AwcAutoSkillsActionsProps {
  readonly busy: boolean;
  readonly scanning: boolean;
  readonly scanError: string | null;
  readonly waiting: number;
  readonly open: boolean;
  readonly onScan: () => void;
  readonly onToggleDrafts: () => void;
}

/** "Scan past tasks" and "Review drafts" buttons with scan progress and errors. */
export default function AwcAutoSkillsActions({
  busy,
  scanning,
  scanError,
  waiting,
  open,
  onScan,
  onToggleDrafts,
}: AwcAutoSkillsActionsProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className={PANEL_BUTTON_PRIMARY_CLASS}
          disabled={busy || scanning}
          onClick={onScan}
        >
          {scanning ? (
            <span
              aria-hidden="true"
              className="mr-2 inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
            />
          ) : null}
          {scanning ? "Scanning past tasks…" : "Scan past tasks"}
        </button>
        {waiting > 0 ? (
          <button
            type="button"
            className={PANEL_BUTTON_SECONDARY_CLASS}
            aria-expanded={open}
            onClick={onToggleDrafts}
          >
            {open ? "Hide drafts" : `Review drafts (${waiting})`}
          </button>
        ) : null}
        <span className="text-[12.5px] text-awc-fg-muted dark:text-gray-400">
          Checks finished tasks on your online computers for repeated steps.
        </span>
      </div>
      {scanError !== null ? (
        <p role="alert" className="text-[13px] text-red-600 dark:text-red-400">
          {scanError}
        </p>
      ) : null}
    </div>
  );
}
