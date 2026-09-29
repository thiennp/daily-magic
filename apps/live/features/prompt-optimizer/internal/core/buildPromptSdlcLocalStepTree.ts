import {
  buildPromptSdlcScoreScale,
  type PromptSdlcStep,
} from "../../../../adapters/promptSdlcAwcCore";
import { describePromptSdlcLocalNodeDetail } from "./describePromptSdlcLocalNodeDetail";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { renderPromptSdlcLocalNodeModal } from "./renderPromptSdlcLocalNodeModal";
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
  const mark =
    step.state === "active"
      ? `<span class="sdlc-spin" aria-hidden="true"></span>`
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
      : "";
  const modal = renderPromptSdlcLocalNodeModal(
    describePromptSdlcLocalNodeDetail(cycle, step),
  );

  return `<li class="sdlc-node sdlc-node-${step.state}"><button type="button" class="sdlc-node-open" data-sdlc-node>${mark}<span class="sdlc-node-label">${escapeHtml(step.label)}${reason}${tokenNote}</span></button><template>${modal}</template></li>`;
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
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const opener = target.closest("[data-sdlc-node]");
    if (!opener) return;
    const template = opener.parentElement?.querySelector("template");
    if (!template) return;
    body.replaceChildren(template.content.cloneNode(true));
    dialog.showModal();
  });
})();
</script>`;
