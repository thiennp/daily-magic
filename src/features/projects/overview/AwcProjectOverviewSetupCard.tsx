"use client";

import { useMemo } from "react";

import AwcProjectOverviewSetupBar from "@/features/projects/overview/AwcProjectOverviewSetupBar";
import AwcProjectOverviewSetupRow from "@/features/projects/overview/AwcProjectOverviewSetupRow";
import type { OverviewSetupStep } from "@/features/projects/overview/overviewSetupStep.type";
import {
  OVERVIEW_CARD_CLASS,
  OVERVIEW_CTA_GHOST_SM_CLASS,
} from "@/features/projects/overview/overviewChrome.constant";
import { PROJECT_PAGE_OVERVIEW_COPY as C } from "@/features/projects/overview/projectPageOverviewCopy.constant";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import type { ProjectPageNavTarget } from "@/features/projects/projectPageTabs.constant";

interface Props {
  readonly steps: readonly OverviewSetupStep[];
  readonly editCta: ProjectEditOnMacCta;
  readonly onGoto: (tab: ProjectPageNavTarget) => void;
  readonly hidden: boolean;
  readonly onHide: () => void;
}

export default function AwcProjectOverviewSetupCard({
  steps,
  editCta,
  onGoto,
  hidden,
  onHide,
}: Props) {
  const doneCount = steps.filter((s) => s.done).length;
  const total = steps.length;
  const remaining = total - doneCount;
  const next = useMemo(() => steps.find((s) => !s.done), [steps]);
  if (hidden || doneCount === total || next === undefined) {
    return null;
  }
  if (remaining <= 1) {
    return (
      <AwcProjectOverviewSetupBar
        doneCount={doneCount}
        total={total}
        next={next}
        editCta={editCta}
        onGoto={onGoto}
        onHide={onHide}
      />
    );
  }
  const pct = Math.round((doneCount / total) * 100);
  return (
    <section className={OVERVIEW_CARD_CLASS} aria-labelledby="overview-setup-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3
          id="overview-setup-title"
          className="text-[15.5px] font-semibold text-awc-fg dark:text-white"
        >
          {C.setupTitle}
        </h3>
        <span className="flex items-center gap-2">
          <span className="text-[13px] text-awc-fg-muted">
            {doneCount} of {total} done
          </span>
          <button
            type="button"
            className={OVERVIEW_CTA_GHOST_SM_CLASS}
            onClick={onHide}
            aria-label={C.setupHideAria}
          >
            {C.setupHide}
          </button>
        </span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-awc-pill bg-awc-tile dark:bg-white/10"
        role="progressbar"
        aria-valuenow={doneCount}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={C.setupProgressLabel}
      >
        <i
          className="block h-full rounded-awc-pill bg-awc-fg dark:bg-white"
          style={{ width: `${pct}%` }}
        />
      </div>
      <ul className="flex flex-col">
        {steps.map((step, index) => (
          <AwcProjectOverviewSetupRow
            key={step.id}
            step={step}
            isFirst={index === 0}
            editCta={editCta}
            onGoto={onGoto}
          />
        ))}
      </ul>
    </section>
  );
}
