import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { readPromptSdlcWizardScoredRevisions } from "./readPromptSdlcWizardScoredRevisions";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcWizardRevisionRoundList = (input: {
  readonly cycle: PromptSdlcLocalCycle;
  readonly interactive: boolean;
  readonly selectedRound?: number | null;
  readonly caption?: string;
}): string => {
  const scored = readPromptSdlcWizardScoredRevisions(input.cycle);
  if (scored.length === 0 && input.cycle.revisions.length === 0) {
    return "";
  }
  const emptyNotice =
    scored.length === 0
      ? `<div class="alert-error">No scored revisions yet. ${
          input.interactive
            ? "Check the run error above, then rerun this step with feedback or restart evaluate from Step 1."
            : "Wait for runner and judge to finish this module."
        }</div>`
      : "";
  const caption =
    input.caption === undefined
      ? ""
      : `<p class="muted">${escapeHtml(input.caption)}</p>`;
  const items = input.cycle.revisions
    .map((item) => {
      const score = item.judgement?.score;
      const label =
        score === null || score === undefined
          ? `Round ${item.roundNumber} — not scored`
          : `Round ${item.roundNumber} — ${score}`;
      const reason = item.judgement?.reasons?.trim() ?? "";
      const reasonLine =
        reason.length === 0
          ? ""
          : `<br><span class="muted">${escapeHtml(reason)}</span>`;
      if (input.interactive) {
        const checked =
          input.selectedRound === item.roundNumber ? " checked" : "";
        return `<li><label><input type="radio" name="wizardRevisionRound" value="${item.roundNumber}"${checked}> ${escapeHtml(label)}</label>${reasonLine}</li>`;
      }
      return `<li>${escapeHtml(label)}${reasonLine}</li>`;
    })
    .join("");
  return `${emptyNotice}${caption}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${items}</ul>`;
};
