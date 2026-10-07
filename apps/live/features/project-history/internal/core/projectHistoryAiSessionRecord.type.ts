/**
 * C1 durable AI session / task summary under
 * `project-data/<projectId>/tasks/<taskId>.json`.
 * Source record (kept on History OFF), scrubbed summaries only.
 */
export type ProjectHistoryAiSessionRecord = {
  readonly taskId: string;
  readonly projectId: string;
  /** Optional messenger thread; null/omit = project-wide (show on `whole`). */
  readonly threadKey: string | null;
  readonly writerAgent: string | null;
  readonly status: string;
  /** Scrubbed short prompt summary. */
  readonly promptSummary: string;
  /** Scrubbed short result summary. */
  readonly resultSummary: string;
  readonly createdAt: string;
  readonly completedAt: string | null;
  readonly agentRunId: string | null;
  readonly savedAt: string;
};
