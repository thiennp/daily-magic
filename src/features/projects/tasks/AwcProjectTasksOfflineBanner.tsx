import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import { PANEL_BUTTON_SECONDARY_CLASS } from "@/features/projects/projectPagePanelChrome.constant";

/** Exact Dispatch offline EN; sand tile-2 banner (PALETTE-LOCK). */
export default function AwcProjectTasksOfflineBanner({
  onRetry,
}: {
  readonly onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-awc-border-strong bg-awc-tile-2 px-3 py-2 text-[13px] text-awc-fg dark:border-gray-600 dark:bg-white/[0.04] dark:text-gray-100"
    >
      <span>{C.offline}</span>
      {onRetry !== undefined ? (
        <button type="button" className={PANEL_BUTTON_SECONDARY_CLASS} onClick={onRetry}>
          {C.offlineRetry}
        </button>
      ) : null}
    </div>
  );
}
