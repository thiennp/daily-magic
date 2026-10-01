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
import {
  PROMPT_SDLC_SKILL_SELECT_SCRIPT,
  renderPromptSdlcLocalSkillSelect,
} from "./renderPromptSdlcLocalSkillSelect";
import { renderPromptSdlcFieldHeading } from "./renderPromptSdlcFieldTip";
import { renderPromptSdlcWizardGateSlot } from "./renderPromptSdlcWizardGateSlot";
import { renderPromptSdlcCostControlFields } from "./renderPromptSdlcCostControlFields";
import { renderPromptSdlcWizardResumeBanner } from "./renderPromptSdlcWizardResumeBanner";
import { promptSdlcLocalHistoryTitle } from "./promptSdlcLocalHistoryTitle";
import { renderPromptSdlcWizardRunnerFields } from "./renderPromptSdlcWizardRunnerFields";
import { renderPromptSdlcWizardRoleStepTable } from "./renderPromptSdlcWizardRoleStepTable";
import { renderPromptSdlcLocalWriterFields } from "./renderPromptSdlcLocalWriterFields";
import {
  PROMPT_SDLC_COMPOSE_INTRO,
  PROMPT_SDLC_WIZARD_MAX_ROUNDS,
  PROMPT_SDLC_WIZARD_MODULE_PASS_SCORE,
  PROMPT_SDLC_WIZARD_PASS_SCORE,
  isPromptSdlcTerminalStatus,
} from "../../../../adapters/promptSdlcAwcCore";
import { renderPromptSdlcLocalGoalPresets } from "./renderPromptSdlcLocalGoalPresets";
import { renderPromptSdlcLocalPassScoreField } from "./renderPromptSdlcLocalPassScore";
const readComposeCanRun = (
  goal: string,
  prompt: string,
  baseCanRun: boolean,
): boolean => baseCanRun && goal.trim().length > 0 && prompt.trim().length > 0;

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
  readonly modulePassScore?: string;
  readonly maxRounds?: string;
  readonly maxTrials?: string;
  readonly maxSpendUsd?: string;
  readonly earlyStop?: boolean;
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
  const composeCanRun = readComposeCanRun(
    shown.goal,
    shown.prompt,
    input.canRun,
  );
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
  const qualityThresholdFields = `${renderPromptSdlcLocalPassScoreField({
    fieldTipKey: "passScore",
    label: "Step 2 pass score",
    inputName: "passScore",
    inputId: "sdlc-pass-step2",
    passScore: shown.passScore,
    defaultScore: PROMPT_SDLC_WIZARD_PASS_SCORE,
    usualMark: PROMPT_SDLC_WIZARD_PASS_SCORE,
  })}${renderPromptSdlcLocalPassScoreField({
    fieldTipKey: "modulePassScore",
    label: "Step 4 pass score",
    inputName: "modulePassScore",
    inputId: "sdlc-pass-step4",
    passScore: shown.modulePassScore,
    defaultScore: PROMPT_SDLC_WIZARD_MODULE_PASS_SCORE,
    usualMark: PROMPT_SDLC_WIZARD_MODULE_PASS_SCORE,
  })}`;
  const costControlFields = renderPromptSdlcCostControlFields({
    maxTrials: shown.maxTrials,
    maxSpendUsd: shown.maxSpendUsd,
    earlyStop: shown.earlyStop,
  });
  const intro = PROMPT_SDLC_COMPOSE_INTRO;
  const locked = shown.running
    ? `<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>`
    : "";
  const viewingFinishedRun =
    input.cycle !== null && isPromptSdlcTerminalStatus(input.cycle.status);
  const composeDuringActiveRun = shown.running && !viewingFinishedRun;
  const composeOpen =
    viewingFinishedRun || composeDuringActiveRun ? "" : " open";
  const composeDuringRunClass = composeDuringActiveRun
    ? " sdlc-compose-run-focus"
    : "";
  const composeHeadActions = viewingFinishedRun
    ? `<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>`
    : `<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>`;
  const composeHeadActionsBar = `<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${composeHeadActions}</span>`;
  const composeSummary = viewingFinishedRun
    ? (() => {
        const goalPreview =
          input.cycle !== null
            ? promptSdlcLocalHistoryTitle(input.cycle.goal)
            : promptSdlcLocalHistoryTitle(shown.goal);
        return `<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">▸</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${escapeHtml(goalPreview)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields — does not start a run. Use New prompt or Re-run below.</span></span></span>${composeHeadActionsBar}</summary>`;
      })()
    : `<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${composeHeadActionsBar}</summary>`;
  const composeViewingClass = viewingFinishedRun
    ? " sdlc-compose-viewing-finished"
    : "";
  const runButtonInner =
    waitingOnYou || shown.running
      ? waitingOnYou
        ? "Waiting for you"
        : `<span class="sdlc-spin" aria-hidden="true"></span> Running…`
      : "Run";
  const runButtonState = waitingOnYou
    ? "waiting"
    : shown.running
      ? "running"
      : "idle";
  const runButtonBusy =
    shown.running && !waitingOnYou ? ' aria-busy="true"' : "";
  const form = `<section class="card sdlc-compose${composeViewingClass}${composeDuringRunClass}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${composeOpen}>
        ${composeSummary}
        <div class="sdlc-compose-details-body">
      <p class="lede">${intro} ${escapeHtml(input.modelNote)}</p>
        <ol class="sdlc-compose-stepper" aria-label="Compose steps" data-sdlc-compose-stepper>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="1" aria-current="step"><span class="sdlc-compose-stepper-index">1</span><span class="sdlc-compose-stepper-label">Project</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="2"><span class="sdlc-compose-stepper-index">2</span><span class="sdlc-compose-stepper-label">Prompt and goal</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="3"><span class="sdlc-compose-stepper-index">3</span><span class="sdlc-compose-stepper-label">CLI</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="4"><span class="sdlc-compose-stepper-index">4</span><span class="sdlc-compose-stepper-label">Summary</span></li>
        </ol>
        <fieldset class="sdlc-fields"${shown.running ? " disabled" : ""}>
        ${locked}
        <p class="alert-error sdlc-compose-step-error" data-sdlc-compose-step-error hidden role="alert"></p>
        <div class="sdlc-compose-step" data-sdlc-compose-step="1" id="sdlc-compose-step-1">
          <h3 class="sdlc-compose-step-title">Project</h3>
          <p class="muted sdlc-compose-step-lede">Choose the folder writers run in and optionally load a skill into the prompt on the next step.</p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="sdlc-folder">
          <div class="field">
            ${renderPromptSdlcFieldHeading("Folder", "folder")}
            <input class="input" type="text" name="folder" value="${escapeHtml(shown.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder…</button>
        </div>
        ${renderPromptSdlcLocalSkillSelect(listPromptSdlcFolderSkills(shown.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <input type="hidden" name="orchestratorSkillFile" value="" data-orchestrator-skill-file>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <p class="muted sdlc-compose-orchestrator-note" data-orchestrator-skill-note hidden></p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${renderPromptSdlcFieldHeading("Goal", "goal")}
            ${renderPromptSdlcLocalGoalPresets()}
            <textarea class="input textarea" name="goal" rows="4" required>${escapeHtml(shown.goal)}</textarea>
          </div>
          <div class="field">
            ${renderPromptSdlcFieldHeading("Prompt", "prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${escapeHtml(shown.prompt)}</textarea>
          </div>
          ${qualityThresholdFields}
          ${costControlFields}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <div class="sdlc-compose-step" data-sdlc-compose-step="3" id="sdlc-compose-step-3" hidden>
          <h3 class="sdlc-compose-step-title">CLI</h3>
          <p class="muted sdlc-compose-step-lede">Pick who scores, who rewrites, and who runs wizard step 4 modules.</p>
          <div class="sdlc-block sdlc-block-flush">
          <p class="sdlc-block-title">Judge and improver</p>
          ${writerFields}
        </div>
        ${runnerFields}
        ${renderPromptSdlcWizardRoleStepTable()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <div class="sdlc-compose-step" data-sdlc-compose-step="4" id="sdlc-compose-step-4" hidden>
          <h3 class="sdlc-compose-step-title">Summary</h3>
          <p class="muted sdlc-compose-step-lede">Run starts the wizard (generalize → evaluate → separate → optimize modules). Check these settings, then start.</p>
          <dl class="sdlc-compose-review" data-sdlc-compose-review></dl>
          <div class="sdlc-submit-bar" data-sdlc-submit-bar>
          <p class="sdlc-writer-summary" data-sdlc-writer-summary hidden></p>
          <p class="muted sdlc-run-hint" data-sdlc-run-hint role="status" hidden></p>
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass ≥ ${escapeHtml(shown.passScore)}; Step 4 pass ≥ ${escapeHtml(shown.modulePassScore)}; up to ${PROMPT_SDLC_WIZARD_MAX_ROUNDS} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${runButtonState}" data-can-run="${composeCanRun ? "true" : "false"}"${runButtonBusy}${shown.running ? " disabled" : ""}>${runButtonInner}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`;
  const scripts = `${PROMPT_SDLC_LOCAL_LIVE_STYLE}${PROMPT_SDLC_LOCAL_LIVE_SCRIPT}${PROMPT_SDLC_WIZARD_CLIENT_SCRIPT}${PROMPT_SDLC_LOCAL_FORM_SCRIPT}${PROMPT_SDLC_SKILL_SELECT_SCRIPT}`;
  return `${error}${skillNotice}${form}${resumeBanner}${cycle}${wizardGateSlot}${nodeDialog}${renderPromptSdlcLocalHistory(input.history, input.cycle?.id ?? null)}${scripts}`;
};
