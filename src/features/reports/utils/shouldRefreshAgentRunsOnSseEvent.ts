import type AgentRunSseEvent from "@/features/reports/types/AgentRunSseEvent.type";

/** Whether a run-events SSE payload should trigger a job-list refetch. */
export const shouldRefreshAgentRunsOnSseEvent = (
  event: AgentRunSseEvent,
): boolean => event.kind === "terminal.end" || event.kind.startsWith("status.");

export const resolveNextAgentRunSseCursor = (input: {
  readonly lastSeq: number;
  readonly event: AgentRunSseEvent;
}): { readonly nextSeq: number; readonly shouldRefresh: boolean } => {
  if (input.event.seq <= input.lastSeq) {
    return { nextSeq: input.lastSeq, shouldRefresh: false };
  }

  return {
    nextSeq: input.event.seq,
    shouldRefresh: shouldRefreshAgentRunsOnSseEvent(input.event),
  };
};

export const buildAgentRunEventsSseUrl = (
  runId: string,
  afterSeq: number,
): string => {
  const params = new URLSearchParams();
  if (afterSeq > 0) {
    params.set("afterSeq", String(afterSeq));
  }

  const query = params.toString();
  const base = `/api/agent-runs/${encodeURIComponent(runId)}/events`;
  return query.length > 0 ? `${base}?${query}` : base;
};
