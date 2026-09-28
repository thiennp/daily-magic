import { isPromptSdlcLocalManualWait } from "./isPromptSdlcLocalManualWait";
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
import { readPromptSdlcLocalShownForm } from "./readPromptSdlcLocalShownForm";
import { renderPromptSdlcLocalPassScore } from "./renderPromptSdlcLocalPassScore";
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
    input.cycle !== null &&
    !isPromptSdlcTerminalStatus(input.cycle.status) &&
    !isPromptSdlcLocalManualWait(input.cycle)
      ? `${PROMPT_SDLC_LOCAL_LIVE_STYLE}${PROMPT_SDLC_LOCAL_LIVE_SCRIPT}`
      : "";
  const waitingOnYou =
    input.cycle !== null && isPromptSdlcLocalManualWait(input.cycle);
  const shown = readPromptSdlcLocalShownForm(input);
  const runLabel = waitingOnYou
    ? "Waiting for you"
    : shown.running
      ? "Running…"
      : "Run";
  const writerFields = renderPromptSdlcLocalWriterFields({
    writers: input.writers,
    judge: shown.judge,
    improver: shown.improver,
  });
  const intro =
    "Choose who scores the prompt and who rewrites it. You can do either step yourself.";
  const locked = shown.running
    ? `<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>`
    : "";
  const form = `<section class="card sdlc-compose">
      <div class="sdlc-form-head">
        <div>
          <p class="eyebrow">Prompt SDLC</p>
          <h1>Optimize a prompt</h1>
        </div>
        <a class="btn btn-secondary" href="/prompt-sdlc/guide">Instructions and example</a>
      </div>
      <p class="lede">${intro} ${escapeHtml(input.modelNote)}</p>
      <form class="sdlc-form" method="POST" action="/prompt-sdlc">
        <fieldset class="sdlc-fields"${shown.running ? " disabled" : ""}>
        ${locked}
        <div class="sdlc-block">
          <p class="sdlc-block-title">Prompt and goal</p>
          <label class="field">
            <span class="field-label">Goal</span>
            <textarea class="input textarea" name="goal" rows="4" required>${escapeHtml(shown.goal)}</textarea>
          </label>
          <label class="field">
            <span class="field-label">Prompt</span>
            <textarea class="input textarea" name="prompt" rows="10" required>${escapeHtml(shown.prompt)}</textarea>
          </label>
        </div>
        <div class="sdlc-block">
          <p class="sdlc-block-title">How this run works</p>
          <div class="sdlc-folder">
          <label class="field">
            <span class="field-label">Folder</span>
            <input class="input" type="text" name="folder" value="${escapeHtml(shown.folder)}" onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </label>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder…</button>
        </div>
        ${renderPromptSdlcLocalPassScore(shown.passScore)}
          ${writerFields}
        </div>
        <div class="sdlc-submit">
          <button class="btn btn-primary" type="submit" name="intent" value="run" data-sdlc-run data-can-run="${input.canRun ? "true" : "false"}" disabled>${runLabel}</button>
        </div>
        </fieldset>
      </form>
    </section>`;
  return `${error}${cycle}${live}${form}${renderHistory(input.history, input.cycle?.id ?? null)}${PROMPT_SDLC_LOCAL_FORM_SCRIPT}`;
};
