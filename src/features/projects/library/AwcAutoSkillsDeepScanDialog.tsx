"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import AwcAutoSkillsCommitPicker from "@/features/projects/library/AwcAutoSkillsCommitPicker";
import { buildDeepScanChoices } from "@/features/projects/library/utils/deepScanCommitChoices";

interface AwcAutoSkillsDeepScanDialogProps {
  readonly isOpen: boolean;
  /** Commits on the main branch. */
  readonly total: number;
  /** Commits the last scan read. */
  readonly scanned: number;
  readonly onClose: () => void;
  readonly onConfirm: (commits: number) => void;
}

/** Owner picks how many main-branch commits the next scan reads. */
export default function AwcAutoSkillsDeepScanDialog({
  isOpen,
  total,
  scanned,
  onClose,
  onConfirm,
}: AwcAutoSkillsDeepScanDialogProps) {
  const { max, presets } = buildDeepScanChoices(total, scanned);
  const [value, setValue] = useState<number>(presets[0] ?? max);
  const valid = Number.isInteger(value) && value >= 1 && value <= max;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md p-6">
      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (valid) onConfirm(value);
        }}
      >
        <div className="flex flex-col gap-1 pr-10">
          <h2 className="text-base font-semibold text-awc-fg dark:text-white">
            Scan more commits
          </h2>
          <p className="text-[13px] text-awc-fg-muted dark:text-gray-400">
            The main branch has {total} commits; the last scan read {scanned}.
            Older commits can reveal repeated work, but a bigger scan takes
            longer.
          </p>
        </div>
        <AwcAutoSkillsCommitPicker
          value={value}
          max={max}
          maxIsAll={max === total}
          presets={presets}
          onChange={setValue}
        />
        {!valid ? (
          <p
            role="alert"
            className="text-[13px] text-red-600 dark:text-red-400"
          >
            Enter a whole number from 1 to {max}.
          </p>
        ) : null}
        <div className="flex flex-wrap gap-2">
          <Button
            type="submit"
            size="sm"
            disabled={!valid}
            className="min-h-11 sm:min-h-0"
          >
            Scan {valid ? value : ""} commits
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="min-h-11 sm:min-h-0"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
