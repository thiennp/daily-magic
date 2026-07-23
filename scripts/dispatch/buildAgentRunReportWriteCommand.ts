import type { AgentRunReportStatus } from "./agentRunReport.constant";

const shellQuote = (value: string): string =>
  `'${value.replace(/'/g, `'\\''`)}'`;

export const buildAgentRunReportWriteCommand = (input: {
  readonly installDir: string;
  readonly projectFolderPath: string;
  readonly reportKey: string;
  readonly agentRunId: string;
  readonly status: AgentRunReportStatus;
  readonly summary: string;
  readonly details?: string;
}): string => {
  const tsxCli = `${input.installDir.trim()}/node_modules/tsx/dist/cli.mjs`;
  const scriptPath = `${input.installDir.trim()}/agent-witch.ts`;
  const parts = [
    shellQuote(tsxCli),
    shellQuote(scriptPath),
    "report",
    "write",
    "--project-folder",
    shellQuote(input.projectFolderPath.trim()),
    "--key",
    shellQuote(input.reportKey.trim()),
    "--agent-run-id",
    shellQuote(input.agentRunId.trim()),
    "--status",
    shellQuote(input.status),
    "--summary",
    shellQuote(input.summary.trim()),
  ];

  if (input.details !== undefined && input.details.trim().length > 0) {
    parts.push("--details", shellQuote(input.details.trim()));
  }

  return parts.join(" ");
};
