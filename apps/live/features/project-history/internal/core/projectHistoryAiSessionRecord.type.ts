/**
 * C1 durable AI session under
 * `project-data/<projectId>/tasks/<taskId>.json`.
 * Primary source record (kept on History OFF — T12 does not purge tasks/).
 *
 * Timeline UI uses scrubbed summaries only (≤280).
 * `promptBody` / `resultBody` are the local durable SoT for full prompt/result
 * on the project computer. Secrets are scrubbed before write (same scrubber as
 * summaries); length is not capped at 280. Never written to Neon (Neon ≤120 meta).
 */
export type ProjectHistoryAiSessionRecord = {
  readonly taskId: string;
  readonly projectId: string;
  /** Optional messenger thread; null/omit = project-wide (show on `whole`). */
  readonly threadKey: string | null;
  readonly writerAgent: string | null;
  readonly status: string;
  /** Scrubbed short prompt summary (timeline display, ≤280). */
  readonly promptSummary: string;
  /** Scrubbed short result summary (timeline display, ≤280). */
  readonly resultSummary: string;
  /**
   * Full prompt body for local evidence SoT. Optional for older summary-only
   * files. Secret-scrubbed before write (uncapped length). Never put on Neon.
   */
  readonly promptBody: string | null;
  /**
   * Full result body for local evidence SoT. Optional for older summary-only
   * files. Secret-scrubbed before write (uncapped length). Never put on Neon.
   */
  readonly resultBody: string | null;
  readonly createdAt: string;
  readonly completedAt: string | null;
  readonly agentRunId: string | null;
  readonly savedAt: string;
};
