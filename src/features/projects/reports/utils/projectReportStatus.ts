import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";

export type ReportStatusKind =
  "done" | "failed" | "running" | "waiting" | "denied" | "timed_out";

export type ReportStatusFilter =
  "all" | "done" | "failed" | "running" | "needs";

const KIND_BY_STATUS: Readonly<Record<string, ReportStatusKind>> = {
  [AgentRunStatus.COMPLETED]: "done",
  [AgentRunStatus.FAILED]: "failed",
  [AgentRunStatus.RUNNING]: "running",
  [AgentRunStatus.PENDING_APPROVAL]: "waiting",
  [AgentRunStatus.DENIED]: "denied",
  [AgentRunStatus.EXPIRED]: "timed_out",
};

export const REPORT_STATUS_LABEL: Readonly<Record<ReportStatusKind, string>> = {
  done: "Done",
  failed: "Failed",
  running: "Running",
  waiting: "Waiting",
  denied: "Denied",
  timed_out: "Timed out",
};

export const toReportStatusKind = (status: string): ReportStatusKind =>
  KIND_BY_STATUS[status] ?? "running";

/** Chip filter -> matching kinds ("Needs you" = waiting for an approval). */
export const matchesStatusFilter = (
  kind: ReportStatusKind,
  filter: ReportStatusFilter,
): boolean =>
  filter === "all" ||
  (filter === "needs" ? kind === "waiting" : filter === kind);
