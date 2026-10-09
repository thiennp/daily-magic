import { readBlockedReason } from "@/lib/projects/tasks/announceProjectTaskBlocked";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import type { ProjectTaskRecordWrite } from "@/lib/projects/tasks/projectTaskRecordWriteQueries";

export type BotTaskReportCheck =
  | { readonly ok: true; readonly blockedReason: string | null }
  | {
      readonly ok: false;
      readonly code: "result_summary_required" | "blocked_reason_required";
    };

/**
 * Bots report what happened: finishing (→ done) needs a resultSummary, and
 * blocking needs a blockedReason (also posted to the project chat).
 */
export const checkBotTaskReport = (input: {
  readonly current: ProjectTaskRecord;
  readonly values: ProjectTaskRecordWrite;
  readonly args: unknown;
  readonly requireResultSummaryOnDone: boolean;
  readonly requireBlockedReason: boolean;
}): BotTaskReportCheck => {
  const { current, values } = input;
  if (
    input.requireResultSummaryOnDone &&
    values.status === "done" &&
    current.status !== "done" &&
    values.resultSummary === null
  ) {
    return { ok: false, code: "result_summary_required" };
  }
  const newlyBlocked =
    values.status === "blocked" && current.status !== "blocked";
  const blockedReason = newlyBlocked ? readBlockedReason(input.args) : null;
  if (input.requireBlockedReason && newlyBlocked && blockedReason === null) {
    return { ok: false, code: "blocked_reason_required" };
  }
  return { ok: true, blockedReason };
};
