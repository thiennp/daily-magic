"use client";

import AwcProjectEditOnMacActions from "@/features/projects/AwcProjectEditOnMacActions";
import type { OverviewSetupStep } from "@/features/projects/overview/overviewSetupStep.type";
import {
  OVERVIEW_CTA_SECONDARY_SM_CLASS,
  OVERVIEW_PILL_DONE_CLASS,
} from "@/features/projects/overview/overviewChrome.constant";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import type { ProjectPageTabId } from "@/features/projects/projectPageTabs.constant";

interface AwcProjectOverviewSetupRowProps {
  readonly step: OverviewSetupStep;
  readonly isFirst: boolean;
  readonly editCta: ProjectEditOnMacCta;
  readonly onGoto: (tab: ProjectPageTabId) => void;
}

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path
      d="M2.5 6.2 5 8.6l4.5-5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function AwcProjectOverviewSetupRow({
  step,
  isFirst,
  editCta,
  onGoto,
}: AwcProjectOverviewSetupRowProps) {
  const action = step.action;
  return (
    <li
      className={`grid grid-cols-[22px_minmax(0,1fr)_auto] items-center gap-3 py-2.5 ${
        isFirst ? "" : "border-t border-gray-200 dark:border-gray-800"
      }`}
    >
      <span
        className={`grid h-5 w-5 place-items-center rounded-full border ${
          step.done
            ? "border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900"
            : "border-gray-300 dark:border-gray-600"
        }`}
        aria-hidden
      >
        {step.done ? <CheckIcon /> : null}
      </span>
      <div className="min-w-0">
        <b
          className={`block text-sm font-medium ${
            step.done
              ? "text-gray-500 line-through decoration-gray-400/50 dark:text-gray-400"
              : "text-gray-900 dark:text-white"
          }`}
        >
          {step.title}
        </b>
        {step.hint ? (
          <small className="text-[12.5px] text-gray-500 dark:text-gray-400">
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
          onClick={() => {
            onGoto(action.tab);
          }}
        >
          {action.label}
        </button>
      )}
    </li>
  );
}
