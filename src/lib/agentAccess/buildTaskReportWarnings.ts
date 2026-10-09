export const TASK_REPORT_LOOKUP_WINDOW_MINUTES = 20;
export const TASK_REPORT_MIN_SUMMARY_CHARS = 15;

const NO_LOOKUP_WARNING =
  "No library lookup from you in the last 20 minutes. Before you start: skills_find, or list_project_skills with a short query for this task.";

const shortSummaryWarning = (chars: number): string =>
  `resultSummary is only ${chars} characters. Say the outcome and what to reuse or avoid (one line, up to 200 characters).`;

const text = (value: unknown): string | null =>
  typeof value === "string" ? value.trim() : null;

/**
 * Soft hints for a bot that just updated a task. Never an error: the update
 * already succeeded. `hadRecentLookup` null (log unreadable) never warns.
 */
export const buildTaskReportWarnings = (input: {
  readonly args: unknown;
  readonly taskStatus: string;
  readonly resultSummary: string | null;
  readonly hadRecentLookup: boolean | null;
}): readonly string[] => {
  const requested = text(
    (input.args as Record<string, unknown> | null)?.status,
  );
  const startedWork =
    requested === "in_progress" && input.taskStatus === "in_progress";
  const finished = requested === "done" && input.taskStatus === "done";
  const summary = input.resultSummary?.trim() ?? "";
  return [
    ...(startedWork && input.hadRecentLookup === false
      ? [NO_LOOKUP_WARNING]
      : []),
    ...(finished && summary.length < TASK_REPORT_MIN_SUMMARY_CHARS
      ? [shortSummaryWarning(summary.length)]
      : []),
  ];
};
