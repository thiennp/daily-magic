import { isPromptSdlcTerminalStatus } from "../../../../adapters/promptSdlcAwcCore";
import { buildPromptSdlcLocalCycleSection } from "./buildPromptSdlcLocalCycleSection";
import {
  PROMPT_SDLC_LOCAL_LIVE_SCRIPT,
  PROMPT_SDLC_LOCAL_LIVE_STYLE,
} from "./buildPromptSdlcLocalLiveScript";
import { PROMPT_SDLC_LOCAL_FORM_SCRIPT } from "./promptSdlcLocalFormScript";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import type { PromptSdlcLocalWriterChoice } from "./promptSdlcLocalForm";
import { promptSdlcLocalHistoryTitle } from "./promptSdlcLocalHistoryTitle";
import { renderPromptSdlcLocalWriterFields } from "./renderPromptSdlcLocalWriterFields";

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
  return `<li><div><a href="/prompt-sdlc?cycle=${escapeHtml(cycle.id)}">${escapeHtml(promptSdlcLocalHistoryTitle(cycle.goal))}</a><p class="muted">${escapeHtml(cycle.status)} · round ${cycle.currentRound}</p></div><form method="POST" action="/prompt-sdlc"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${escapeHtml(cycle.id)}">${open}<button class="btn btn-secondary" type="submit">Delete</button></form></li>`;
};

const renderHistory = (
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

export const buildPromptSdlcLocalPageBody = (input: {
  readonly goal: string;
  readonly prompt: string;
  readonly modelNote: string;
  readonly writers: readonly PromptSdlcLocalWriterChoice[];
  readonly judge: string;
  readonly improver: string;
  readonly folder: string;
  readonly passScore: string;
  readonly canRun: boolean;
  readonly errorMessage: string | null;
  readonly cycle: PromptSdlcLocalCycle | null;
  readonly history: readonly PromptSdlcLocalCycle[];
}): string => {
  const error =
    input.errorMessage === null
      ? ""
      : `<div class="alert-error">${escapeHtml(input.errorMessage)}</div>`;
  const cycle =
    input.cycle === null ? "" : buildPromptSdlcLocalCycleSection(input.cycle);
  const live =
    input.cycle !== null && !isPromptSdlcTerminalStatus(input.cycle.status)
      ? `${PROMPT_SDLC_LOCAL_LIVE_STYLE}${PROMPT_SDLC_LOCAL_LIVE_SCRIPT}`
      : "";
  const choosing = input.writers.length > 1;
  const writerFields = renderPromptSdlcLocalWriterFields(input);
  const intro = choosing
    ? "Choose which writers run this prompt."
    : "This Mac uses the reasoning model it can run.";
  const form = `<section class="card">
      <p class="eyebrow">Prompt SDLC</p>
      <h1>Optimize a prompt</h1>
      <p class="lede">${intro} ${escapeHtml(input.modelNote)}</p>
      <p class="actions"><a class="btn btn-secondary" href="/prompt-sdlc/guide">Instructions and example</a></p>
      <form class="sdlc-form" method="POST" action="/prompt-sdlc">
        <label class="field">
          <span class="field-label">Goal</span>
          <textarea class="input textarea" name="goal" rows="4" required>${escapeHtml(input.goal)}</textarea>
        </label>
        <label class="field">
          <span class="field-label">Prompt</span>
          <textarea class="input textarea" name="prompt" rows="10" required>${escapeHtml(input.prompt)}</textarea>
        </label>
        <div class="sdlc-folder">
          <label class="field">
            <span class="field-label">Folder</span>
            <input class="input" type="text" name="folder" value="${escapeHtml(input.folder)}" onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </label>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder…</button>
        </div>
        <label class="field sdlc-pass">
          <span class="field-label">Pass score</span>
          <input class="input" type="number" name="passScore" min="1" max="100" step="1" value="${escapeHtml(input.passScore)}" required>
        </label>
        ${writerFields}
        <div class="actions">
          <button class="btn btn-primary" type="submit" name="intent" value="run" data-sdlc-run data-can-run="${input.canRun ? "true" : "false"}" disabled>Run</button>
        </div>
      </form>
    </section>`;
  return `${error}${cycle}${live}${renderHistory(input.history, input.cycle?.id ?? null)}${form}${PROMPT_SDLC_LOCAL_FORM_SCRIPT}`;
};
