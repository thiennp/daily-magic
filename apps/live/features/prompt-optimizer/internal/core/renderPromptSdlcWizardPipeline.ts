import {
  buildPromptSdlcWizardPipelineSteps,
  type PromptSdlcWizardPipelineStep,
} from "../../../../adapters/promptSdlcAwcCore";

import { labelPromptSdlcLocalModel } from "./choosePromptSdlcLocalModels";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import {
  displayPromptSdlcLocalFolder,
  promptSdlcLocalWorkingDirectory,
} from "./promptSdlcLocalFolder";
import { PROMPT_SDLC_INFO_ICON_HTML } from "./promptSdlcInfoIconHtml.constant";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const renderPipelineStepMark = (
  state: PromptSdlcWizardPipelineStep["state"],
): string => {
  if (state === "active") {
    return `<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>`;
  }
  if (state === "done") {
    return `<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">✓</span>`;
  }
  return `<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>`;
};

const renderPipelineStep = (step: PromptSdlcWizardPipelineStep): string => {
  const mark = renderPipelineStepMark(step.state);
  const modal = `<h2>${escapeHtml(step.infoTitle)}</h2>${step.infoBodyHtml}`;
  return `<li class="sdlc-pipeline-step sdlc-pipeline-step-${step.state}"><div class="sdlc-pipeline-row">${mark}<span class="sdlc-pipeline-label">${escapeHtml(step.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${PROMPT_SDLC_INFO_ICON_HTML}</button></div><template>${modal}</template></li>`;
};

export const renderPromptSdlcWizardPipeline = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return "";
  }
  const steps = buildPromptSdlcWizardPipelineSteps({
    status: cycle.status,
    wizard,
    writerLabel: labelPromptSdlcLocalModel(cycle.judgeModel),
    runnerLabel: labelPromptSdlcLocalModel(
      cycle.runnerModel ?? cycle.judgeModel,
    ),
    folderDisplay: displayPromptSdlcLocalFolder(
      promptSdlcLocalWorkingDirectory(cycle),
    ),
    currentRound: cycle.currentRound,
  });
  if (steps.length === 0) {
    return "";
  }
  return `<ol class="sdlc-pipeline" aria-label="What is happening on this computer">${steps.map(renderPipelineStep).join("")}</ol>`;
};

export const renderPromptSdlcWizardPipelineModalSummary = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return "";
  }
  const steps = buildPromptSdlcWizardPipelineSteps({
    status: cycle.status,
    wizard,
    writerLabel: labelPromptSdlcLocalModel(cycle.judgeModel),
    runnerLabel: labelPromptSdlcLocalModel(
      cycle.runnerModel ?? cycle.judgeModel,
    ),
    folderDisplay: displayPromptSdlcLocalFolder(
      promptSdlcLocalWorkingDirectory(cycle),
    ),
    currentRound: cycle.currentRound,
  });
  if (steps.length === 0) {
    return "";
  }
  const items = steps
    .map((step) => {
      const now =
        step.state === "active"
          ? ' <span class="sdlc-pipeline-now muted">(now)</span>'
          : "";
      return `<li class="sdlc-pipeline-step sdlc-pipeline-step-${step.state}"><div class="sdlc-pipeline-row">${renderPipelineStepMark(step.state)}<span class="sdlc-pipeline-label">${escapeHtml(step.label)}${now}</span></div></li>`;
    })
    .join("");
  return `<h2>Sub-steps on this computer</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${items}</ol>`;
};
