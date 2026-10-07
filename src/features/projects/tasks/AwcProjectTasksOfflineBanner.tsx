import { AWC_TASKS_SECONDARY_BUTTON_CLASS } from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";

/** Exact design offline EN; sand tile-2 banner (PALETTE-LOCK). */
export default function AwcProjectTasksOfflineBanner({
  onRetry,
}: {
  readonly onRetry?: () => void;
}) {
  return (
    <div
      role="status"
      className="mb-1 flex flex-wrap items-center gap-2.5 rounded-lg border border-awc-border-strong bg-awc-tile-2 px-3.5 py-2.5 text-[13px] font-medium text-awc-fg"
    >
      <span
        className="inline-grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full border-[1.5px] border-awc-fg text-[12px] font-bold"
        aria-hidden="true"
      >
        !
      </span>
      <p className="m-0 min-w-0 flex-1">{C.offline}</p>
      {onRetry !== undefined ? (
        <button type="button" className={`${AWC_TASKS_SECONDARY_BUTTON_CLASS} !py-1 !text-[13px]`} onClick={onRetry}>
          {C.offlineRetry}
        </button>
      ) : null}
    </div>
  );
}
