import { isPromptSdlcLocalManualWait } from "./isPromptSdlcLocalManualWait";
import { buildPromptSdlcLocalCycleSection } from "./buildPromptSdlcLocalCycleSection";
import {
  PROMPT_SDLC_LOCAL_LIVE_SCRIPT,
  PROMPT_SDLC_LOCAL_LIVE_STYLE,
} from "./buildPromptSdlcLocalLiveScript";
import { PROMPT_SDLC_WIZARD_CLIENT_SCRIPT } from "./buildPromptSdlcLocalWizardClientScript";
import {
  PROMPT_SDLC_NODE_DIALOG,
  PROMPT_SDLC_NODE_DIALOG_SCRIPT,
} from "./buildPromptSdlcLocalStepTree";
import { PROMPT_SDLC_LOCAL_FORM_SCRIPT } from "./promptSdlcLocalFormScript";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import type { PromptSdlcLocalWriterChoice } from "./promptSdlcLocalForm";
import { readPromptSdlcLocalShownForm } from "./readPromptSdlcLocalShownForm";
import { renderPromptSdlcLocalHistory } from "./renderPromptSdlcLocalHistory";
import { listPromptSdlcFolderSkills } from "./readPromptSdlcFolderSkills";
import { renderPromptSdlcLocalMaxRounds } from "./renderPromptSdlcLocalMaxRounds";
import { renderPromptSdlcLocalPassScore } from "./renderPromptSdlcLocalPassScore";
import {
  PROMPT_SDLC_SKILL_SELECT_SCRIPT,
  renderPromptSdlcLocalSkillSelect,
} from "./renderPromptSdlcLocalSkillSelect";
import { renderPromptSdlcFieldHeading } from "./renderPromptSdlcFieldTip";
import { renderPromptSdlcWizardGateSlot } from "./renderPromptSdlcWizardGateSlot";
import { renderPromptSdlcWizardResumeBanner } from "./renderPromptSdlcWizardResumeBanner";
import { renderPromptSdlcWizardRunnerFields } from "./renderPromptSdlcWizardRunnerFields";
import { renderPromptSdlcLocalWriterFields } from "./renderPromptSdlcLocalWriterFields";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const buildPromptSdlcLocalPageBody = (input: {
  readonly goal: string;
  readonly prompt: string;
  readonly modelNote: string;
  readonly writers: readonly PromptSdlcLocalWriterChoice[];
  readonly judge: string;
  readonly improver: string;
  readonly judgeInstructions?: string;
  readonly improverInstructions?: string;
  readonly runner?: string;
  readonly runnerInstructions?: string;
  readonly folder: string;
  readonly passScore: string;
  readonly maxRounds?: string;
  readonly canRun: boolean;
  readonly errorMessage: string | null;
  readonly skillNotice?: string | null;
  readonly cycle: PromptSdlcLocalCycle | null;
  readonly history: readonly PromptSdlcLocalCycle[];
  readonly resumableWizardCycle?: PromptSdlcLocalCycle | null;
}): string => {
  const error =
    input.errorMessage === null
      ? ""
      : `<div class="alert-error">${escapeHtml(input.errorMessage)}</div>`;
  const skillNotice =
    (input.skillNotice ?? null) === null
      ? ""
      : `<div class="alert-success">${escapeHtml(input.skillNotice ?? "")}</div>`;
  const nodeDialog = `${PROMPT_SDLC_NODE_DIALOG}${PROMPT_SDLC_NODE_DIALOG_SCRIPT}`;
  const resumableWizardCycle = input.resumableWizardCycle ?? null;
  const resumeBanner =
    resumableWizardCycle === null
      ? ""
      : renderPromptSdlcWizardResumeBanner(resumableWizardCycle);
  const wizardGateSlot = renderPromptSdlcWizardGateSlot(input.cycle);
  const cycle =
    input.cycle === null ? "" : buildPromptSdlcLocalCycleSection(input.cycle);
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
    judgeInstructions: shown.judgeInstructions,
    improverInstructions: shown.improverInstructions,
  });
  const runnerFields = renderPromptSdlcWizardRunnerFields({
    writers: input.writers,
    runner: shown.runner,
    runnerInstructions: shown.runnerInstructions,
  });
  const intro =
    "Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize → evaluate → separate → optimize modules). Classic loop skips the wizard. Instructions are optional.";
  const locked = shown.running
    ? `<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>`
    : "";
  const composeOpen = shown.running ? "" : " open";
  const form = `<section class="card sdlc-compose" id="prompt-optimizer-compose">
      <div class="sdlc-form-head">
        <a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>
      </div>
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${composeOpen}>
        <summary class="sdlc-compose-summary"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</summary>
      <p class="lede">${intro} ${escapeHtml(input.modelNote)}</p>
      <form class="sdlc-form" method="POST" action="/prompt-optimizer">
        <fieldset class="sdlc-fields"${shown.running ? " disabled" : ""}>
        ${locked}
        <div class="sdlc-block">
          <p class="sdlc-block-title">Prompt and goal</p>
          <div class="field">
            ${renderPromptSdlcFieldHeading("Goal", "goal")}
            <textarea class="input textarea" name="goal" rows="4" required>${escapeHtml(shown.goal)}</textarea>
          </div>
          <div class="field">
            ${renderPromptSdlcFieldHeading("Prompt", "prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${escapeHtml(shown.prompt)}</textarea>
          </div>
        </div>
        <div class="sdlc-block">
          <p class="sdlc-block-title">Folder</p>
          <div class="sdlc-folder">
          <div class="field">
            ${renderPromptSdlcFieldHeading("Folder", "folder")}
            <input class="input" type="text" name="folder" value="${escapeHtml(shown.folder)}" onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder…</button>
        </div>
        ${renderPromptSdlcLocalSkillSelect(listPromptSdlcFolderSkills(shown.folder))}
        </div>
        <div class="sdlc-block">
          <p class="sdlc-block-title">Judge and improver</p>
          ${writerFields}
        </div>
        ${runnerFields}
        <div class="sdlc-block">
          <p class="sdlc-block-title">When to stop</p>
          <div class="sdlc-limits">
            ${renderPromptSdlcLocalPassScore(shown.passScore)}
            ${renderPromptSdlcLocalMaxRounds(shown.maxRounds)}
          </div>
        </div>
        <div class="sdlc-submit">
          <button class="btn btn-primary" type="submit" name="intent" value="run" data-sdlc-run data-can-run="${input.canRun ? "true" : "false"}" disabled>${runLabel}</button>
          <button class="btn btn-secondary" type="submit" name="intent" value="run-classic" formnovalidate data-sdlc-run data-can-run="${input.canRun ? "true" : "false"}" disabled>Classic loop (90 / 10 rounds)</button>
        </div>
        </fieldset>
      </form>
      </details>
    </section>`;
  const scripts = `${PROMPT_SDLC_LOCAL_LIVE_STYLE}${PROMPT_SDLC_LOCAL_LIVE_SCRIPT}${PROMPT_SDLC_WIZARD_CLIENT_SCRIPT}${PROMPT_SDLC_LOCAL_FORM_SCRIPT}${PROMPT_SDLC_SKILL_SELECT_SCRIPT}`;
  return `${error}${skillNotice}${form}${resumeBanner}${cycle}${wizardGateSlot}${nodeDialog}${renderPromptSdlcLocalHistory(input.history, input.cycle?.id ?? null)}${scripts}`;
};
