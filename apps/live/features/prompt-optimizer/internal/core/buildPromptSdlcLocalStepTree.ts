import {
  buildPromptSdlcScoreScale,
  type PromptSdlcStep,
  isPromptSdlcTerminalStatus,
  readPromptSdlcEndStepFailureMessage,
} from "../../../../adapters/promptSdlcAwcCore";
import { describePromptSdlcLocalNodeDetail } from "./describePromptSdlcLocalNodeDetail";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { renderPromptSdlcLocalNodeModal } from "./renderPromptSdlcLocalNodeModal";
import {
  canShowPromptSdlcWizardTimelineSkip,
  PROMPT_SDLC_WIZARD_SKIP_STEP_CONFIRM,
} from "./skipPromptSdlcWizardTimelineStep";
import { PROMPT_SDLC_INFO_ICON_HTML } from "./promptSdlcInfoIconHtml.constant";
import { readPromptSdlcLocalUnusableReplyPreview } from "./readPromptSdlcLocalUnusableReplyPreview";
import { renderPromptSdlcWizardPipeline } from "./renderPromptSdlcWizardPipeline";
import {
  formatPromptSdlcTokenCount,
  sumPromptSdlcLocalTokens,
} from "./sumPromptSdlcLocalTokens";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const renderNode = (
  step: PromptSdlcStep,
  cycle: PromptSdlcLocalCycle,
): string => {
  const failureMessage = readPromptSdlcEndStepFailureMessage(cycle, step);
  const isFailedEnd = failureMessage !== null;
  const mark =
    step.state === "active"
      ? `<span class="sdlc-spin" aria-hidden="true"></span>`
      : isFailedEnd
        ? `<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>`
        : `<span class="sdlc-node-mark" aria-hidden="true"></span>`;
  const scoreRound = /^score-(\d+)$/.exec(step.id);
  const tokens =
    step.state === "done" && scoreRound !== null
      ? sumPromptSdlcLocalTokens(cycle, Number(scoreRound[1]))
      : 0;
  const tokenNote =
    tokens > 0
      ? `<span class="sdlc-node-reason">${formatPromptSdlcTokenCount(tokens)} tokens so far</span>`
      : "";
  const reason =
    step.state === "done" && step.id.startsWith("score-") && step.detail
      ? `<span class="sdlc-node-reason">${escapeHtml(step.detail)}</span>`
      : isFailedEnd && failureMessage !== null
        ? `<span class="sdlc-node-reason sdlc-node-reason-failed">${escapeHtml(failureMessage)}</span>`
        : "";
  const modal = renderPromptSdlcLocalNodeModal(
    describePromptSdlcLocalNodeDetail(cycle, step),
  );
  const outcomeStepLink =
    cycle.wizard !== undefined &&
    cycle.wizard.phase === "complete" &&
    isPromptSdlcTerminalStatus(cycle.status) &&
    /^wizard-[1-4]$/.test(step.id)
      ? ` data-sdlc-outcome-step="${escapeHtml(step.id)}"`
      : "";

  const skip = canShowPromptSdlcWizardTimelineSkip(cycle, step.id)
    ? `<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${escapeHtml(PROMPT_SDLC_WIZARD_SKIP_STEP_CONFIRM)}"><input type="hidden" name="cycleId" value="${escapeHtml(cycle.id)}"><input type="hidden" name="wizardStepId" value="${escapeHtml(step.id)}"><button class="btn btn-secondary sdlc-node-skip-btn" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`
    : "";
  const pipeline =
    step.state === "active" && step.id.startsWith("wizard-")
      ? renderPromptSdlcWizardPipeline(cycle)
      : "";

  const nodeStateClass = isFailedEnd ? "failed" : step.state;
  const failureReplyPreview = isFailedEnd
    ? readPromptSdlcLocalUnusableReplyPreview(cycle)
    : null;
  const failureReplyInfo =
    failureReplyPreview !== null
      ? `<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${PROMPT_SDLC_INFO_ICON_HTML}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${escapeHtml(failureReplyPreview)}</pre></template>`
      : "";

  return `<li class="sdlc-node sdlc-node-${nodeStateClass}" data-sdlc-step-id="${escapeHtml(step.id)}"${step.state === "active" && step.id.startsWith("wizard-") ? ' id="prompt-optimizer-wizard-active-step"' : ""}><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${outcomeStepLink} data-sdlc-node>${mark}<span class="sdlc-node-label">${escapeHtml(step.label)}${reason}${tokenNote}</span></button>${failureReplyInfo}${skip}</div>${pipeline}<template>${modal}</template></li>`;
};

export const renderPromptSdlcLocalStepTree = (
  steps: readonly PromptSdlcStep[],
  cycle: PromptSdlcLocalCycle,
): string =>
  `<ol class="sdlc-tree">${steps.map((step) => renderNode(step, cycle)).join("")}</ol>`;

export const renderPromptSdlcLocalScoreScale = (passScore: number): string => {
  const bands = buildPromptSdlcScoreScale(passScore)
    .map(
      (band) =>
        `<span class="sdlc-band sdlc-band-${band.band}">${escapeHtml(band.label)}</span>`,
    )
    .join("");
  return `<div class="sdlc-score" aria-label="What the score means">${bands}</div><p class="muted">${passScore} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`;
};

export const PROMPT_SDLC_NODE_DIALOG = `<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog"><button class="btn btn-secondary" type="submit">Close</button></form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`;

export const PROMPT_SDLC_NODE_DIALOG_SCRIPT = `<script>
(() => {
  const dialog = document.getElementById("sdlc-node-dialog");
  const body = dialog?.querySelector("[data-sdlc-dialog-body]");
  if (!dialog || !body) return;
  const readNodeTemplate = (node) => {
    if (!(node instanceof Element)) return null;
    const direct = node.querySelector(":scope > template");
    return direct instanceof HTMLTemplateElement ? direct : null;
  };
  const readStepId = (node) => {
    if (!(node instanceof HTMLElement)) return "";
    const stepId = node.dataset.sdlcStepId;
    return typeof stepId === "string" ? stepId : "";
  };
  const openFromTemplate = (template, stepId) => {
    if (!(template instanceof HTMLTemplateElement)) return;
    body.replaceChildren(template.content.cloneNode(true));
    if (stepId.length > 0) {
      dialog.dataset.sdlcDialogStepId = stepId;
    } else {
      delete dialog.dataset.sdlcDialogStepId;
    }
    dialog.showModal();
  };
  const refreshOpenDialog = () => {
    if (!dialog.open) return;
    const stepId = dialog.dataset.sdlcDialogStepId ?? "";
    if (stepId.length === 0) return;
    const node = document.querySelector('[data-sdlc-step-id="' + stepId + '"]');
    const template = readNodeTemplate(node);
    if (template === null) return;
    body.replaceChildren(template.content.cloneNode(true));
  };
  document.addEventListener("sdlc-node-dialog-refresh", refreshOpenDialog);
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const info = target.closest("[data-sdlc-pipeline-info]");
    if (info instanceof HTMLElement) {
      const template = info.closest(".sdlc-pipeline-step")?.querySelector("template");
      if (!(template instanceof HTMLTemplateElement)) return;
      delete dialog.dataset.sdlcDialogStepId;
      openFromTemplate(template, "");
      return;
    }
    const failureInfo = target.closest("[data-sdlc-failure-reply-info]");
    if (failureInfo instanceof HTMLElement) {
      event.stopPropagation();
      event.preventDefault();
      const template = failureInfo.parentElement?.querySelector(
        "template[data-sdlc-failure-reply]",
      );
      if (!(template instanceof HTMLTemplateElement)) return;
      delete dialog.dataset.sdlcDialogStepId;
      openFromTemplate(template, "");
      return;
    }
    const opener = target.closest("[data-sdlc-node]");
    if (!opener) return;
    const node = opener.closest(".sdlc-node");
    const template = readNodeTemplate(node);
    if (template === null) return;
    openFromTemplate(template, readStepId(node));
  });
})();
</script>`;
