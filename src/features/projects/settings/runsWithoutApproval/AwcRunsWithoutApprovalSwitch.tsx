import { RUNS_WITHOUT_APPROVAL_COPY as C } from "@/features/projects/settings/runsWithoutApproval/runsWithoutApprovalCopy.constant";
import { resolveRunsWithoutApprovalDisabledReason } from "@/features/projects/settings/runsWithoutApproval/resolveRunsWithoutApprovalDisabledReason";
import type { RunsWithoutApprovalSwitchView } from "@/features/projects/settings/runsWithoutApproval/runsWithoutApproval.type";

interface AwcRunsWithoutApprovalSwitchProps extends RunsWithoutApprovalSwitchView {
  readonly onToggle: () => void;
  readonly onRetry: () => void;
}

const REASON_ID = "p-set-rwa-reason";

/** Presentational S0-2 switch row (owner only; the caller hides it for others). */
export default function AwcRunsWithoutApprovalSwitch({
  onToggle,
  onRetry,
  ...view
}: AwcRunsWithoutApprovalSwitchProps) {
  const reason = resolveRunsWithoutApprovalDisabledReason(view);
  const disabled = reason !== null;
  const on = view.enabled && view.loadState === "ready";

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-describedby={disabled ? REASON_ID : undefined}
        disabled={disabled}
        onClick={onToggle}
        className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-all hover:bg-gray-100/70 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white/10"
      >
        <span className="min-w-0 flex-1">
          <span className="block font-medium text-gray-800 dark:text-white/90">
            {C.label}
          </span>
          <span className="mt-0.5 block text-[13px] text-gray-500 dark:text-gray-400">
            {C.hint}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={`relative inline-flex h-7 w-[46px] shrink-0 rounded-full transition-colors ${
            on ? "bg-gray-800 dark:bg-white/80" : "bg-gray-200 dark:bg-white/15"
          }`}
        >
          <span
            className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
              on ? "translate-x-[18px]" : "translate-x-0.5"
            }`}
          />
        </span>
      </button>
      {reason !== null ? (
        <p id={REASON_ID} className="px-3.5 text-[13px] text-gray-500 dark:text-gray-400">
          {reason}{" "}
          {view.loadState === "error" ? (
            <button
              type="button"
              onClick={onRetry}
              className="font-medium text-gray-700 underline dark:text-gray-200"
            >
              {C.retry}
            </button>
          ) : null}
        </p>
      ) : null}
      {view.saveFailed && reason === null ? (
        <p role="alert" className="px-3.5 text-[13px] text-error-600 dark:text-error-400">
          {C.saveError}
        </p>
      ) : null}
    </div>
  );
}
