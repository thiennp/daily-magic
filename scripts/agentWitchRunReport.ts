import fs from "node:fs";
import path from "node:path";

import {
  AGENT_RUN_REPORT_STATUSES,
  isTerminalAgentRunReportStatus,
  type AgentRunReportFile,
  type AgentRunReportStatus,
} from "../src/lib/dispatch/agentRunReport.constant";
import type { AgentRunReportHistoryEntry } from "../src/lib/dispatch/agentRunReportHistory.type";
import { buildAgentRunReportFilePath } from "../src/lib/dispatch/buildAgentRunReportFilePath";
import expandAgentWitchProjectFolderPath from "./expandAgentWitchProjectFolderPath";

export type { AgentRunReportFile, AgentRunReportStatus };
export { AGENT_RUN_REPORT_STATUSES, isTerminalAgentRunReportStatus };

const MAX_REPORT_HISTORY_ENTRIES = 50;

const resolveReportFilePath = (
  projectFolderPath: string,
  reportKey: string,
): string =>
  buildAgentRunReportFilePath(
    expandAgentWitchProjectFolderPath(projectFolderPath),
    reportKey,
  );

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
  projectFolderPath: string,
  reportKey: string,
): AgentRunReportFile | null => {
  const filePath = resolveReportFilePath(projectFolderPath, reportKey);

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

export const writeAgentRunReportFile = (
  projectFolderPath: string,
  report: AgentRunReportFile,
): void => {
  const filePath = resolveReportFilePath(projectFolderPath, report.reportKey);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
};

export const upsertAgentRunReportFile = (input: {
  readonly projectFolderPath: string;
  readonly reportKey: string;
  readonly agentRunId: string;
  readonly status: AgentRunReportStatus;
  readonly userSummary: string;
  readonly details?: string;
}): AgentRunReportFile => {
  const existing = readAgentRunReportFile(
    input.projectFolderPath,
    input.reportKey,
  );
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
    ...(input.details !== undefined && input.details.trim().length > 0
      ? { details: input.details.trim() }
      : {}),
    history: appendHistoryEntry(existing?.history ?? [], historyEntry),
  };

  writeAgentRunReportFile(input.projectFolderPath, report);
  return report;
};

export const seedAgentRunReportFile = (input: {
  readonly projectFolderPath: string;
  readonly reportKey: string;
  readonly agentRunId: string;
  readonly userSummary?: string;
}): AgentRunReportFile => {
  const existing = readAgentRunReportFile(
    input.projectFolderPath,
    input.reportKey,
  );
  if (existing !== null) {
    return existing;
  }

  return upsertAgentRunReportFile({
    projectFolderPath: input.projectFolderPath,
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
