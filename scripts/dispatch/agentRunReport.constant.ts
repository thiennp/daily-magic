import type { AgentRunReportHistoryEntry } from "./agentRunReportHistory.type";
import { buildAgentRunReportFilePath } from "./buildAgentRunReportFilePath";
import { buildAgentRunReportWriteCommand } from "./buildAgentRunReportWriteCommand";

export const AGENT_RUN_REPORT_STATUSES = {
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  FAILED: "failed",
  BLOCKED: "blocked",
} as const;

export type AgentRunReportStatus =
  (typeof AGENT_RUN_REPORT_STATUSES)[keyof typeof AGENT_RUN_REPORT_STATUSES];

export type AgentRunReportFile = {
  readonly reportKey: string;
  readonly agentRunId: string;
  readonly status: AgentRunReportStatus;
  readonly updatedAt: string;
  readonly userSummary: string;
  readonly estimateSeconds?: number;
  readonly details?: string;
  readonly history: readonly AgentRunReportHistoryEntry[];
};

export const isTerminalAgentRunReportStatus = (
  status: string,
): status is
  | typeof AGENT_RUN_REPORT_STATUSES.COMPLETED
  | typeof AGENT_RUN_REPORT_STATUSES.FAILED =>
  status === AGENT_RUN_REPORT_STATUSES.COMPLETED ||
  status === AGENT_RUN_REPORT_STATUSES.FAILED;

export const buildAgentRunReportInstruction = (input: {
  readonly agentRunId: string;
  readonly reportKey: string;
  readonly reportFilePath: string;
  readonly reportWriteCommand: string;
}): string =>
  [
    "Maintain a machine-readable job report so the user can check status later.",
    "Agent Witch records the initial time estimate in this report before the main task starts.",
    `Report key: ${input.reportKey}`,
    `Report file: ${input.reportFilePath}`,
    "",
    "After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",
    input.reportWriteCommand,
    "",
    "Valid --status values: in_progress, completed, failed, blocked.",
    "Use plain-language --summary text the user can read without opening logs.",
    "Optional --details for longer notes.",
    `Always include agentRunId ${input.agentRunId} via --agent-run-id (already in the command above).`,
  ].join("\n");

export const wrapPromptWithAgentRunReportInstruction = (
  prompt: string,
  input: {
    readonly agentRunId: string;
    readonly reportKey: string;
    readonly reportsDir: string;
    readonly installDir: string;
  },
): string => {
  const reportFilePath = buildAgentRunReportFilePath(
    input.reportsDir,
    input.reportKey,
  );
  const reportWriteCommand = buildAgentRunReportWriteCommand({
    installDir: input.installDir,
    reportKey: input.reportKey,
    agentRunId: input.agentRunId,
    status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
    summary: "Task started on your Mac.",
  });

  return `${prompt.trim()}\n\n---\n${buildAgentRunReportInstruction({
    agentRunId: input.agentRunId,
    reportKey: input.reportKey,
    reportFilePath,
    reportWriteCommand,
  })}`;
};
