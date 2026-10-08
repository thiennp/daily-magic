import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";

const FAILED_LIKE: ReadonlySet<string> = new Set([
  AgentRunStatus.FAILED,
  AgentRunStatus.EXPIRED,
  AgentRunStatus.DENIED,
]);

/**
 * 7daeea78 (812e1568): "Finished on your computer." is a status line, not a
 * title; the Tasks row and report kept it instead of the ask.
 */
export const isGenericAgentRunStatusSummary = (summary: string): boolean =>
  /^(?:Finished|Done|Completed) on your computer\b/i.test(summary.trim());

/**
 * c1731750: the host report summary is now kept for every finished run. A
 * Failed / Stopped run's summary is its reason ("Stopped by user."), not a
 * title, so titles fall back to the ask for those runs.
 */
export const resolveAgentRunTitleSummary = (run: {
  readonly status: string;
  readonly reportSummary?: string | null;
}): string | null =>
  FAILED_LIKE.has(run.status) ||
  isGenericAgentRunStatusSummary(run.reportSummary ?? "")
    ? null
    : (run.reportSummary ?? null);
