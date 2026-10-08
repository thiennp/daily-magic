import { asRowArray, getSql } from "@/lib/db";
import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { toAgentRunNeonMetaText } from "@/lib/dispatch/toAgentRunNeonMetaText";

const REPORT_STATUSES: ReadonlySet<string> = new Set([
  "in_progress",
  "completed",
  "failed",
  "stopped",
  "blocked",
]);

/** Reads the host report fields a `command.claude.result` may carry. */
export const readAgentRunReportFields = (
  payload: Readonly<Record<string, unknown>> | undefined,
): { readonly reportStatus: string; readonly reportSummary: string } | null => {
  const status =
    typeof payload?.reportStatus === "string" ? payload.reportStatus : "";
  const summary =
    typeof payload?.reportSummary === "string"
      ? payload.reportSummary.trim()
      : "";
  if (!REPORT_STATUSES.has(status) || summary.length === 0) {
    return null;
  }
  return {
    reportStatus: status,
    reportSummary: toAgentRunNeonMetaText(summary),
  };
};

/**
 * c1731750 (Testi recheck @301): the host's final report summary only went
 * to open browser tabs (heartbeats), and the last one was sent before the
 * run finished, so the web report said "No summary was captured". The
 * result frame now carries it and the server keeps it as run meta.
 */
export const saveAgentRunReportSummary = async (input: {
  readonly runId: string;
  readonly reportStatus: string;
  readonly reportSummary: string;
}): Promise<void> => {
  if (isAgentWitchDevDashboardEnabled()) {
    return;
  }
  const sql = getSql();
  asRowArray(
    await sql`
      UPDATE agent_runs
      SET report_status = ${input.reportStatus},
          report_summary = ${input.reportSummary}
      WHERE id = ${input.runId}
      RETURNING id
    `,
  );
};
