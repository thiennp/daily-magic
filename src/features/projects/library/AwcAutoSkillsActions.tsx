"use client";

import {
  PANEL_BUTTON_PRIMARY_CLASS,
  PANEL_BUTTON_SECONDARY_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

interface AwcAutoSkillsActionsProps {
  readonly busy: boolean;
  readonly scanning: boolean;
  readonly scanningDocs: boolean;
  readonly scanError: string | null;
  readonly waiting: number;
  readonly open: boolean;
  readonly onScan: () => void;
  readonly onScanDocs: () => void;
  readonly onToggleDrafts: () => void;
}

/** "Scan past tasks", "Scan project docs" and "Review drafts" buttons with scan progress and errors. */
export default function AwcAutoSkillsActions({
  busy,
  scanning,
  scanningDocs,
  scanError,
  waiting,
  open,
  onScan,
  onScanDocs,
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
          {scanning && !scanningDocs
            ? "Scanning past tasks…"
            : "Scan past tasks"}
        </button>
        <button
          type="button"
          className={PANEL_BUTTON_SECONDARY_CLASS}
          disabled={busy || scanning}
          onClick={onScanDocs}
        >
          {scanning && scanningDocs
            ? "Scanning project docs…"
            : "Scan project docs"}
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
        <span className="flex flex-col text-[12.5px] text-awc-fg-muted dark:text-gray-400">
          <span>
            Tasks: checks finished tasks on your online computers for repeated
            steps.
          </span>
          <span>
            Docs: turns this folder&apos;s skills, commands and Q&amp;A into
            questions. No AI runs; the text is stored in your cloud until you
            answer.
          </span>
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
