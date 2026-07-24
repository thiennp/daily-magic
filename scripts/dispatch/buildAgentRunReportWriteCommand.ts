import type { AgentRunReportStatus } from "./agentRunReport.constant";
import {
  AGENT_WITCH_APP_BUNDLE_FILE_NAME,
  AGENT_WITCH_APP_DIR_NAME,
} from "../agentWitchInstallApp.constants";

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
  const appBundlePath = `${input.installDir.trim()}/${AGENT_WITCH_APP_DIR_NAME}/${AGENT_WITCH_APP_BUNDLE_FILE_NAME}`;
  const parts = [
    shellQuote("node"),
    shellQuote(appBundlePath),
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
