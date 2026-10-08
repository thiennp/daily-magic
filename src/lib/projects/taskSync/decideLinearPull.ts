import { hashTaskSyncFields } from "@/lib/projects/taskSync/hashTaskSyncFields";
import type { TaskSyncFields } from "@/lib/projects/taskSync/taskSync.types";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

export type LinearPullDecision =
  | { readonly apply: false; readonly reason: "unchanged" }
  | { readonly apply: true; readonly fields: TaskSyncFields };

/**
 * Loop guard. Payload without labels cannot tell blocked from in_progress, so a
 * blocked task stays blocked. If the resulting field hash equals the hash we
 * last synced (our own push echoed back, or no real change) → ignore.
 */
export const decideLinearPull = (input: {
  readonly pulled: TaskSyncFields;
  readonly labelsKnown: boolean;
  readonly current: ProjectTaskRecord;
  readonly lastSyncedHash: string | null;
}): LinearPullDecision => {
  const keepBlocked =
    !input.labelsKnown &&
    input.pulled.status === "in_progress" &&
    input.current.status === "blocked";
  const fields: TaskSyncFields = keepBlocked
    ? { ...input.pulled, status: "blocked" }
    : input.pulled;
  return hashTaskSyncFields(fields) === input.lastSyncedHash
    ? { apply: false, reason: "unchanged" }
    : { apply: true, fields };
};
