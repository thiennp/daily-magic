import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";

const FAILED_LIKE: ReadonlySet<string> = new Set([
  AgentRunStatus.FAILED,
  AgentRunStatus.EXPIRED,
  AgentRunStatus.DENIED,
]);

/**
 * c1731750: the host report summary is now kept for every finished run. A
 * Failed / Stopped run's summary is its reason ("Stopped by user."), not a
 * title, so titles fall back to the ask for those runs.
 */
export const resolveAgentRunTitleSummary = (run: {
  readonly status: string;
  readonly reportSummary?: string | null;
}): string | null =>
  FAILED_LIKE.has(run.status) ? null : (run.reportSummary ?? null);
