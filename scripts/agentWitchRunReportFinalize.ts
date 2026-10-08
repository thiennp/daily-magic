import { summarizeKnownWriterError } from "@agent-witch/shared/dispatch";
import { AGENT_PROCESS_KILLED_PREFIX } from "./formatAgentProcessKilledNote";

import {
  AGENT_RUN_REPORT_STATUSES,
  isTerminalAgentRunReportStatus,
  readAgentRunReportFile,
  upsertAgentRunReportFile,
  type AgentRunReportFile,
} from "./agentWitchRunReport";

const LIVE_ONLY_SUMMARY =
  /^(?:Waiting for|Awaiting|Continuing after your answer|Working on your computer|Task started)/i;
const MARKER_LINE = /\[\[[A-Z_]+\]\]|^[WA]\|/;
const MAX_SUMMARY_CHARS = 200;

const truncate = (text: string): string =>
  text.length > MAX_SUMMARY_CHARS
    ? `${text.slice(0, MAX_SUMMARY_CHARS - 1).trimEnd()}…`
    : text;

/**
 * 378558e8 (a7c6ce2c): only what happened after the last checkpoint answer
 * describes the outcome; "Waiting for …" / "Awaiting …" lines are live-only.
 */
const lastMeaningfulSummary = (report: AgentRunReportFile): string | null => {
  const summaries = report.history.map((entry) => entry.summary.trim());
  const lastAnswerIndex = summaries.findLastIndex((summary) =>
    /^Continuing after your answer/i.test(summary),
  );
  return (
    summaries
      .slice(lastAnswerIndex + 1)
      .findLast(
        (summary) => summary.length > 0 && !LIVE_ONLY_SUMMARY.test(summary),
      ) ?? null
  );
};

const lastOutputLine = (output: string): string | null => {
  const lines = output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !MARKER_LINE.test(line));
  return lines.at(-1) ?? null;
};

/**
 * FAIL3 (Testi long-run run 2, report 452bdbc8): the run ended Done in the UI
 * but the host report stayed `in_progress` "Waiting for your answer…",
 * because only the agent wrote the report. When the run ends, a report the
 * agent left open is closed with the run's real outcome. A report the agent
 * already finished is left as is.
 */
/** The raw output under Details; a killed run keeps its last output (c1731750). */
const buildKnownErrorDetails = (output: string): string => {
  const raw = output
    .split("\n")
    .filter((line) => !line.startsWith(AGENT_PROCESS_KILLED_PREFIX))
    .join("\n")
    .trim();
  return raw.length > 0
    ? raw.slice(-2000)
    : "The agent printed nothing before it stopped.";
};

export const finalizeAgentRunReportOnFinish = (input: {
  readonly reportKey: string;
  readonly agentRunId: string;
  readonly exitCode: number;
  readonly output: string;
  readonly stoppedExitCode: number;
  readonly sessionLimitExitCode: number;
}): AgentRunReportFile | null => {
  const existing = readAgentRunReportFile(input.reportKey);
  if (existing === null || isTerminalAgentRunReportStatus(existing.status)) {
    return existing;
  }

  if (input.exitCode === 0) {
    return upsertAgentRunReportFile({
      reportKey: input.reportKey,
      agentRunId: input.agentRunId,
      status: AGENT_RUN_REPORT_STATUSES.COMPLETED,
      userSummary: truncate(
        lastMeaningfulSummary(existing) ?? "Finished on your computer.",
      ),
    });
  }

  const failedLine = lastOutputLine(input.output);
  // 9b3947bc: a known CLI error (agy 429 quota…) is one sentence; raw text goes to details.
  const knownError = summarizeKnownWriterError(input.output);
  const isStop =
    input.exitCode === input.stoppedExitCode ||
    input.exitCode === input.sessionLimitExitCode;
  const useKnownError = knownError !== null && !isStop;
  const userSummary = useKnownError
    ? knownError
    : input.exitCode === input.stoppedExitCode
      ? "Stopped by user."
      : input.exitCode === input.sessionLimitExitCode
        ? "Stopped at the session time limit."
        : truncate(
            failedLine !== null
              ? `Failed on your computer: ${failedLine}`
              : `Failed on your computer (exit ${input.exitCode}).`,
          );

  return upsertAgentRunReportFile({
    reportKey: input.reportKey,
    agentRunId: input.agentRunId,
    // 7bd7b9ae: a user stop is "stopped", not "failed".
    status:
      input.exitCode === input.stoppedExitCode
        ? AGENT_RUN_REPORT_STATUSES.STOPPED
        : AGENT_RUN_REPORT_STATUSES.FAILED,
    userSummary,
    ...(useKnownError ? { details: buildKnownErrorDetails(input.output) } : {}),
  });
};
