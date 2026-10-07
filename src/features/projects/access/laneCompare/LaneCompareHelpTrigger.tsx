"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

import AppIcon from "@/components/ui/icon/AppIcon";
import { Modal } from "@/components/ui/modal";
import LaneCompareHelpPanel from "@/features/projects/access/laneCompare/LaneCompareHelpPanel";
import { LANE_COMPARE_COPY } from "@/features/projects/access/laneCompare/laneCompareCopy.constant";
import { InfoIcon } from "@/icons";

interface LaneCompareHelpTriggerProps {
  /** Short help line shown next to the (i) — computers or invite mount. */
  readonly hint: string;
  readonly testId?: string;
}

/** (i) opens the two-ways panel; hint stays visible beside the trigger. */
export default function LaneCompareHelpTrigger({
  hint,
  testId = "lane-compare-help-open",
}: LaneCompareHelpTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const copy = LANE_COMPARE_COPY;
  return (
    <div className="flex flex-wrap items-start gap-2 text-sm text-awc-fg-muted dark:text-gray-400">
      <button
        type="button"
        aria-label={copy.openLabel}
        title={copy.openLabel}
        data-testid={testId}
        className="mt-0.5 inline-flex items-center text-current hover:opacity-80"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <AppIcon icon={InfoIcon} size="sm" />
      </button>
      <p className="min-w-0 flex-1 text-[length:var(--awc-fs-row-sub)]">
        {hint}
      </p>
      {isOpen
        ? createPortal(
            <Modal
              isOpen
              onClose={() => {
                setIsOpen(false);
              }}
              className="max-w-xl p-6"
            >
              <LaneCompareHelpPanel />
            </Modal>,
            document.body,
          )
        : null}
    </div>
  );
}
