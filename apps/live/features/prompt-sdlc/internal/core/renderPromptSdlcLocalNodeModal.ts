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
        ? `<p class="muted">Not scored yet.</p>`
        : `<p class="muted">${escapeHtml(detail.scoreLabel)}</p>`;
  const body =
    detail.bodyHtml === null
      ? ""
      : `<div class="sdlc-wizard-step-modal">${detail.bodyHtml}</div>`;
  const feedback =
    detail.feedback === null || detail.feedback.trim().length === 0
      ? ""
      : `<h2>Feedback</h2><p>${escapeHtml(detail.feedback.trim())}</p>`;
  const prompt =
    detail.promptNote !== null
      ? `<div class="alert-error">${escapeHtml(detail.promptNote)}</div>`
      : detail.promptText === null
        ? ""
        : `<h2>Saved prompt</h2><pre class="mono">${escapeHtml(detail.promptText)}</pre>`;

  return `<h2>${escapeHtml(detail.title)}</h2>${score}${body}${feedback}${prompt}`;
};
