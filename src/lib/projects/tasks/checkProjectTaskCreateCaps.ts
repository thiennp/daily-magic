import { computeHourlyDispatchRetryAfter } from "@/lib/projects/acl/messaging/computeHourlyDispatchRetryAfter";
import {
  countProjectTaskRecords,
  loadProjectTaskHourlyCreates,
} from "@/lib/projects/tasks/projectTaskRecordReadQueries";
import {
  PROJECT_TASK_CAP_HINT,
  PROJECT_TASK_HOURLY_CREATE_CAP,
  PROJECT_TASK_PROJECT_ROW_CAP,
} from "@/lib/projects/tasks/projectTaskTools.constant";

export type ProjectTaskCreateCapFailure =
  | {
      readonly ok: false;
      readonly code: "task_cap_reached";
      readonly limit: number;
      readonly hint: string;
    }
  | {
      readonly ok: false;
      readonly code: "rate_limited";
      readonly retryAfterSeconds?: number;
      readonly retryAfterAt?: string;
    };

/**
 * Create caps: 500 rows / project (task_cap_reached with limit + hint), then
 * 300 creates / hour / caller (retry-after).
 */
export const checkProjectTaskCreateCaps = async (input: {
  readonly projectId: string;
  readonly creatorUserId: string;
  readonly now?: Date;
}): Promise<{ readonly ok: true } | ProjectTaskCreateCapFailure> => {
  const rows = await countProjectTaskRecords(input.projectId);
  if (rows >= PROJECT_TASK_PROJECT_ROW_CAP) {
    return {
      ok: false,
      code: "task_cap_reached",
      limit: PROJECT_TASK_PROJECT_ROW_CAP,
      hint: PROJECT_TASK_CAP_HINT,
    };
  }
  const creates = await loadProjectTaskHourlyCreates({
    creatorUserId: input.creatorUserId,
  });
  if (creates.count < PROJECT_TASK_HOURLY_CREATE_CAP) return { ok: true };
  const retry =
    creates.oldestAt === null
      ? {}
      : computeHourlyDispatchRetryAfter({
          oldestCreatedAt: creates.oldestAt,
          now: input.now ?? new Date(),
        });
  return { ok: false, code: "rate_limited", ...retry };
};
