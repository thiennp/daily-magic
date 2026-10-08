import { formatAgentRunReportSummaryLine } from "@/features/reports/utils/formatAgentRunReportSummaryLine";
import { formatAgentRunTerminalReasonLine } from "@/lib/dispatch/agentRunLostConnectionReasons.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import {
  isAgentRunBareShellPromptLine,
  isAgentRunWriterCliInvocationLine,
} from "@/lib/dispatch/isAgentRunTerminalChromeLine";
import { isAgentRunUserStopped } from "@/lib/dispatch/isAgentRunUserStopped";

export interface AgentRunReportProgressView {
  readonly summaryLine: string | null;
  readonly statusLabel: string | null;
  readonly reasonLine: string | null;
}

const TERMINAL_STATUSES: ReadonlySet<string> = new Set([
  AgentRunStatus.COMPLETED,
  AgentRunStatus.FAILED,
  AgentRunStatus.EXPIRED,
  AgentRunStatus.DENIED,
]);

const stripTerminalChrome = (summary: string): string =>
  summary
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      return (
        !isAgentRunWriterCliInvocationLine(trimmed) &&
        !isAgentRunBareShellPromptLine(trimmed)
      );
    })
    .join("\n")
    .trim();

const toLabel = (value: string | null | undefined): string | null => {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed.replaceAll("_", " ") : null;
};

/**
 * S5/S9/S10: the report "Run status" card. Drops echoed launch commands /
 * bare prompts, lets a finished run's status win over a host report stuck at
 * in_progress, and shows the failure reason (Stopped runs need none).
 */
export const resolveAgentRunReportProgressView = (input: {
  readonly runStatus?: string | null;
  readonly reportSummary?: string | null;
  readonly reportStatus?: string | null;
  readonly denialReason?: string | null;
  readonly resultOutput?: string | null;
  readonly resultExitCode?: number | null;
}): AgentRunReportProgressView => {
  const runStatus = input.runStatus?.trim() ?? "";
  const isTerminal = TERMINAL_STATUSES.has(runStatus);
  const isStopped =
    isTerminal &&
    runStatus !== AgentRunStatus.COMPLETED &&
    isAgentRunUserStopped(input.resultOutput, input.resultExitCode);
  const reason =
    isTerminal && !isStopped && runStatus !== AgentRunStatus.COMPLETED
      ? formatAgentRunTerminalReasonLine(input.denialReason)
      : "";

  return {
    summaryLine: formatAgentRunReportSummaryLine(
      stripTerminalChrome(input.reportSummary ?? ""),
    ),
    statusLabel: isStopped
      ? "stopped"
      : toLabel(isTerminal ? runStatus : input.reportStatus),
    reasonLine: reason.length > 0 ? reason : null,
  };
};
