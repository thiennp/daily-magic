import { isPromptSdlcTerminalStatus } from "@/lib/promptSdlc/PromptSdlcCycleStatus.constant";
import { buildPromptSdlcLocalCycleSection } from "./buildPromptSdlcLocalCycleSection";
import {
  PROMPT_SDLC_LOCAL_LIVE_SCRIPT,
  PROMPT_SDLC_LOCAL_LIVE_STYLE,
} from "./buildPromptSdlcLocalLiveScript";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const renderHistory = (history: readonly PromptSdlcLocalCycle[]): string => {
  if (history.length === 0) {
    return `<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>`;
  }

  const items = history
    .slice(0, 20)
    .map(
      (cycle) =>
        `<li><a href="/prompt-sdlc?cycle=${escapeHtml(cycle.id)}">${escapeHtml(cycle.goal)}</a> <span class="muted">${escapeHtml(cycle.status)} · round ${cycle.currentRound}</span></li>`,
    )
    .join("");
  return `<section class="card"><h2>History</h2><ul>${items}</ul></section>`;
};

export const buildPromptSdlcLocalPageBody = (input: {
  readonly goal: string;
  readonly prompt: string;
  readonly modelNote: string;
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
  const form = `<section class="card">
      <p class="eyebrow">Prompt SDLC</p>
      <h1>Optimize a prompt</h1>
      <p class="lede">This Mac picks the best reasoning models it can run. ${escapeHtml(input.modelNote)}</p>
      <p><a href="/prompt-sdlc/guide">See an example of a goal that changes how the prompt works</a></p>
      <form method="POST" action="/prompt-sdlc">
        <label class="field">
          <span class="field-label">Goal</span>
          <textarea class="input textarea" name="goal" rows="4" required>${escapeHtml(input.goal)}</textarea>
        </label>
        <label class="field">
          <span class="field-label">Prompt</span>
          <textarea class="input textarea" name="prompt" rows="10" required>${escapeHtml(input.prompt)}</textarea>
        </label>
        <div class="actions">
          <button class="btn btn-primary" type="submit" ${input.canRun ? "" : "disabled"}>Run</button>
        </div>
      </form>
    </section>`;
  return `${error}${cycle}${live}${renderHistory(input.history)}${form}`;
};
