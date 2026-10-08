import { PROJECT_TASK_SYNC_COPY as C } from "@/features/projects/settings/connections/projectTaskSyncCopy.constant";
import type { TaskSyncFailureReason } from "@/features/projects/settings/connections/projectTaskSync.types";

export const taskSyncFailureMessage = (
  reason: TaskSyncFailureReason,
  fallback: string,
): string =>
  reason === "team_required"
    ? C.teamRequired
    : reason === "not_connected"
      ? C.notConnected
      : reason === "sync_disabled"
        ? C.syncDisabled
        : fallback;
