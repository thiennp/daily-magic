import { postLinearTaskSyncBatch } from "@/features/projects/settings/connections/requestLinearTaskSync";
import type { TaskSyncResult } from "@/features/projects/settings/connections/projectTaskSync.types";

export const MAX_TASK_SYNC_ROUNDS = 20;

export type LinearTaskSyncTotals = {
  readonly pushed: number;
  readonly failed: number;
};

/** POST /sync until nothing remains (or the round cap); reports progress. */
export const runLinearTaskSyncRounds = async (input: {
  readonly projectId: string;
  readonly signal: AbortSignal;
  readonly onProgress: (remaining: number) => void;
}): Promise<TaskSyncResult<LinearTaskSyncTotals>> => {
  const step = async (
    round: number,
    totals: LinearTaskSyncTotals,
  ): Promise<TaskSyncResult<LinearTaskSyncTotals>> => {
    const result = await postLinearTaskSyncBatch(input.projectId, input.signal);
    if (!result.ok) return result;
    const next = {
      pushed: totals.pushed + result.value.pushed,
      failed: totals.failed + result.value.failed,
    };
    input.onProgress(result.value.remaining);
    const done =
      result.value.remaining <= 0 ||
      round >= MAX_TASK_SYNC_ROUNDS ||
      input.signal.aborted;
    return done ? { ok: true, value: next } : step(round + 1, next);
  };
  return step(1, { pushed: 0, failed: 0 });
};
