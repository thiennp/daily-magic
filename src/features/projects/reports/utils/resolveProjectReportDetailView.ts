import { stripAgentLiveProgressCliChrome } from "@/features/agent/utils/stripAgentLiveProgressCliChrome";
import { dropRepeatedReportBodyLines } from "@/features/projects/reports/utils/dropRepeatedReportBodyLines";
import { resolveProjectReportFallbackBody } from "@/features/projects/reports/utils/resolveProjectReportFallbackBody";
import { stripAgentRunReportMarkerFragments } from "@/features/projects/reports/utils/stripAgentRunReportMarkerFragments";
import { resolveAgentRunReportProgressView } from "@/features/reports/utils/resolveAgentRunReportProgressView";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import {
  pickReportField,
  toProjectReportStatusLabel,
} from "@/features/projects/reports/utils/projectReportDetailLabels";

export interface ProjectReportDetailView {
  readonly statusLabel: string | null;
  readonly reasonLine: string | null;
  readonly body: string;
}

const TERMINAL_RUN_STATUSES: ReadonlySet<string> = new Set([
  AgentRunStatus.COMPLETED,
  AgentRunStatus.FAILED,
  AgentRunStatus.EXPIRED,
  AgentRunStatus.DENIED,
]);

const isStaleLiveSummary = (summary: string): boolean =>
  /^(?:Waiting for|Working on your computer|Task started|Continuing after your answer)/i.test(
    summary.trim(),
  );

const WAITING_SUMMARY = /^Waiting for your answer/i;

/**
 * FAIL2 (a76d46ac) / b8c56ef0: Reports "What happened" shows a status, then
 * the host report summary, or the run output without progress / wave /
 * checkpoint markers (also cut-off fragments from the 120-char Neon meta).
 * The host summary may only live in this browser's run cache. A finished run
 * never shows a live-only summary; a Stopped run drops the raw
 * "error: interrupted" prefix; a running run always gets a status row.
 */
export const resolveProjectReportDetailView = (input: {
  readonly run: Pick<
    AgentRunRecord,
    | "status"
    | "reportSummary"
    | "reportStatus"
    | "denialReason"
    | "resultOutput"
    | "resultExitCode"
  >;
  readonly fallbackOutput: string;
  readonly cached?: {
    readonly reportSummary?: string | null;
    readonly reportStatus?: string | null;
  } | null;
}): ProjectReportDetailView => {
  const { run, cached } = input;
  const reportStatus = pickReportField(run.reportStatus, cached?.reportStatus);
  const reportSummary = pickReportField(
    run.reportSummary,
    cached?.reportSummary,
  );
  const view = resolveAgentRunReportProgressView({
    ...run,
    reportStatus,
    reportSummary,
    runStatus: run.status,
  });
  const isTerminal = TERMINAL_RUN_STATUSES.has(run.status);
  const summary = stripAgentRunReportMarkerFragments(
    stripAgentLiveProgressCliChrome(view.summaryLine ?? ""),
  );
  const usableSummary =
    summary.length > 0 && !(isTerminal && isStaleLiveSummary(summary))
      ? summary
      : "";
  const output = dropRepeatedReportBodyLines(
    stripAgentRunReportMarkerFragments(
      stripAgentLiveProgressCliChrome(input.fallbackOutput),
    ),
  );
  const isWaiting =
    !isTerminal && WAITING_SUMMARY.test(reportSummary?.trim() ?? "");
  const statusLabel = isWaiting
    ? "Waiting for your answer"
    : (toProjectReportStatusLabel(view.statusLabel ?? "") ??
      toProjectReportStatusLabel(run.status));
  const body = usableSummary.length > 0 ? usableSummary : output;
  const stoppedBody =
    body.replace(/^error:\s*interrupted[\s\p{P}]*/iu, "").trim() ||
    "Stopped by user.";
  const finalBody =
    statusLabel === "Stopped"
      ? stoppedBody
      : isTerminal && body.trim().length === 0
        ? resolveProjectReportFallbackBody({
            status: run.status,
            reasonLine: view.reasonLine,
            resultExitCode: run.resultExitCode,
          })
        : body;

  return {
    statusLabel,
    reasonLine: view.reasonLine,
    body: finalBody,
  };
};
