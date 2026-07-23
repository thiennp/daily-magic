import {
  AGENT_RUN_REPORT_STATUSES,
  type AgentRunReportStatus,
} from "./dispatch/agentRunReport.constant";
import { upsertAgentRunReportFile } from "./agentWitchRunReport";

const REPORT_STATUSES = new Set<string>(
  Object.values(AGENT_RUN_REPORT_STATUSES),
);

const isReportStatus = (value: string): value is AgentRunReportStatus =>
  REPORT_STATUSES.has(value);

const readFlagValue = (
  args: readonly string[],
  flag: string,
): string | undefined => {
  const index = args.indexOf(flag);
  if (index < 0) {
    return undefined;
  }

  const value = args[index + 1];
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
};

const printUsage = (): void => {
  process.stdout.write(
    [
      "Usage: agent-witch report write \\",
      "  --project-folder <path> \\",
      "  --key <report-key> \\",
      "  --agent-run-id <run-id> \\",
      "  --status in_progress|completed|failed|blocked \\",
      "  --summary <plain-language status> \\",
      "  [--details <optional notes>]",
      "",
    ].join("\n"),
  );
};

export const runAgentWitchReportCli = (args: readonly string[]): number => {
  const subcommand = args[0];

  if (subcommand !== "write") {
    printUsage();
    return 1;
  }

  const projectFolderPath = readFlagValue(args, "--project-folder");
  const reportKey = readFlagValue(args, "--key");
  const agentRunId = readFlagValue(args, "--agent-run-id");
  const statusValue = readFlagValue(args, "--status");
  const summary = readFlagValue(args, "--summary");
  const details = readFlagValue(args, "--details");

  if (
    projectFolderPath === undefined ||
    reportKey === undefined ||
    agentRunId === undefined ||
    statusValue === undefined ||
    summary === undefined ||
    !isReportStatus(statusValue)
  ) {
    printUsage();
    return 1;
  }

  upsertAgentRunReportFile({
    projectFolderPath,
    reportKey,
    agentRunId,
    status: statusValue,
    userSummary: summary,
    details,
  });

  return 0;
};
