import { asRowArray, getSql } from "@/lib/db";

export type AutomationRunSummary = {
  readonly runId: string;
  readonly status: string;
  readonly createdAt: string;
  readonly completedAt: string | null;
  readonly exitCode: number | null;
};

const MAX_RUNS = 20;

const iso = (value: unknown): string | null =>
  value === null || value === undefined
    ? null
    : new Date(String(value)).toISOString();

/**
 * Recent runs of one automation, newest first. Meta only: no prompt, output
 * or errors, so history never copies a run's content into another surface.
 */
export const listAutomationRuns = async (
  automationId: string,
  limit: number = MAX_RUNS,
): Promise<readonly AutomationRunSummary[]> => {
  const rows = asRowArray(
    await getSql()`
      SELECT id, status, created_at, completed_at, result_exit_code
      FROM agent_runs
      WHERE automation_id = ${automationId}
      ORDER BY created_at DESC
      LIMIT ${Math.min(Math.max(1, Math.floor(limit)), MAX_RUNS)}
    `,
  );
  return rows.map((row) => ({
    runId: String(row.id),
    status: String(row.status),
    createdAt: iso(row.created_at) ?? "",
    completedAt: iso(row.completed_at),
    exitCode:
      row.result_exit_code === null || row.result_exit_code === undefined
        ? null
        : Number(row.result_exit_code),
  }));
};
