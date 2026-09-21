"use client";

interface WorkflowRunStepProgressProps {
  readonly stepIndex: number;
  readonly totalSteps?: number;
}

export default function WorkflowRunStepProgress({
  stepIndex,
  totalSteps,
}: WorkflowRunStepProgressProps) {
  const safeTotal =
    totalSteps !== undefined && totalSteps > 0 ? totalSteps : undefined;
  const progressPercent =
    safeTotal === undefined
      ? undefined
      : Math.min(100, Math.round(((stepIndex + 1) / safeTotal) * 100));

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span>
          {safeTotal === undefined
            ? `Step ${stepIndex + 1}`
            : `Step ${stepIndex + 1} of ${safeTotal}`}
        </span>
        {progressPercent !== undefined ? <span>{progressPercent}%</span> : null}
      </div>
      {progressPercent !== undefined ? (
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-brand-500 transition-[width] duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}
