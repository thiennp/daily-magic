import { listAgentRunEstimateHistoryForDisplay } from "../../../../../../scripts/agentRunEstimateHistory";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const formatDuration = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  if (minutes < 60) {
    return remainder === 0 ? `${minutes} min` : `${minutes} min ${remainder}s`;
  }

  const hours = Math.floor(minutes / 60);
  const minuteRemainder = minutes % 60;
  return minuteRemainder === 0
    ? `${hours} hr`
    : `${hours} hr ${minuteRemainder} min`;
};

const comparisonCell = (
  estimateSeconds: number,
  actualSeconds: number,
): string => {
  const delta = actualSeconds - estimateSeconds;
  if (delta === 0) {
    return "on estimate";
  }
  if (delta < 0) {
    return `${formatDuration(-delta)} under`;
  }
  return `${formatDuration(delta)} over`;
};

export const buildAgentWitchLocalEstimateHistoryPageBody = (input: {
  readonly reportsDir: string;
}): string => {
  const rows = listAgentRunEstimateHistoryForDisplay(input.reportsDir);
  const table =
    rows.length === 0
      ? `<p class="empty">No finished tasks with a recorded duration yet.</p>`
      : `<div class="table-wrap"><table>
          <thead><tr><th>Task</th><th>Writer</th><th>Estimated</th><th>Actual</th><th>Comparison</th></tr></thead>
          <tbody>
            ${rows
              .map((row) => {
                const actualSeconds = row.actualSeconds ?? 0;
                const estimateLabel =
                  row.estimateSeconds === null
                    ? "—"
                    : formatDuration(row.estimateSeconds);
                const comparisonLabel =
                  row.estimateSeconds === null
                    ? "no estimate"
                    : comparisonCell(row.estimateSeconds, actualSeconds);
                return `<tr><td>${escapeHtml(row.task)}</td><td>${escapeHtml(row.writerLabel)}</td><td>${estimateLabel}</td><td>${formatDuration(actualSeconds)}</td><td>${escapeHtml(comparisonLabel)}</td></tr>`;
              })
              .join("")}
          </tbody>
        </table></div>`;

  return `<section class="card">
      <p class="eyebrow">This Mac</p>
      <h1>Estimates</h1>
      <p class="lede">Latest 100 finished tasks, estimated time next to the actual duration.</p>
      ${table}
    </section>`;
};
