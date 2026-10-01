import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { describePromptSdlcLocalHistoryRow } from "./describePromptSdlcLocalHistoryRow";
import { formatPromptSdlcLocalRelativeTime } from "./formatPromptSdlcLocalRelativeTime";
import { promptSdlcLocalHistoryTitle } from "./promptSdlcLocalHistoryTitle";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const historyKind = (cycle: PromptSdlcLocalCycle): "wizard" | "legacy" =>
  cycle.wizard === undefined ? "legacy" : "wizard";

const renderHistoryItem = (
  cycle: PromptSdlcLocalCycle,
  openCycleId: string | null,
): string => {
  const open =
    openCycleId === null
      ? ""
      : `<input type="hidden" name="openCycleId" value="${escapeHtml(openCycleId)}">`;
  const row = describePromptSdlcLocalHistoryRow(cycle);
  const when = formatPromptSdlcLocalRelativeTime(cycle.updatedAt);
  const isViewing = openCycleId !== null && cycle.id === openCycleId;
  const subtitleBase = isViewing
    ? `${row.subtitle} · Shown above`
    : row.subtitle;
  const subtitle =
    when.length === 0 ? subtitleBase : `${subtitleBase} · ${when}`;
  const viewing = isViewing
    ? `<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>`
    : "";
  const statusBadge = isViewing
    ? ""
    : `<span class="${escapeHtml(row.badgeClass)}">${escapeHtml(row.badgeLabel)}</span>`;
  const resume =
    cycle.status === "wizard_paused"
      ? `<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${escapeHtml(cycle.id)}">Resume</a>`
      : "";
  const deleteForm = isViewing
    ? ""
    : `<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${escapeHtml(cycle.id)}">${open}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;
  return `<li class="sdlc-history-item${openCycleId === cycle.id ? " sdlc-history-item-viewing" : ""}" data-sdlc-history-kind="${historyKind(cycle)}"><div class="sdlc-history-row-main">${viewing}${statusBadge}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${escapeHtml(cycle.id)}">${escapeHtml(promptSdlcLocalHistoryTitle(cycle.goal))}</a><p class="muted">${escapeHtml(subtitle)}</p></div></div><div class="sdlc-history-row-actions">${resume}${deleteForm}</div></li>`;
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
  </div>`;
  const shownCount = Math.min(history.length, 20);
  const historySummaryLabel =
    shownCount === history.length
      ? `History · ${history.length}`
      : `History · ${shownCount} of ${history.length}`;
  const body = `<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${filters}<ul class="sdlc-history">${items}</ul></section>`;
  if (openCycleId !== null) {
    return `<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${escapeHtml(historySummaryLabel)}</summary>${body}</details>`;
  }
  return body;
};
