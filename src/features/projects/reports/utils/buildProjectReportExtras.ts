import { summarizeKnownWriterError } from "@agent-witch/shared/dispatch";

import { resolveReportDurationSeconds } from "@/features/projects/reports/utils/formatReportDuration";
import {
  type ReportStatusKind,
  toReportStatusKind,
} from "@/features/projects/reports/utils/projectReportStatus";
import { CODING_TOOL_LABELS } from "@/features/projects/tasks/utils/codingToolLabels.constant";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

const FULL_TITLE_MAX = 300;
const REASON_MAX = 160;

export interface ProjectReportExtras {
  readonly statusKind: ReportStatusKind;
  readonly toolId: string;
  readonly toolLabel: string;
  readonly fullTitle: string;
  readonly durationSeconds: number | null;
  readonly failureReason: string | null;
}

const collapse = (value: string): string => value.replace(/\s+/g, " ").trim();

const clip = (value: string, max: number): string =>
  value.length > max ? `${value.slice(0, max - 1)}…` : value;

const firstLine = (value: string): string =>
  value
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0) ?? "";

/** First line of why a run failed / was denied; known errors as a sentence. */
export const resolveReportFailureReason = (
  run: EnrichedAgentRunRecord,
  kind: ReportStatusKind,
): string | null => {
  if (kind !== "failed" && kind !== "denied" && kind !== "timed_out") {
    return null;
  }
  const raw = [run.denialReason, run.resultOutput, run.reportSummary].join(
    "\n",
  );
  const text =
    summarizeKnownWriterError(raw) ??
    (firstLine(run.denialReason ?? "") || firstLine(run.resultOutput ?? ""));
  return text.length > 0 ? clip(collapse(text), REASON_MAX) : null;
};

export const buildProjectReportExtras = (
  run: EnrichedAgentRunRecord,
): ProjectReportExtras => {
  const statusKind = toReportStatusKind(run.status);
  const source = (run.reportSummary ?? "").trim() || run.prompt;
  return {
    statusKind,
    toolId: run.writerAgent,
    toolLabel:
      (CODING_TOOL_LABELS as Readonly<Record<string, string>>)[
        run.writerAgent
      ] ?? run.writerAgent,
    fullTitle: clip(collapse(source), FULL_TITLE_MAX),
    durationSeconds: resolveReportDurationSeconds(run),
    failureReason: resolveReportFailureReason(run, statusKind),
  };
};
