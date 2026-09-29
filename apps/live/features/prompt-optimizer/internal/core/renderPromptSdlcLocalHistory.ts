import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { promptSdlcLocalHistoryTitle } from "./promptSdlcLocalHistoryTitle";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const renderHistoryItem = (
  cycle: PromptSdlcLocalCycle,
  openCycleId: string | null,
): string => {
  const open =
    openCycleId === null
      ? ""
      : `<input type="hidden" name="openCycleId" value="${escapeHtml(openCycleId)}">`;
  return `<li><div><a href="/prompt-optimizer?cycle=${escapeHtml(cycle.id)}">${escapeHtml(promptSdlcLocalHistoryTitle(cycle.goal))}</a><p class="muted">${escapeHtml(cycle.status)} · round ${cycle.currentRound}</p></div><form method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${escapeHtml(cycle.id)}">${open}<button class="btn btn-secondary" type="submit">Delete</button></form></li>`;
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
  return `<section class="card"><h2>History</h2><ul class="sdlc-history">${items}</ul></section>`;
};
