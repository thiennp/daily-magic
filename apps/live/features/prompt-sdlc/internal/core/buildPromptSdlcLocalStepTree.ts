import {
  buildPromptSdlcScoreScale,
  type PromptSdlcStep,
} from "../../../../adapters/promptSdlcAwcCore";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const renderNode = (step: PromptSdlcStep): string => {
  const mark =
    step.state === "active"
      ? `<span class="sdlc-spin" aria-hidden="true"></span>`
      : `<span class="sdlc-node-mark" aria-hidden="true"></span>`;
  const reason =
    step.state === "done" && step.id.startsWith("score-") && step.detail
      ? `<span class="sdlc-node-reason">${escapeHtml(step.detail)}</span>`
      : "";
  return `<li class="sdlc-node sdlc-node-${step.state}">${mark}<span class="sdlc-node-label">${escapeHtml(step.label)}${reason}</span></li>`;
};

export const renderPromptSdlcLocalStepTree = (
  steps: readonly PromptSdlcStep[],
): string => `<ol class="sdlc-tree">${steps.map(renderNode).join("")}</ol>`;

export const renderPromptSdlcLocalScoreScale = (passScore: number): string => {
  const bands = buildPromptSdlcScoreScale(passScore)
    .map(
      (band) =>
        `<span class="sdlc-band sdlc-band-${band.band}">${escapeHtml(band.label)}</span>`,
    )
    .join("");
  return `<div class="sdlc-score" aria-label="What the score means">${bands}</div><p class="muted">${passScore} or higher passes. The score is how well this prompt would achieve the goal.</p>`;
};
