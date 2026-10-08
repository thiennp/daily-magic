import { formatProjectConnectionsCopy as fmt } from "@/features/projects/settings/connections/projectConnectionsCopy.constant";
import { PROJECT_TASK_SYNC_COPY as C } from "@/features/projects/settings/connections/projectTaskSyncCopy.constant";
import type { LinearTaskSyncState } from "@/features/projects/settings/connections/projectTaskSync.types";
import { formatRelativeTimeAgo } from "@/lib/time/formatRelativeTimeAgo";

/** Linked count, last sync, webhook state, and the last sync error. */
export default function AwcProjectTaskSyncStatusLines({
  state,
}: {
  readonly state: LinearTaskSyncState;
}) {
  const relative = formatRelativeTimeAgo(state.lastSyncedAt);
  return (
    <ul className="space-y-0.5 text-[13px] text-awc-fg-muted dark:text-gray-300">
      <li>{fmt(C.linkedTasks, { count: String(state.linkedCount) })}</li>
      <li>
        {relative === null
          ? C.neverSynced
          : fmt(C.lastSynced, { time: relative })}
      </li>
      <li>{state.webhookActive ? C.webhookOn : C.webhookOff}</li>
      {state.lastError !== null ? (
        <li className="text-error-600 dark:text-error-400">
          {state.lastError}
        </li>
      ) : null}
    </ul>
  );
}
