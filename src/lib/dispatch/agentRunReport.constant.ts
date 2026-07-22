import { buildAgentRunReportFilePath } from "@/lib/dispatch/buildAgentRunReportFilePath";

export const AGENT_RUN_REPORT_STATUSES = {
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  FAILED: "failed",
  BLOCKED: "blocked",
} as const;

export type AgentRunReportStatus =
  (typeof AGENT_RUN_REPORT_STATUSES)[keyof typeof AGENT_RUN_REPORT_STATUSES];

export const isTerminalAgentRunReportStatus = (
  status: string,
): status is
  | typeof AGENT_RUN_REPORT_STATUSES.COMPLETED
  | typeof AGENT_RUN_REPORT_STATUSES.FAILED =>
  status === AGENT_RUN_REPORT_STATUSES.COMPLETED ||
  status === AGENT_RUN_REPORT_STATUSES.FAILED;

export const buildAgentRunReportInstruction = (input: {
  readonly agentRunId: string;
  readonly reportFilePath: string;
}): string =>
  [
    "Maintain a machine-readable job report file for this run so the user can check status later:",
    `Report file (create immediately, then keep updated): ${input.reportFilePath}`,
    "Use JSON with these fields:",
    `- agentRunId: "${input.agentRunId}"`,
    '- status: "in_progress" | "completed" | "failed" | "blocked"',
    "- updatedAt: ISO-8601 timestamp",
    "- userSummary: plain-language status for the user (1-3 sentences)",
    "- details: optional longer notes",
    "Rules:",
    "1. Create the file at task start with status in_progress and a short userSummary.",
    "2. Update the file after each meaningful step (refresh updatedAt and userSummary).",
    "3. On finish, set status completed or failed with a final userSummary the user can read without opening logs.",
    "4. If blocked on a human decision, set status blocked and explain what is needed in userSummary.",
    "5. Do not delete the file; overwrite it in place.",
  ].join("\n");

export const wrapPromptWithAgentRunReportInstruction = (
  prompt: string,
  input: {
    readonly agentRunId: string;
    readonly projectFolderPath: string;
  },
): string => {
  const reportFilePath = buildAgentRunReportFilePath(
    input.projectFolderPath,
    input.agentRunId,
  );

  return `${prompt.trim()}\n\n---\n${buildAgentRunReportInstruction({
    agentRunId: input.agentRunId,
    reportFilePath,
  })}`;
};
