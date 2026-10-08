import fs from "node:fs";
import path from "node:path";

import { listPendingRunInputSessions } from "./agentWitchPendingRunSessions";
import {
  AGENT_RUN_REPORT_STATUSES,
  type AgentRunReportFile,
} from "./dispatch/agentRunReport.constant";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

export const AGENT_RUN_REPORT_INTERRUPTED_SUMMARY =
  "Interrupted: AgentWitch restarted while this task was running.";

const OPEN_STATUSES: ReadonlySet<string> = new Set([
  AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
  AGENT_RUN_REPORT_STATUSES.BLOCKED,
]);

const MAX_REPORT_HISTORY_ENTRIES = 50;

const readReport = (filePath: string): AgentRunReportFile | null => {
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8")) as unknown;
    if (typeof parsed !== "object" || parsed === null) {
      return null;
    }
    const report = parsed as AgentRunReportFile;
    return typeof report.reportKey === "string" &&
      typeof report.agentRunId === "string" &&
      typeof report.status === "string" &&
      Array.isArray(report.history)
      ? report
      : null;
  } catch {
    return null;
  }
};

const closeReport = (filePath: string, report: AgentRunReportFile): void => {
  const at = new Date().toISOString();
  const history = [
    ...report.history,
    {
      at,
      status: AGENT_RUN_REPORT_STATUSES.FAILED,
      summary: AGENT_RUN_REPORT_INTERRUPTED_SUMMARY,
    },
  ].slice(-MAX_REPORT_HISTORY_ENTRIES);
  const next: AgentRunReportFile = {
    ...report,
    status: AGENT_RUN_REPORT_STATUSES.FAILED,
    updatedAt: at,
    userSummary: AGENT_RUN_REPORT_INTERRUPTED_SUMMARY,
    history,
  };
  fs.writeFileSync(filePath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
};

/**
 * 378558e8 (Testi run 4 @298): reports of runs that were running in a host
 * process that died (self-update restart, crash, reboot) stayed in_progress
 * forever. Run once per host process start, before any run can begin: close
 * every open report whose run is not paused for an answer (paused runs live
 * in pending-run-inputs.json and get their heartbeat back on replay) and not
 * live in this process. Returns how many reports were closed.
 */
export const sweepOrphanedAgentRunReports = (
  layout: AgentWitchLocalLayout,
  isRunLiveInProcess: (agentRunId: string) => boolean = () => false,
): number => {
  if (!fs.existsSync(layout.reportsDir)) {
    return 0;
  }
  const pausedRunIds = new Set(
    listPendingRunInputSessions(layout).map((session) => session.agentRunId),
  );
  return fs
    .readdirSync(layout.reportsDir)
    .filter((name) => name.endsWith(".json"))
    .map((name) => path.join(layout.reportsDir, name))
    .filter((filePath) => {
      const report = readReport(filePath);
      if (
        report === null ||
        !OPEN_STATUSES.has(report.status) ||
        pausedRunIds.has(report.agentRunId) ||
        isRunLiveInProcess(report.agentRunId)
      ) {
        return false;
      }
      try {
        closeReport(filePath, report);
        return true;
      } catch {
        return false;
      }
    }).length;
};
