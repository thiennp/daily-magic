import type { PromptSdlcLocalNodeDetail } from "./describePromptSdlcLocalNodeDetail";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcLocalNodeModal = (
  detail: PromptSdlcLocalNodeDetail,
): string => {
  const score =
    detail.bodyHtml !== null
      ? ""
      : detail.scoreLabel === null
        ? detail.feedback === null || detail.feedback.trim().length === 0
          ? `<p class="muted">Not scored yet.</p>`
          : ""
        : `<p class="muted">${escapeHtml(detail.scoreLabel)}</p>`;
  const body =
    detail.bodyHtml === null
      ? ""
      : `<div class="sdlc-wizard-step-modal">${detail.bodyHtml}</div>`;
  const feedback =
    detail.feedback === null || detail.feedback.trim().length === 0
      ? ""
      : `<h2>Feedback</h2><p>${escapeHtml(detail.feedback.trim())}</p>`;
  const promptHeading =
    detail.title === "Failed" && detail.promptText !== null
      ? "Model reply"
      : "Saved prompt";
  const prompt =
    detail.promptNote !== null
      ? `<div class="alert-error">${escapeHtml(detail.promptNote)}</div>`
      : detail.promptText === null
        ? ""
        : `<h2>${escapeHtml(promptHeading)}</h2><pre class="mono">${escapeHtml(detail.promptText)}</pre>`;
  const goal =
    detail.goal === null
      ? ""
      : `<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${escapeHtml(detail.goal)}</dd></div></dl>`;

  return `<h2>${escapeHtml(detail.title)}</h2>${goal}${score}${body}${feedback}${prompt}`;
};
