"use client";

import {
  OW_KEPT_CHIP_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import { ONE_WINDOW_COMPOSER_COPY } from "@/features/projects/messenger/oneWindow/oneWindowComposerCopy.constant";

interface AwcOneWindowKeptChipProps {
  readonly label: string;
  readonly keepChecked: boolean;
  readonly disabled?: boolean;
  readonly onKeepChange: (checked: boolean) => void;
}

/** KEPT(r) pinned chip + Keep sending checkbox (COMPOSER-LOCK). */
export default function AwcOneWindowKeptChip({
  label,
  keepChecked,
  disabled = false,
  onKeepChange,
}: AwcOneWindowKeptChipProps) {
  const copy = ONE_WINDOW_COMPOSER_COPY;
  return (
    <div className="mb-2 flex flex-wrap items-center gap-2.5">
      <span className={OW_KEPT_CHIP_CLASS}>{label}</span>
      <label className="inline-flex items-center gap-1.5 text-[13px] text-awc-fg-muted">
        <input
          type="checkbox"
          checked={keepChecked}
          disabled={disabled}
          onChange={(event) => {
            onKeepChange(event.target.checked);
          }}
          className="h-4 w-4 accent-awc-primary"
        />
        {copy.chipKeep}
      </label>
    </div>
  );
}
