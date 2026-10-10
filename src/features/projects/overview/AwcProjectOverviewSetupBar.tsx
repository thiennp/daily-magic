"use client";

import { AwcProjectEditOnMacActions } from "@/features/projects/public-api/presentation";
import type { OverviewSetupStep } from "@/features/projects/overview/overviewSetupStep.type";
import {
  OVERVIEW_CARD_CLASS,
  OVERVIEW_CTA_GHOST_SM_CLASS,
  OVERVIEW_CTA_SECONDARY_SM_CLASS,
} from "@/features/projects/overview/overviewChrome.constant";
import { PROJECT_PAGE_OVERVIEW_COPY as C } from "@/features/projects/overview/projectPageOverviewCopy.constant";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/public-api/types";
import type { ProjectPageNavTarget } from "@/features/projects/public-api/types";

interface Props {
  readonly doneCount: number;
  readonly total: number;
  readonly next: OverviewSetupStep;
  readonly editCta: ProjectEditOnMacCta;
  readonly onGoto: (tab: ProjectPageNavTarget) => void;
  readonly onHide: () => void;
}

/** Compact one-line setup when ≤1 step remains. */
export default function AwcProjectOverviewSetupBar({
  doneCount,
  total,
  next,
  editCta,
  onGoto,
  onHide,
}: Props) {
  const action = next.action;
  return (
    <section
      className={`${OVERVIEW_CARD_CLASS} !flex-row flex-wrap items-center gap-x-3.5 gap-y-2 !p-2.5 px-4`}
      aria-label={C.setupTitle}
    >
      <span className="text-sm font-semibold text-awc-fg dark:text-white">
        {C.setupBarProgress(doneCount, total)}
      </span>
      <span className="min-w-0 flex-1 text-sm text-awc-fg-muted">
        {C.setupNext(next.title)}
      </span>
      <span className="ml-auto flex items-center gap-1.5">
        {action.kind === "tab" ? (
          <button
            type="button"
            className={OVERVIEW_CTA_SECONDARY_SM_CLASS}
            onClick={() => onGoto(action.tab)}
          >
            {action.label}
          </button>
        ) : null}
        {action.kind === "mac" ? (
          <AwcProjectEditOnMacActions
            editCta={{ ...editCta, buttonLabel: action.label }}
            size="compact"
            layout="buttonOnly"
          />
        ) : null}
        <button
          type="button"
          className={OVERVIEW_CTA_GHOST_SM_CLASS}
          onClick={onHide}
          aria-label={C.setupHideAria}
        >
          {C.setupHide}
        </button>
      </span>
    </section>
  );
}
