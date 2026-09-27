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

const formatTokenCount = (tokens: number): string =>
  tokens.toLocaleString("en-US");

const tokenComparison = (
  estimateTokens: number,
  actualTokens: number,
): string => {
  const delta = actualTokens - estimateTokens;
  if (delta === 0) {
    return "on estimate";
  }
  if (delta < 0) {
    return `${formatTokenCount(-delta)} under`;
  }
  return `${formatTokenCount(delta)} over`;
};

export const buildAgentWitchLocalEstimateHistoryPageBody = (input: {
  readonly reportsDir: string;
}): string => {
  const rows = listAgentRunEstimateHistoryForDisplay(input.reportsDir);
  const entries =
    rows.length === 0
      ? `<p class="empty">No prompt history yet.</p>`
      : rows
          .map((row) => {
            const promptInput =
              row.input.trim().length > 0 ? row.input : row.task;
            const promptOutput =
              row.output.trim().length > 0 ? row.output : "—";
            const timeLabel =
              row.actualSeconds === null
                ? row.estimateSeconds === null
                  ? "Time: no estimate"
                  : `Time: estimated ${formatDuration(row.estimateSeconds)}`
                : row.estimateSeconds === null
                  ? `Time: actual ${formatDuration(row.actualSeconds)} · no estimate`
                  : `Time: estimated ${formatDuration(row.estimateSeconds)} · actual ${formatDuration(row.actualSeconds)} · ${comparisonCell(row.estimateSeconds, row.actualSeconds)}`;
            const tokenLabel =
              row.estimateTokens === null || row.actualTokens === null
                ? "Tokens: no estimate"
                : `Tokens: estimated ${formatTokenCount(row.estimateTokens)} · actual ${formatTokenCount(row.actualTokens)} · ${tokenComparison(row.estimateTokens, row.actualTokens)}`;
            const writer =
              row.writerLabel.trim().length > 0 ? row.writerLabel : "Writer";
            return `<article class="card">
              <p class="eyebrow">${escapeHtml(writer)}</p>
              <h2>Input</h2>
              <pre style="white-space:pre-wrap">${escapeHtml(promptInput)}</pre>
              <h2>Output</h2>
              <pre style="white-space:pre-wrap">${escapeHtml(promptOutput)}</pre>
              <p>${escapeHtml(timeLabel)}</p>
              <p>${escapeHtml(tokenLabel)}</p>
            </article>`;
          })
          .join("");

  return `<section class="card">
      <p class="eyebrow">This Mac</p>
      <h1>History</h1>
      <p class="lede">Every prompt on this Mac, with its input, output, and estimate. Estimation prompts still use only the latest 100 finished comparisons.</p>
      ${entries}
    </section>`;
};
