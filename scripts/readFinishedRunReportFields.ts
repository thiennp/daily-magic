import { readAgentRunReportFile } from "./agentWitchRunReport";
import { isTerminalAgentRunReportStatus } from "./dispatch/agentRunReport.constant";

/**
 * c1731750: the finalized host report (status + one-line summary) for the
 * `command.claude.result` frame, so the web report shows the host summary
 * instead of "No summary was captured". Empty when there is no final report.
 */
export const readFinishedRunReportFields = (
  reportKey: string | undefined,
  readReport: typeof readAgentRunReportFile = readAgentRunReportFile,
): { readonly reportStatus?: string; readonly reportSummary?: string } => {
  const key = reportKey?.trim() ?? "";
  if (key.length === 0) {
    return {};
  }
  const report = readReport(key);
  const summary = report?.userSummary.trim() ?? "";
  if (
    report === null ||
    !isTerminalAgentRunReportStatus(report.status) ||
    summary.length === 0
  ) {
    return {};
  }
  return { reportStatus: report.status, reportSummary: summary };
};
