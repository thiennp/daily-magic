"use client";

import AwcProjectEditOnMacActions from "@/features/projects/AwcProjectEditOnMacActions";
import type { OverviewSetupStep } from "@/features/projects/overview/overviewSetupStep.type";
import {
  OVERVIEW_CTA_SECONDARY_SM_CLASS,
  OVERVIEW_PILL_DONE_CLASS,
} from "@/features/projects/overview/overviewChrome.constant";
import { PROJECT_PAGE_OVERVIEW_COPY as C } from "@/features/projects/overview/projectPageOverviewCopy.constant";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/public-api/types";
import type { ProjectPageNavTarget } from "@/features/projects/projectPageTabs.constant";

interface Props {
  readonly step: OverviewSetupStep;
  readonly isFirst: boolean;
  readonly editCta: ProjectEditOnMacCta;
  readonly onGoto: (tab: ProjectPageNavTarget) => void;
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
      <path
        d="M2.5 6.2 5 8.7 9.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AwcProjectOverviewSetupRow({
  step,
  isFirst,
  editCta,
  onGoto,
}: Props) {
  const action = step.action;
  return (
    <li
      className={`grid grid-cols-[22px_minmax(0,1fr)_auto] items-center gap-3 py-2.5 ${
        isFirst ? "" : "border-t border-awc-border dark:border-gray-800"
      }`}
    >
      <span
        className={`grid h-5 w-5 place-items-center rounded-full border ${
          step.done
            ? "border-awc-fg bg-awc-fg text-awc-surface dark:border-white dark:bg-white dark:text-gray-900"
            : "border-awc-border-strong dark:border-gray-600"
        }`}
        aria-hidden
      >
        {step.done ? <CheckIcon /> : null}
      </span>
      <div className="min-w-0">
        <b
          className={`block text-sm font-medium ${
            step.done
              ? "text-awc-fg-muted line-through decoration-awc-border dark:text-gray-400"
              : "text-awc-fg dark:text-white"
          }`}
        >
          {step.title}
          {step.optional && !step.done ? (
            <span className="ml-1.5 text-[11px] font-medium text-awc-fg-subtle">
              {C.setupOptional}
            </span>
          ) : null}
        </b>
        {step.hint ? (
          <small className="text-[12.5px] text-awc-fg-muted dark:text-gray-400">
            {step.hint}
          </small>
        ) : null}
      </div>
      {action.kind === "none" ? (
        <span className={OVERVIEW_PILL_DONE_CLASS}>{action.label}</span>
      ) : action.kind === "mac" ? (
        <AwcProjectEditOnMacActions
          editCta={{ ...editCta, buttonLabel: action.label }}
          size="compact"
          layout="buttonOnly"
        />
      ) : (
        <button
          type="button"
          className={OVERVIEW_CTA_SECONDARY_SM_CLASS}
          onClick={() => onGoto(action.tab)}
        >
          {action.label}
        </button>
      )}
    </li>
  );
}
