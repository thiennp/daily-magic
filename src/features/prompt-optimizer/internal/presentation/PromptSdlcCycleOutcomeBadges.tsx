import type { ReactElement } from "react";

import {
  labelPromptSdlcCycleOutcome,
  PROMPT_SDLC_OUTCOME_COPY,
} from "@/features/prompt-optimizer/internal/presentation/promptSdlcOutcomeLabels.constant";
import type { PromptSdlcCycleStatus } from "@/lib/promptOptimizer/PromptSdlcCycleStatus.constant";

interface PromptSdlcCycleOutcomeBadgesProps {
  readonly status: PromptSdlcCycleStatus;
  readonly errorKind?: string | null;
  readonly passed?: boolean | null;
  readonly score?: number | null;
  readonly showUseThisHint?: boolean;
}

const TONE_CLASS: Record<
  "passed" | "failed" | "stopped" | "live" | "paused",
  string
> = {
  passed:
    "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-100",
  failed:
    "border-red-300 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/50 dark:text-red-100",
  stopped:
    "border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100",
  live: "border-sky-300 bg-sky-50 text-sky-900 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-100",
  paused:
    "border-violet-300 bg-violet-50 text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100",
};

export default function PromptSdlcCycleOutcomeBadges({
  status,
  errorKind,
  passed,
  score,
  showUseThisHint = false,
}: PromptSdlcCycleOutcomeBadgesProps): ReactElement {
  const outcome = labelPromptSdlcCycleOutcome({ status, errorKind });
  const useThisOk = status === "passed";

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${TONE_CLASS[outcome.tone]}`}
          title={PROMPT_SDLC_OUTCOME_COPY.failCleanTip}
        >
          {outcome.label}
        </span>
        {passed === true ? (
          <span className="inline-flex items-center rounded-full border border-emerald-300 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:border-emerald-800 dark:text-emerald-200">
            evaluate passed
          </span>
        ) : null}
        {passed === false ? (
          <span className="inline-flex items-center rounded-full border border-red-300 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:border-red-800 dark:text-red-200">
            evaluate failed
          </span>
        ) : null}
        {score !== null && score !== undefined ? (
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Score {score}
          </span>
        ) : null}
        <span
          className="cursor-help text-xs text-gray-500 underline decoration-dotted underline-offset-2 dark:text-gray-400"
          title={PROMPT_SDLC_OUTCOME_COPY.recommendTimeoutTip}
        >
          fail-clean timeout
        </span>
      </div>
      {showUseThisHint ? (
        <p
          className={`text-xs ${useThisOk ? "text-emerald-800 dark:text-emerald-200" : "text-amber-800 dark:text-amber-200"}`}
        >
          {useThisOk
            ? "useThisPrompt is valid — status is passed."
            : PROMPT_SDLC_OUTCOME_COPY.useThisOnlyWhenPassed}
        </p>
      ) : null}
    </div>
  );
}
