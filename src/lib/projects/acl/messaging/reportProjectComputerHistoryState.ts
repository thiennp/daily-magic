import { applyProjectComputerHistoryEvent } from "@/lib/projects/acl/messaging/applyProjectComputerHistoryEvent";
import { listProjectComputerHistoryBacklog } from "@/lib/projects/acl/messaging/listProjectComputerHistoryBacklog";
import type { ProjectComputerHistoryReport } from "@/lib/projects/acl/messaging/projectComputerHistory.constants";
import type { ProjectComputerHistoryState } from "@/lib/projects/acl/messaging/projectComputerHistoryStateMachine";
import { readProjectComputerHistoryState } from "@/lib/projects/acl/messaging/readProjectComputerHistoryState";

export type ReportProjectComputerHistoryStateResult =
  | { readonly ok: true; readonly state: ProjectComputerHistoryState }
  | {
      readonly ok: false;
      readonly code: "illegal_transition" | "backlog_pending";
      readonly state: ProjectComputerHistoryState;
    };

/**
 * Project computer report. "ready": local config is valid
 * (on_configuring → on_ready); from degraded it only counts once the backlog
 * is acked. "degraded": a local write failed (on_ready → degraded).
 */
export const reportProjectComputerHistoryState = async (input: {
  readonly projectId: string;
  readonly report: ProjectComputerHistoryReport;
}): Promise<ReportProjectComputerHistoryStateResult> => {
  if (input.report === "degraded") {
    return applyProjectComputerHistoryEvent({
      projectId: input.projectId,
      event: "computer_write_failed",
    });
  }
  const state = await readProjectComputerHistoryState(input.projectId);
  if (state !== "degraded") {
    return applyProjectComputerHistoryEvent({
      projectId: input.projectId,
      event: "computer_config_valid",
    });
  }
  const backlog = await listProjectComputerHistoryBacklog({
    projectId: input.projectId,
    limit: 1,
  });
  if (backlog.length > 0) {
    return { ok: false, code: "backlog_pending", state };
  }
  return applyProjectComputerHistoryEvent({
    projectId: input.projectId,
    event: "computer_backlog_acked",
  });
};
