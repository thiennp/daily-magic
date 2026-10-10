"use client";

import { useState } from "react";

import AwcAutoSkillsDeepScanDialog from "@/features/projects/library/AwcAutoSkillsDeepScanDialog";
import { PANEL_BUTTON_SECONDARY_CLASS } from "@/features/projects/public-api/types";

interface AwcAutoSkillsDeeperScanProps {
  /** Commits on the main branch. */
  readonly total: number | null;
  /** Commits the last scan read. */
  readonly scanned: number | null;
  readonly busy: boolean;
  readonly onScan: (commits: number) => void;
}

/** After a scan of a git folder: says how far back it read and offers a deeper one. */
export default function AwcAutoSkillsDeeperScan({
  total,
  scanned,
  busy,
  onScan,
}: AwcAutoSkillsDeeperScanProps) {
  const [open, setOpen] = useState(false);
  if (total === null || scanned === null || total <= scanned) {
    return null;
  }
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-awc-fg-muted dark:text-gray-300">
      <span>
        This folder uses git. Scanned the last {scanned} of {total} commits on
        the main branch. Scan further back?
      </span>
      <button
        type="button"
        className={PANEL_BUTTON_SECONDARY_CLASS}
        disabled={busy}
        onClick={() => setOpen(true)}
      >
        Choose how many…
      </button>
      {open ? (
        <AwcAutoSkillsDeepScanDialog
          isOpen
          total={total}
          scanned={scanned}
          onClose={() => setOpen(false)}
          onConfirm={(commits) => {
            setOpen(false);
            onScan(commits);
          }}
        />
      ) : null}
    </div>
  );
}
