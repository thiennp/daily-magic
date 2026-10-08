import { stripAgentLiveProgressCliChrome } from "@/features/agent/utils/stripAgentLiveProgressCliChrome";
import { resolveAgentRunReportProgressView } from "@/features/reports/utils/resolveAgentRunReportProgressView";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export interface ProjectReportDetailView {
  readonly statusLabel: string | null;
  readonly reasonLine: string | null;
  readonly body: string;
}

const STATUS_LABELS: Readonly<Record<string, string>> = {
  completed: "Done",
  failed: "Failed",
  stopped: "Stopped",
  expired: "Timed out",
  denied: "Denied",
  running: "Running",
  "in progress": "Running",
  "pending approval": "Waiting for approval",
};

const TERMINAL_RUN_STATUSES: ReadonlySet<string> = new Set([
  AgentRunStatus.COMPLETED,
  AgentRunStatus.FAILED,
  AgentRunStatus.EXPIRED,
  AgentRunStatus.DENIED,
]);

const isStaleLiveSummary = (summary: string): boolean =>
  /^(?:Waiting for your answer|Working on your computer|Task started)/i.test(
    summary.trim(),
  );

/**
 * FAIL2 (Testi long-run run 2, a76d46ac): Reports "What happened" showed the
 * raw `[[WAVE_PLAN]]` block. Show a status, then the host report summary, or
 * the run output without progress / wave / checkpoint markers. A finished
 * run never shows a live-only summary such as "Waiting for your answer…".
 */
export const resolveProjectReportDetailView = (input: {
  readonly run: Pick<
    AgentRunRecord,
    | "status"
    | "reportStatus"
    | "reportSummary"
    | "denialReason"
    | "resultOutput"
    | "resultExitCode"
  >;
  readonly fallbackOutput: string;
}): ProjectReportDetailView => {
  const { run } = input;
  const view = resolveAgentRunReportProgressView({
    ...run,
    runStatus: run.status,
  });
  const isTerminal = TERMINAL_RUN_STATUSES.has(run.status);
  const summary = stripAgentLiveProgressCliChrome(view.summaryLine ?? "");
  const usableSummary =
    summary.length > 0 && !(isTerminal && isStaleLiveSummary(summary))
      ? summary
      : "";
  const output = stripAgentLiveProgressCliChrome(input.fallbackOutput);
  const statusKey = view.statusLabel?.trim().toLowerCase() ?? "";

  return {
    statusLabel:
      statusKey.length > 0 ? (STATUS_LABELS[statusKey] ?? statusKey) : null,
    reasonLine: view.reasonLine,
    body: usableSummary.length > 0 ? usableSummary : output,
  };
};
