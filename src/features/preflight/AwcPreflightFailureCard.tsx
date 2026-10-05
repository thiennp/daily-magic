import { AwcPreflightFailureBlockedBody } from "@/features/preflight/AwcPreflightFailureBlockedBody";
import { AwcPreflightFailureErroredBody } from "@/features/preflight/AwcPreflightFailureHints";
import { AWC_PREFLIGHT_FAILURE_COPY } from "@/features/preflight/awcPreflightFailureCopy.constant";
import type { AwcPreflightFailureView } from "@/features/preflight/buildAwcPreflightFailureView";

interface AwcPreflightFailureCardProps {
  readonly view: AwcPreflightFailureView;
  /** When true, show the Fix on Mac hint (never claim cloud can clear the check). */
  readonly showFixOnMacHint?: boolean;
}

const errorAlertClassName =
  "mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-100";

const warnAlertClassName =
  "mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100";

/**
 * AWC preflight card for run / project activity. Presentational only.
 */
export default function AwcPreflightFailureCard({
  view,
  showFixOnMacHint = true,
}: AwcPreflightFailureCardProps) {
  switch (view.kind) {
    case "idle":
    case "passed":
      return null;
    case "running":
      return (
        <p
          className="mt-3 text-sm text-gray-600 dark:text-gray-300"
          role="status"
        >
          {AWC_PREFLIGHT_FAILURE_COPY.running}
        </p>
      );
    case "skipped":
      return (
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          {AWC_PREFLIGHT_FAILURE_COPY.skipped}
        </p>
      );
    case "errored":
      return (
        <div className={errorAlertClassName} role="alert">
          <AwcPreflightFailureErroredBody
            safeMessage={view.safeMessage}
            showFixOnMacHint={showFixOnMacHint}
          />
        </div>
      );
    case "blocked":
      return (
        <div className={errorAlertClassName} role="alert">
          <AwcPreflightFailureBlockedBody
            presentation={view.presentation}
            showFixOnMacHint={showFixOnMacHint}
          />
        </div>
      );
    case "warned":
      return (
        <div className={warnAlertClassName} role="status">
          <AwcPreflightFailureBlockedBody
            presentation={view.presentation}
            showFixOnMacHint={false}
            soft
          />
        </div>
      );
    default: {
      const _exhaustive: never = view;
      return _exhaustive;
    }
  }
}
