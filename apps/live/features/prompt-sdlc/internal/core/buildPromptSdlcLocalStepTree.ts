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

const nodeText = (step: PromptSdlcStep): string =>
  step.state === "active"
    ? `- Progressing ${step.label}`
    : `- Done: ${step.label}`;

export const renderPromptSdlcLocalStepTree = (
  steps: readonly PromptSdlcStep[],
): string => {
  const lines = steps.flatMap((step, index) =>
    index === 0 ? [nodeText(step)] : ["  |", nodeText(step)],
  );
  return `<pre class="mono sdlc-tree">${escapeHtml(lines.join("\n"))}</pre>`;
};

export const renderPromptSdlcLocalScoreScale = (passScore: number): string => {
  const bands = buildPromptSdlcScoreScale(passScore)
    .map(
      (band) =>
        `<span class="sdlc-band sdlc-band-${band.band}">${escapeHtml(band.label)}</span>`,
    )
    .join("");
  return `<div class="sdlc-score" aria-label="What the score means">${bands}</div><p class="muted">${passScore} or higher passes. The score is how well this prompt would achieve the goal.</p>`;
};
