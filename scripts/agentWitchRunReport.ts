import fs from "node:fs";
import path from "node:path";

import {
  AGENT_RUN_REPORT_STATUSES,
  isTerminalAgentRunReportStatus,
  type AgentRunReportFile,
  type AgentRunReportStatus,
} from "./dispatch/agentRunReport.constant";
import type { AgentRunReportHistoryEntry } from "./dispatch/agentRunReportHistory.type";
import { buildAgentRunReportFilePath } from "./dispatch/buildAgentRunReportFilePath";
import { resolveAgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

export type { AgentRunReportFile, AgentRunReportStatus };
export { AGENT_RUN_REPORT_STATUSES, isTerminalAgentRunReportStatus };

const MAX_REPORT_HISTORY_ENTRIES = 50;

const resolveReportFilePath = (reportKey: string): string => {
  const layout = resolveAgentWitchLocalLayout();
  const filePath = buildAgentRunReportFilePath(layout.reportsDir, reportKey);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  return filePath;
};

const isValidReportFile = (parsed: unknown): parsed is AgentRunReportFile => {
  if (typeof parsed !== "object" || parsed === null) {
    return false;
  }

  const candidate = parsed as AgentRunReportFile;
  return (
    typeof candidate.reportKey === "string" &&
    typeof candidate.agentRunId === "string" &&
    typeof candidate.status === "string" &&
    typeof candidate.updatedAt === "string" &&
    typeof candidate.userSummary === "string" &&
    Array.isArray(candidate.history)
  );
};

export const readAgentRunReportFile = (
  reportKey: string,
): AgentRunReportFile | null => {
  const filePath = resolveReportFilePath(reportKey);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!isValidReportFile(parsed)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

const appendHistoryEntry = (
  existing: readonly AgentRunReportHistoryEntry[],
  entry: AgentRunReportHistoryEntry,
): readonly AgentRunReportHistoryEntry[] => {
  const next = [...existing, entry];
  return next.length > MAX_REPORT_HISTORY_ENTRIES
    ? next.slice(next.length - MAX_REPORT_HISTORY_ENTRIES)
    : next;
};

export const writeAgentRunReportFile = (report: AgentRunReportFile): void => {
  const filePath = resolveReportFilePath(report.reportKey);
  fs.writeFileSync(filePath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
};

export const upsertAgentRunReportFile = (input: {
  readonly reportKey: string;
  readonly agentRunId: string;
  readonly status: AgentRunReportStatus;
  readonly userSummary: string;
  readonly estimateSeconds?: number;
  readonly details?: string;
}): AgentRunReportFile => {
  const existing = readAgentRunReportFile(input.reportKey);
  const updatedAt = new Date().toISOString();
  const historyEntry: AgentRunReportHistoryEntry = {
    at: updatedAt,
    status: input.status,
    summary: input.userSummary.trim(),
  };
  const report: AgentRunReportFile = {
    reportKey: input.reportKey,
    agentRunId: input.agentRunId,
    status: input.status,
    updatedAt,
    userSummary: input.userSummary.trim(),
    ...(input.estimateSeconds !== undefined
      ? { estimateSeconds: input.estimateSeconds }
      : {}),
    ...(input.details !== undefined && input.details.trim().length > 0
      ? { details: input.details.trim() }
      : {}),
    history: appendHistoryEntry(existing?.history ?? [], historyEntry),
  };

  writeAgentRunReportFile(report);
  return report;
};

export const seedAgentRunReportFile = (input: {
  readonly reportKey: string;
  readonly agentRunId: string;
  readonly userSummary?: string;
}): AgentRunReportFile => {
  const existing = readAgentRunReportFile(input.reportKey);
  if (existing !== null) {
    return existing;
  }

  return upsertAgentRunReportFile({
    reportKey: input.reportKey,
    agentRunId: input.agentRunId,
    status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
    userSummary:
      input.userSummary?.trim() ?? "Task started; waiting for the agent.",
  });
};

export const buildAgentRunReportHeartbeatPayload = (
  report: AgentRunReportFile | null,
): {
  readonly reportStatus?: string;
  readonly reportSummary?: string;
  readonly reportHistory?: readonly AgentRunReportHistoryEntry[];
} => {
  if (report === null) {
    return {};
  }

  const reportSummary = report.userSummary.trim();
  return {
    reportStatus: report.status,
    ...(reportSummary.length > 0 ? { reportSummary } : {}),
    ...(report.history.length > 0 ? { reportHistory: report.history } : {}),
  };
};

export const resolveAgentRunCompletionFromReport = (
  report: AgentRunReportFile | null,
): { readonly exitCode: number; readonly output: string } | null => {
  if (report === null || !isTerminalAgentRunReportStatus(report.status)) {
    return null;
  }

  const outputParts = [report.userSummary.trim()];
  if (report.details !== undefined && report.details.trim().length > 0) {
    outputParts.push(report.details.trim());
  }

  return {
    exitCode: report.status === AGENT_RUN_REPORT_STATUSES.COMPLETED ? 0 : 1,
    output: outputParts.filter((part) => part.length > 0).join("\n\n"),
  };
};
