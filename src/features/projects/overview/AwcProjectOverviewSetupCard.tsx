"use client";

import AwcProjectOverviewSetupRow from "@/features/projects/overview/AwcProjectOverviewSetupRow";
import type { OverviewSetupStep } from "@/features/projects/overview/overviewSetupStep.type";
import {
  OVERVIEW_CARD_CLASS,
  OVERVIEW_PILL_NEUTRAL_CLASS,
} from "@/features/projects/overview/overviewChrome.constant";
import { PROJECT_PAGE_OVERVIEW_COPY as C } from "@/features/projects/overview/projectPageOverviewCopy.constant";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import type { ProjectPageNavTarget } from "@/features/projects/projectPageTabs.constant";

interface AwcProjectOverviewSetupCardProps {
  readonly steps: readonly OverviewSetupStep[];
  readonly deviceDisplayName: string;
  readonly editCta: ProjectEditOnMacCta;
  readonly onGoto: (tab: ProjectPageNavTarget) => void;
}

export default function AwcProjectOverviewSetupCard({
  steps,
  deviceDisplayName,
  editCta,
  onGoto,
}: AwcProjectOverviewSetupCardProps) {
  const doneCount = steps.filter((step) => step.done).length;
  const total = steps.length;
  const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100);
  const device = deviceDisplayName.trim() || "Mac";

  return (
    <section className={OVERVIEW_CARD_CLASS} aria-labelledby="overview-setup-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2
            id="overview-setup-title"
            className="text-[17px] font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            {C.setupTitle}
          </h2>
          <p className="mt-0.5 max-w-[62ch] text-[13px] text-gray-500 dark:text-gray-400">
            {C.setupSubtitle(doneCount, total, device)}
          </p>
        </div>
        <span className={OVERVIEW_PILL_NEUTRAL_CLASS}>
          {doneCount} / {total}
        </span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10"
        role="progressbar"
        aria-valuenow={doneCount}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={C.setupProgressLabel}
      >
        <i
          className="block h-full rounded-full bg-gray-900 dark:bg-white"
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
