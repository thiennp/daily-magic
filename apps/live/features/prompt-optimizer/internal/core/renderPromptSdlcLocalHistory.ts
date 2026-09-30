import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { describePromptSdlcLocalHistoryRow } from "./describePromptSdlcLocalHistoryRow";
import { promptSdlcLocalHistoryTitle } from "./promptSdlcLocalHistoryTitle";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const historyKind = (cycle: PromptSdlcLocalCycle): "wizard" | "classic" =>
  cycle.wizard === undefined ? "classic" : "wizard";

const renderHistoryItem = (
  cycle: PromptSdlcLocalCycle,
  openCycleId: string | null,
): string => {
  const open =
    openCycleId === null
      ? ""
      : `<input type="hidden" name="openCycleId" value="${escapeHtml(openCycleId)}">`;
  const row = describePromptSdlcLocalHistoryRow(cycle);
  return `<li data-sdlc-history-kind="${historyKind(cycle)}"><div class="sdlc-history-row-main"><span class="${escapeHtml(row.badgeClass)}">${escapeHtml(row.badgeLabel)}</span><div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${escapeHtml(cycle.id)}">${escapeHtml(promptSdlcLocalHistoryTitle(cycle.goal))}</a><p class="muted">${escapeHtml(row.subtitle)}</p></div></div><form method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${escapeHtml(cycle.id)}">${open}<button class="btn btn-secondary" type="submit">Delete</button></form></li>`;
};

export const renderPromptSdlcLocalHistory = (
  history: readonly PromptSdlcLocalCycle[],
  openCycleId: string | null,
): string => {
  if (history.length === 0) {
    return `<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>`;
  }

  const items = history
    .slice(0, 20)
    .map((cycle) => renderHistoryItem(cycle, openCycleId))
    .join("");
  const filters = `<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="classic" aria-pressed="false">Classic</button>
  </div>`;
  const shownCount = Math.min(history.length, 20);
  const historySummaryLabel =
    shownCount === history.length
      ? `History · ${history.length}`
      : `History · ${shownCount} of ${history.length}`;
  const body = `<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${filters}<ul class="sdlc-history">${items}</ul></section>`;
  if (openCycleId !== null) {
    return `<details class="sdlc-history-details" id="prompt-optimizer-history"><summary class="sdlc-history-details-summary"><span class="eyebrow">Past runs</span> ${escapeHtml(historySummaryLabel)}</summary>${body}</details>`;
  }
  return body;
};
