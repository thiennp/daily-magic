"use client";

import AwcProjectTaskSyncControls from "@/features/projects/settings/connections/AwcProjectTaskSyncControls";
import AwcProjectTaskSyncStatusLines from "@/features/projects/settings/connections/AwcProjectTaskSyncStatusLines";
import { formatProjectConnectionsCopy as fmt } from "@/features/projects/settings/connections/projectConnectionsCopy.constant";
import { PROJECT_TASK_SYNC_COPY as C } from "@/features/projects/settings/connections/projectTaskSyncCopy.constant";
import { useProjectTaskSyncLinear } from "@/features/projects/settings/connections/useProjectTaskSyncLinear";
import { AWC_TASKS_SECONDARY_BUTTON_CLASS } from "@/features/projects/tasks/awcProjectTasksChrome.constant";

interface AwcProjectTaskSyncBlockProps {
  readonly projectId: string;
}

/** Owner-only "Task sync" block under a connected Linear row. */
export default function AwcProjectTaskSyncBlock({
  projectId,
}: AwcProjectTaskSyncBlockProps) {
  const sync = useProjectTaskSyncLinear(projectId, true);
  const { loadState, state } = sync;
  const syncing = sync.syncLeft !== null;

  if (loadState === "unavailable") return null;

  return (
    <section className="basis-full space-y-2 border-t border-awc-border/80 pt-3 dark:border-gray-800/80">
      <h3 className="text-[13px] font-semibold text-awc-fg dark:text-white/90">
        {C.heading}
      </h3>
      {loadState === "loading" ? (
        <p
          className="h-4 w-48 animate-pulse rounded bg-awc-fill"
          aria-label={C.loading}
        />
      ) : null}
      {loadState === "error" ? (
        <p className="text-[13px] text-error-600 dark:text-error-400">
          {C.loadError}{" "}
          <button type="button" className="underline" onClick={sync.reload}>
            {C.retry}
          </button>
        </p>
      ) : null}
      {state !== null && loadState === "ready" ? (
        <>
          <AwcProjectTaskSyncControls
            state={state}
            busy={sync.saving || syncing}
            onUpdate={(change) => void sync.update(change)}
          />
          <AwcProjectTaskSyncStatusLines state={state} />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className={AWC_TASKS_SECONDARY_BUTTON_CLASS}
              disabled={!state.enabled || sync.saving || syncing}
              onClick={() => void sync.syncNow()}
            >
              {syncing
                ? fmt(C.syncing, { count: String(sync.syncLeft) })
                : C.syncNow}
            </button>
            {sync.syncSummary !== null ? (
              <span className="text-[13px] text-awc-fg-muted">
                {sync.syncSummary}
              </span>
            ) : null}
          </div>
          {sync.notice !== null ? (
            <p className="text-[13px] text-error-600 dark:text-error-400">
              {sync.notice}
            </p>
          ) : null}
        </>
      ) : null}
    </section>
  );
}
