import { isPromptSdlcTerminalStatus } from "../../../../adapters/promptSdlcAwcCore";
import { describePromptSdlcLocalActivity } from "./buildPromptSdlcLocalActivity";
import {
  labelPromptSdlcLocalModel,
  PROMPT_SDLC_MANUAL_ACTOR,
} from "./choosePromptSdlcLocalModels";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { promptSdlcLocalHistoryTitle } from "./promptSdlcLocalHistoryTitle";
import { readPromptSdlcWizardActiveStepIndex } from "./readPromptSdlcWizardActiveStepIndex";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

type PromptSdlcWizardStepKey =
  "generalize" | "evaluate" | "separate" | "optimize_modules";

const stepLabel = (step: PromptSdlcWizardStepKey): string => {
  if (step === "generalize") {
    return "Step 1 — Generalize";
  }
  if (step === "evaluate") {
    return "Step 2 — Evaluate";
  }
  if (step === "separate") {
    return "Step 3 — Separate";
  }
  return "Step 4 — Optimize modules";
};

const readWizardStepKey = (
  wizard: NonNullable<PromptSdlcLocalCycle["wizard"]>,
): PromptSdlcWizardStepKey | null => {
  if (wizard.gate !== null) {
    return wizard.gate;
  }
  if (
    wizard.phase === "generalize" ||
    wizard.phase === "evaluate" ||
    wizard.phase === "separate" ||
    wizard.phase === "optimize_modules"
  ) {
    return wizard.phase;
  }
  return null;
};

const readShownPrompt = (cycle: PromptSdlcLocalCycle): string => {
  const wizardTemplate = cycle.wizard?.templatedPrompt.trim() ?? "";
  if (wizardTemplate.length > 0) {
    return wizardTemplate;
  }
  const source = cycle.revisions.find((revision) => revision.roundNumber === 0);
  return source?.promptText ?? "";
};

const labelActor = (
  actor: PromptSdlcLocalCycle["judgeModel"] | "manual",
): string =>
  actor === PROMPT_SDLC_MANUAL_ACTOR ? "You" : labelPromptSdlcLocalModel(actor);

const renderViewInputs = (cycle: PromptSdlcLocalCycle): string => {
  const prompt = readShownPrompt(cycle);
  const runner =
    cycle.runnerModel === undefined || cycle.runnerModel === "manual"
      ? "—"
      : labelPromptSdlcLocalModel(cycle.runnerModel);
  return `<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${escapeHtml(cycle.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${escapeHtml(prompt)}</dd></div>
      <div><dt>Judge</dt><dd>${escapeHtml(labelActor(cycle.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${escapeHtml(labelActor(cycle.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${escapeHtml(runner)}</dd></div>
    </dl>
  </details>`;
};

export const renderPromptSdlcWizardResumeBanner = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return "";
  }
  const title = promptSdlcLocalHistoryTitle(cycle.goal);
  const paused = cycle.status === "wizard_paused";
  const active =
    !isPromptSdlcTerminalStatus(cycle.status) &&
    cycle.status !== "wizard_paused";

  if (!paused && !active) {
    return "";
  }

  if (active) {
    const activity = describePromptSdlcLocalActivity(cycle);
    const stepKey = readWizardStepKey(wizard);
    const step = stepKey === null ? "" : stepLabel(stepKey);
    const stepIndex = readPromptSdlcWizardActiveStepIndex(cycle);
    const stepLine =
      step.length === 0
        ? ""
        : stepIndex === null || stepIndex >= 4
          ? ` <strong>${escapeHtml(step)}</strong>`
          : ` <strong>${escapeHtml(step)}</strong> (step ${stepIndex + 1} of 4)`;
    return `<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${escapeHtml(title)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${escapeHtml(activity.title)}${stepLine}</p>
    <p class="muted">${escapeHtml(activity.detail)}</p>
    <div class="actions">
      ${renderViewInputs(cycle)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${escapeHtml(cycle.id)}">Open this run</a>
    </div>
  </section>`;
  }

  const pausedStepKey = readWizardStepKey(wizard);
  const step = pausedStepKey === null ? "Wizard" : stepLabel(pausedStepKey);
  const stepIndex = readPromptSdlcWizardActiveStepIndex(cycle);
  const stepIndexLine =
    stepIndex === null || stepIndex >= 4 ? "" : ` (step ${stepIndex + 1} of 4)`;
  const pausedAt = new Date(cycle.updatedAt).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return `<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${escapeHtml(title)}</h2>
    <p class="lede">Paused at <strong>${escapeHtml(step)}</strong>${escapeHtml(stepIndexLine)} (last updated ${escapeHtml(pausedAt)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${renderViewInputs(cycle)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${escapeHtml(cycle.id)}">Resume wizard</a>
    </div>
  </section>`;
};
