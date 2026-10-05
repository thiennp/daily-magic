import {
  AwcPreflightFailureBlockedBody,
  AwcPreflightFailureErroredBody,
} from "@/features/preflight/AwcPreflightFailureBlockedBody";
import { AWC_PREFLIGHT_FAILURE_COPY } from "@/features/preflight/awcPreflightFailureCopy.constant";
import type { AwcPreflightFailureView } from "@/features/preflight/buildAwcPreflightFailureView";

interface AwcPreflightFailureCardProps {
  readonly view: AwcPreflightFailureView;
  /** When true, show the Fix on Mac hint (never claim cloud can clear the check). */
  readonly showFixOnMacHint?: boolean;
}

const alertClassName =
  "mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-100";

/**
 * AWC four-fact preflight card for run / project activity. Presentational only —
 * parent supplies the view (from a Mac-posted payload or explicit UI state).
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
        <div className={alertClassName} role="alert">
          <AwcPreflightFailureErroredBody
            safeMessage={view.safeMessage}
            showFixOnMacHint={showFixOnMacHint}
          />
        </div>
      );
    case "blocked":
      return (
        <div className={alertClassName} role="alert">
          <AwcPreflightFailureBlockedBody
            facts={view.facts}
            showFixOnMacHint={showFixOnMacHint}
          />
        </div>
      );
    default: {
      const _exhaustive: never = view;
      return _exhaustive;
    }
  }
}
