import Link from "next/link";

import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";
import {
  ONBOARDING_STEP_IDS,
  ONBOARDING_STEP_LABELS,
  ONBOARDING_STEP_ORDER,
  type OnboardingStepId,
} from "@/features/onboarding/onboardingSteps.constant";
import { buildOnboardingStepHref } from "@/features/onboarding/utils/buildOnboardingStepHref";

interface OnboardingProgressProps {
  readonly active: OnboardingStepId;
  readonly projectId: string | null;
}

/** Progress: project → machine → bot → task (Claude note order). */
export default function OnboardingProgress({
  active,
  projectId,
}: OnboardingProgressProps) {
  const activeN = ONBOARDING_STEP_ORDER[active];
  const pct = activeN * 25;

  return (
    <div className="flex w-full max-w-[760px] flex-col gap-3">
      <p
        className="text-center text-[length:var(--awc-fs-sm)] font-semibold text-awc-fg-muted"
        aria-hidden="true"
      >
        {C.stepOf(activeN)}
      </p>
      <nav aria-label={C.progressLabel}>
        <ol className="m-0 grid list-none grid-cols-4 gap-2 p-0">
          {ONBOARDING_STEP_IDS.map((id) => {
            const n = ONBOARDING_STEP_ORDER[id];
            const done = n < activeN;
            const cur = n === activeN;
            const href = buildOnboardingStepHref(id, projectId);
            const canLink =
              href !== null && !cur && (done || n === activeN + 1);
            const numClass = [
              "relative z-[1] grid h-8 w-8 place-items-center rounded-full border-2 text-sm font-bold no-underline",
              cur
                ? "border-awc-blue-600 bg-awc-blue-600 text-white"
                : done
                  ? "border-awc-ok bg-awc-ok text-white"
                  : "border-awc-border-strong bg-white text-awc-fg-muted",
            ].join(" ");
            return (
              <li
                key={id}
                className={`relative flex flex-col items-center gap-1.5 text-center text-[length:var(--awc-fs-sm)] font-medium before:absolute before:left-[calc(-50%+18px)] before:right-[calc(50%+18px)] before:top-[15px] before:h-0.5 before:content-[''] ${n === 1 ? "before:hidden" : done || cur ? "before:bg-awc-blue-500" : "before:bg-awc-border-strong"} ${cur ? "font-bold text-awc-blue-800" : "text-awc-fg-muted"}`}
                aria-current={cur ? "step" : undefined}
              >
                {canLink && href ? (
                  <Link
                    className={numClass}
                    href={href}
                    aria-label={`Step ${n}: ${ONBOARDING_STEP_LABELS[id]}${done ? " (done)" : ""}`}
                  >
                    {done ? "✓" : n}
                  </Link>
                ) : (
                  <span className={numClass}>{done ? "✓" : n}</span>
                )}
                <span>
                  {ONBOARDING_STEP_LABELS[id]}
                  {cur ? (
                    <span className="sr-only"> (current step)</span>
                  ) : null}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-awc-tile-2"
        role="progressbar"
        aria-label={C.progressLabel}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <i
          className="block h-full rounded-full bg-awc-blue-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
