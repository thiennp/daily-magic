import fs from "node:fs";
import path from "node:path";

import {
  AGENT_RUN_REPORT_STATUSES,
  isTerminalAgentRunReportStatus,
  type AgentRunReportStatus,
} from "../src/lib/dispatch/agentRunReport.constant";
import { buildAgentRunReportFilePath } from "../src/lib/dispatch/buildAgentRunReportFilePath";
import expandAgentWitchProjectFolderPath from "./expandAgentWitchProjectFolderPath";

export type AgentRunReportFile = {
  readonly agentRunId: string;
  readonly status: AgentRunReportStatus;
  readonly updatedAt: string;
  readonly userSummary: string;
  readonly details?: string;
};

const resolveReportFilePath = (
  projectFolderPath: string,
  agentRunId: string,
): string =>
  buildAgentRunReportFilePath(
    expandAgentWitchProjectFolderPath(projectFolderPath),
    agentRunId,
  );

export const readAgentRunReportFile = (
  projectFolderPath: string,
  agentRunId: string,
): AgentRunReportFile | null => {
  const filePath = resolveReportFilePath(projectFolderPath, agentRunId);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof (parsed as AgentRunReportFile).agentRunId !== "string" ||
      typeof (parsed as AgentRunReportFile).status !== "string" ||
      typeof (parsed as AgentRunReportFile).updatedAt !== "string" ||
      typeof (parsed as AgentRunReportFile).userSummary !== "string"
    ) {
      return null;
    }

    return parsed as AgentRunReportFile;
  } catch {
    return null;
  }
};

export const writeAgentRunReportFile = (
  projectFolderPath: string,
  report: AgentRunReportFile,
): void => {
  const filePath = resolveReportFilePath(projectFolderPath, report.agentRunId);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
};

export const seedAgentRunReportFile = (input: {
  readonly projectFolderPath: string;
  readonly agentRunId: string;
  readonly userSummary?: string;
}): void => {
  const existing = readAgentRunReportFile(
    input.projectFolderPath,
    input.agentRunId,
  );
  if (existing !== null) {
    return;
  }

  writeAgentRunReportFile(input.projectFolderPath, {
    agentRunId: input.agentRunId,
    status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
    updatedAt: new Date().toISOString(),
    userSummary:
      input.userSummary?.trim() ?? "Task started; waiting for the agent.",
  });
};

export const buildAgentRunReportHeartbeatPayload = (
  report: AgentRunReportFile | null,
): {
  readonly reportStatus?: string;
  readonly reportSummary?: string;
} => {
  if (report === null) {
    return {};
  }

  const reportSummary = report.userSummary.trim();
  return {
    reportStatus: report.status,
    ...(reportSummary.length > 0 ? { reportSummary } : {}),
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
