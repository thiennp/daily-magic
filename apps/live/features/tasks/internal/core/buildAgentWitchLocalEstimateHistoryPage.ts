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

const previewText = (value: string): string => {
  const flat = value.replace(/\s+/g, " ").trim();
  return flat.length > 80 ? `${flat.slice(0, 77)}…` : flat;
};

const durationLabel = (seconds: number | null): string =>
  seconds === null ? "—" : formatDuration(seconds);

const tokenLabel = (tokens: number | null): string =>
  tokens === null ? "—" : formatTokenCount(tokens);

const HISTORY_DETAIL_SCRIPT = `(function () {
  const dialog = document.getElementById("history-detail");
  const body = document.getElementById("history-detail-body");
  const table = document.getElementById("history-table");
  if (!(dialog instanceof HTMLDialogElement) || body === null || table === null) {
    return;
  }
  const openDetail = (sourceId) => {
    const template = document.getElementById(sourceId);
    if (!(template instanceof HTMLTemplateElement)) {
      return;
    }
    body.replaceChildren(template.content.cloneNode(true));
    if (!dialog.open) {
      dialog.showModal();
    }
  };
  table.addEventListener("click", (event) => {
    const row = event.target instanceof Element
      ? event.target.closest("[data-history-detail]")
      : null;
    const sourceId = row?.getAttribute("data-history-detail");
    if (sourceId !== null && sourceId !== undefined) {
      openDetail(sourceId);
    }
  });
  const closeButton = document.getElementById("history-detail-close");
  if (closeButton !== null) {
    closeButton.addEventListener("click", () => {
      dialog.close();
    });
  }
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
})();`;

export const buildAgentWitchLocalEstimateHistoryPageBody = (input: {
  readonly reportsDir: string;
}): string => {
  const rows = listAgentRunEstimateHistoryForDisplay(input.reportsDir);
  const rendered = rows.map((row, index) => {
    const promptInput = row.input.trim().length > 0 ? row.input : row.task;
    const promptOutput = row.output.trim().length > 0 ? row.output : "—";
    const writer =
      row.writerLabel.trim().length > 0 ? row.writerLabel : "Writer";
    const timeComparison =
      row.estimateSeconds === null || row.actualSeconds === null
        ? "no estimate"
        : comparisonCell(row.estimateSeconds, row.actualSeconds);
    const tokensComparison =
      row.estimateTokens === null || row.actualTokens === null
        ? "no estimate"
        : tokenComparison(row.estimateTokens, row.actualTokens);
    const sourceId = `history-detail-source-${index}`;
    return {
      row: `<tr class="history-row" data-history-detail="${sourceId}">
        <td><button type="button" class="history-open">${escapeHtml(previewText(promptInput))}</button></td>
        <td>${escapeHtml(writer)}</td>
        <td>${durationLabel(row.estimateSeconds)}</td>
        <td>${durationLabel(row.actualSeconds)}</td>
        <td>${escapeHtml(timeComparison)}</td>
        <td>${tokenLabel(row.estimateTokens)}</td>
        <td>${tokenLabel(row.actualTokens)}</td>
        <td>${escapeHtml(tokensComparison)}</td>
      </tr>`,
      template: `<template id="${sourceId}">
        <p class="eyebrow">${escapeHtml(writer)}</p>
        <h2>Input</h2>
        <pre>${escapeHtml(promptInput)}</pre>
        <h2>Output</h2>
        <pre>${escapeHtml(promptOutput)}</pre>
        <p>Time: estimated ${durationLabel(row.estimateSeconds)} · actual ${durationLabel(row.actualSeconds)} · ${escapeHtml(timeComparison)}</p>
        <p>Tokens: estimated ${tokenLabel(row.estimateTokens)} · actual ${tokenLabel(row.actualTokens)} · ${escapeHtml(tokensComparison)}</p>
      </template>`,
    };
  });
  const table =
    rendered.length === 0
      ? `<p class="empty">No prompt history yet.</p>`
      : `<div class="table-wrap history-table-wrap"><table id="history-table">
          <thead><tr><th>Prompt</th><th>Writer</th><th>Estimated</th><th>Actual</th><th>Comparison</th><th>Estimated tokens</th><th>Actual tokens</th><th>Token comparison</th></tr></thead>
          <tbody>${rendered.map((item) => item.row).join("")}</tbody>
        </table></div>
        ${rendered.map((item) => item.template).join("")}
        <dialog id="history-detail" class="history-dialog" aria-label="Prompt detail">
          <div class="history-dialog-bar">
            <button type="button" class="btn btn-secondary btn-compact" id="history-detail-close">Close</button>
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${HISTORY_DETAIL_SCRIPT}</script>`;

  return `<section class="card">
      <p class="eyebrow">This Mac</p>
      <h1>History</h1>
      <p class="lede">Every prompt on this Mac. Select a row to read the input, output, and estimate.</p>
      ${table}
    </section>`;
};
