"use client";

import AwcAutoSkillsScanHelp from "@/features/projects/library/AwcAutoSkillsScanHelp";
import AwcAutoSkillsCommitsField from "@/features/projects/library/AwcAutoSkillsCommitsField";
import { AUTO_SKILLS_MAX_SCAN_COMMITS } from "@/features/projects/library/autoSkillsScanCommits.constant";
import {
  PANEL_BUTTON_PRIMARY_CLASS,
  PANEL_BUTTON_SECONDARY_CLASS,
} from "@/features/projects/public-api/types";

interface AwcAutoSkillsActionsProps {
  readonly busy: boolean;
  readonly scanning: boolean;
  readonly scanningDocs: boolean;
  readonly scanError: string | null;
  readonly waiting: number;
  readonly open: boolean;
  /** Commits of the main branch to read; NaN while the field is empty. */
  readonly commits: number;
  /** Most commits the folder has (null until a scan has counted them). */
  readonly maxCommits: number | null;
  readonly onCommitsChange: (commits: number) => void;
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
  commits,
  maxCommits,
  onCommitsChange,
  onScan,
  onScanDocs,
  onToggleDrafts,
}: AwcAutoSkillsActionsProps) {
  const max = maxCommits ?? AUTO_SKILLS_MAX_SCAN_COMMITS;
  const validCommits =
    Number.isInteger(commits) && commits >= 1 && commits <= max;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className={PANEL_BUTTON_PRIMARY_CLASS}
          disabled={busy || scanning || !validCommits}
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
        <AwcAutoSkillsCommitsField
          commits={commits}
          max={max}
          valid={validCommits}
          onChange={onCommitsChange}
        />
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
        <AwcAutoSkillsScanHelp commits={validCommits ? commits : null} />
      </div>
      {scanError !== null ? (
        <p role="alert" className="text-[13px] text-red-600 dark:text-red-400">
          {scanError}
        </p>
      ) : null}
    </div>
  );
}
