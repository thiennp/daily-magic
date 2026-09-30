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
import { PROMPT_SDLC_HISTORY_FILTER_SCRIPT } from "./promptSdlcHistoryFilterScript";
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
import { promptSdlcLocalHistoryTitle } from "./promptSdlcLocalHistoryTitle";
import { renderPromptSdlcWizardRunnerFields } from "./renderPromptSdlcWizardRunnerFields";
import { renderPromptSdlcWizardRoleStepTable } from "./renderPromptSdlcWizardRoleStepTable";
import { renderPromptSdlcLocalWriterFields } from "./renderPromptSdlcLocalWriterFields";
import {
  PROMPT_SDLC_WIZARD_MAX_ROUNDS,
  PROMPT_SDLC_WIZARD_PASS_SCORE,
  isPromptSdlcTerminalStatus,
} from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcGoalSuggestionsUi } from "./runPromptSdlcGoalSuggestions";
import { renderPromptSdlcGoalSuggestions } from "./renderPromptSdlcGoalSuggestions";

const readComposeCanRun = (
  goal: string,
  prompt: string,
  baseCanRun: boolean,
): boolean => baseCanRun && goal.trim().length > 0 && prompt.trim().length > 0;

const renderGoalSuggestionsBlock = (
  goalSuggestions: PromptSdlcGoalSuggestionsUi | null | undefined,
): string => {
  if (goalSuggestions === null || goalSuggestions === undefined) {
    return "";
  }
  if (goalSuggestions.kind === "error") {
    return `<div class="alert-error sdlc-goal-suggestions-error">${escapeHtml(goalSuggestions.errorMessage)}</div>`;
  }
  return renderPromptSdlcGoalSuggestions({
    suggestKey: goalSuggestions.suggestKey,
    options: goalSuggestions.options,
    promptFingerprint: goalSuggestions.promptFingerprint,
    folderFingerprint: goalSuggestions.folderFingerprint,
    judgeFingerprint: goalSuggestions.judgeFingerprint,
  });
};

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
  readonly goalSuggestions?: PromptSdlcGoalSuggestionsUi | null;
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
  const composeCanRun = readComposeCanRun(
    shown.goal,
    shown.prompt,
    input.canRun,
  );
  const goalSuggestionsBlock = renderGoalSuggestionsBlock(
    input.goalSuggestions,
  );
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
  const composeOpen = input.cycle !== null || shown.running ? "" : " open";
  const viewingFinishedRun =
    input.cycle !== null && isPromptSdlcTerminalStatus(input.cycle.status);
  const composeMode = `<div class="sdlc-compose-mode" role="group" aria-label="Run mode">
        <button type="button" class="btn btn-secondary" data-sdlc-compose-mode="wizard" aria-pressed="true">Wizard</button>
        <button type="button" class="btn btn-secondary" data-sdlc-compose-mode="classic" aria-pressed="false">Classic loop</button>
      </div>`;
  const composeHeadActions = viewingFinishedRun
    ? `<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>`
    : `<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>
        <a class="btn btn-secondary" href="/prompt-optimizer?example=wizard-verification">Load wizard verification example</a>`;
  const composeSummary = viewingFinishedRun
    ? (() => {
        const goalPreview =
          input.cycle !== null
            ? promptSdlcLocalHistoryTitle(input.cycle.goal)
            : promptSdlcLocalHistoryTitle(shown.goal);
        return `<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed"><span class="sdlc-compose-summary-chevron" aria-hidden="true">▸</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${escapeHtml(goalPreview)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields — does not start a run. Use New prompt or Re-run below.</span></span></summary>`;
      })()
    : `<summary class="sdlc-compose-summary"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</summary>`;
  const composeViewingClass = viewingFinishedRun
    ? " sdlc-compose-viewing-finished"
    : "";
  const form = `<section class="card sdlc-compose${composeViewingClass}" id="prompt-optimizer-compose">
      <div class="sdlc-form-head">
        ${composeMode}
        ${composeHeadActions}
      </div>
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${composeOpen}>
        ${composeSummary}
      <p class="lede">${intro} ${escapeHtml(input.modelNote)}</p>
      <form class="sdlc-form" method="POST" action="/prompt-optimizer">
        <fieldset class="sdlc-fields"${shown.running ? " disabled" : ""}>
        ${locked}
        <div class="sdlc-block">
          <p class="sdlc-block-title">Prompt and goal</p>
          <div class="field">
            ${renderPromptSdlcFieldHeading("Goal", "goal")}
            <textarea class="input textarea" name="goal" rows="4" required>${escapeHtml(shown.goal)}</textarea>
            <div class="sdlc-goal-suggest-actions">
              <button class="btn btn-secondary" type="submit" name="intent" value="suggest-goals" formnovalidate data-sdlc-suggest-goals ${shown.running ? "disabled" : ""}>Suggest goals</button>
            </div>
            ${goalSuggestionsBlock}
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
        <div data-sdlc-wizard-only>${renderPromptSdlcWizardRoleStepTable()}</div>
        <details class="sdlc-classic-loop-options">
          <summary class="sdlc-block-title">Classic loop options</summary>
          <div class="sdlc-limits">
            ${renderPromptSdlcLocalPassScore(shown.passScore)}
            ${renderPromptSdlcLocalMaxRounds(shown.maxRounds)}
          </div>
        </details>
        <div class="sdlc-submit">
          <p class="sdlc-writer-summary" data-sdlc-writer-summary hidden></p>
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: pass score ${PROMPT_SDLC_WIZARD_PASS_SCORE}, up to ${PROMPT_SDLC_WIZARD_MAX_ROUNDS} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <p class="muted sdlc-classic-limits-callout" data-sdlc-classic-limits-callout hidden>Classic loop uses the pass score and max rounds above.</p>
          <button class="btn btn-primary" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-can-run="${composeCanRun ? "true" : "false"}" disabled>${runLabel}</button>
          <button class="btn btn-secondary" type="submit" name="intent" value="run-classic" formnovalidate data-sdlc-run data-sdlc-run-classic data-can-run="${composeCanRun ? "true" : "false"}" disabled>Classic loop (90 / 10 rounds)</button>
          <p class="muted sdlc-run-hint" data-sdlc-run-hint hidden></p>
        </div>
        </fieldset>
      </form>
      </details>
    </section>`;
  const scripts = `${PROMPT_SDLC_LOCAL_LIVE_STYLE}${PROMPT_SDLC_LOCAL_LIVE_SCRIPT}${PROMPT_SDLC_WIZARD_CLIENT_SCRIPT}${PROMPT_SDLC_LOCAL_FORM_SCRIPT}${PROMPT_SDLC_SKILL_SELECT_SCRIPT}${PROMPT_SDLC_HISTORY_FILTER_SCRIPT}`;
  return `${error}${skillNotice}${form}${resumeBanner}${cycle}${wizardGateSlot}${nodeDialog}${renderPromptSdlcLocalHistory(input.history, input.cycle?.id ?? null)}${scripts}`;
};
